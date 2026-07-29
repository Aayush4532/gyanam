const express = require("express");
const router = express.Router();
const { twiml: { VoiceResponse } } = require("twilio");

const User = require("../schema.js");
const runGemini = require("../gemini.js");
const { validLanguages, getLocale, matchSpokenLanguage } = require("../constants.js");

router.post("/incoming", async (req, res) => {
  const caller = req.body.From;
  const twiml = new VoiceResponse();

  try {
    const user = caller ? await User.findOne({ mobileNumber: caller }) : null;

    if (!user || !user.language) {
      promptForLanguage(twiml);
    } else {
      greetAndAsk(twiml, user.language);
    }
  } catch (err) {
    console.error("Error handling incoming call:", err);
    twiml.say({ language: "hi-IN" }, "क्षमा करें, अभी सेवा उपलब्ध नहीं है। कृपया बाद में कॉल करें।");
    twiml.hangup();
  }

  res.type("text/xml").send(twiml.toString());
});

router.post("/language", async (req, res) => {
  const caller = req.body.From;
  const digit = req.body.Digits;
  const speech = req.body.SpeechResult;
  const twiml = new VoiceResponse();

  try {
    const chosen =
      digit === "1" ? "Hindi" :
      digit === "2" ? "English" :
      matchSpokenLanguage(speech);

    if (!chosen) {
      twiml.say({ language: "hi-IN" }, "माफ़ कीजिए, भाषा समझ नहीं आई।");
      promptForLanguage(twiml);
      res.type("text/xml").send(twiml.toString());
      return;
    }

    if (caller) {
      await User.findOneAndUpdate(
        { mobileNumber: caller },
        { language: chosen },
        { upsert: true, new: true }
      );
    }

    greetAndAsk(twiml, chosen);
  } catch (err) {
    console.error("Error saving language preference:", err);
    twiml.say({ language: "hi-IN" }, "कुछ गड़बड़ हो गई। कृपया दोबारा कॉल करें।");
    twiml.hangup();
  }

  res.type("text/xml").send(twiml.toString());
});

router.post("/ask", async (req, res) => {
  const caller = req.body.From;
  const speech = req.body.SpeechResult;
  const twiml = new VoiceResponse();

  try {
    const user = caller ? await User.findOne({ mobileNumber: caller }) : null;
    const language = user?.language || "Hindi";
    const locale = getLocale(language);

    if (!speech) {
      twiml.say({ language: locale.say }, goodbyeMessage(language));
      twiml.hangup();
      res.type("text/xml").send(twiml.toString());
      return;
    }

    const prompt = `${speech} Language is: ${language}`;
    const answer = await runGemini(prompt);

    twiml.say({ language: locale.say }, answer || fallbackMessage(language));
    askAgain(twiml, language);
  } catch (err) {
    console.error("Error handling voice question:", err);
    twiml.say({ language: "hi-IN" }, "माफ़ कीजिए, अभी जवाब नहीं दे पाए। कॉल दोबारा करें।");
    twiml.hangup();
  }

  res.type("text/xml").send(twiml.toString());
});


function promptForLanguage(twiml) {
  const gather = twiml.gather({
    input: "dtmf speech",
    numDigits: 1,
    action: "/api/voice/language",
    method: "POST",
    language: "hi-IN",
    speechTimeout: "auto",
    actionOnEmptyResult: true,
    hints: validLanguages.join(", "),
  });
  gather.say(
    { language: "hi-IN" },
    "ज्ञानम् AI में आपका स्वागत है। हिंदी के लिए 1 दबाएँ, English के लिए 2 दबाएँ। " +
    "किसी और भाषा के लिए, उसका नाम बोलें।"
  );
}

function greetAndAsk(twiml, language) {
  const locale = getLocale(language);
  twiml.say({ language: locale.say }, greetingMessage(language));
  askAgain(twiml, language);
}

function askAgain(twiml, language) {
  const locale = getLocale(language);
  const gather = twiml.gather({
    input: "speech",
    action: "/api/voice/ask",
    method: "POST",
    language: locale.gather,
    speechTimeout: "auto",
    actionOnEmptyResult: true,
  });
  gather.say({ language: locale.say }, questionPrompt(language));
}

function greetingMessage(language) {
  if (language === "English") {
    return "Hi, this is Gyanam AI. Ask me anything.";
  }
  return "नमस्ते, मैं ज्ञानम् AI हूँ। आप जो पूछना चाहें, पूछ सकते हैं।";
}

function questionPrompt(language) {
  if (language === "English") {
    return "Please ask your question after the beep.";
  }
  return "कृपया अपना सवाल पूछें।";
}

function fallbackMessage(language) {
  if (language === "English") {
    return "Sorry, I couldn't answer that right now. Please try again.";
  }
  return "माफ़ कीजिए, अभी जवाब नहीं दे पाए। दोबारा कोशिश करें।";
}

function goodbyeMessage(language) {
  if (language === "English") {
    return "No input received. Thank you for calling Gyanam AI. Goodbye.";
  }
  return "कोई प्रतिक्रिया नहीं मिली। ज्ञानम् AI को कॉल करने के लिए धन्यवाद।";
}

module.exports = router;
const express = require("express");
const app = express();
const connectDB = require("./db");
const dotenv = require("dotenv");
const runGemini = require("./gemini.js");
const User = require("./schema.js");
const { MessagingResponse } = require("twilio").twiml;
const { validLanguages, isLanguagePresentInMessage } = require("./constants.js");
const voiceRoutes = require("./routes/voiceRoutes.js");

dotenv.config();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));

app.use("/api/voice", voiceRoutes);

app.post("/api/sms", async (req, res) => {
  const sender = req.body.From;
  const msg = req.body.Body;

  if (!sender || !msg) {
    return res.status(400).send("Give correct query");
  }

  try {
    if (isLanguagePresentInMessage(msg)) {
      await User.findOneAndUpdate(
        { mobileNumber: sender },
        { language: msg },
        { upsert: true, new: true }
      );
    }

    const findSender = await User.findOne({ mobileNumber: sender });
    const twiml = new MessagingResponse();

    if (!findSender || !findSender.language) {
      twiml.message(
        "कृपया अपनी पसंद की भाषा का नाम बिना किसी स्पेस के, ठीक वैसा ही लिखकर जवाब दें जैसा नीचे दिया गया है:\n\n" +
        "Please choose your language by replying with one of the following:\n\n" +
        validLanguages.join("\n") +
        "\n\nउदाहरण: 'Hindi' या 'English'"
      );
    } else {
      const prompt = `${msg} Language is: ${findSender.language}`;
      const response = await runGemini(prompt);
      twiml.message(response || "माफ कीजिए, अभी जवाब नहीं दे पाए। थोड़ी देर में दोबारा पूछें।");
    }

    res.type("text/xml").send(twiml.toString());
  } catch (err) {
    console.error("Error handling SMS:", err);
    const errorTwiml = new MessagingResponse();
    errorTwiml.message("Server error occurred. Try again later.");
    res.type("text/xml").send(errorTwiml.toString());
  }
});

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("DB connection failed:", err);
    process.exit(1);
  });
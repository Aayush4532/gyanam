const validLanguages = [
  "English",
  "Assamese",
  "Bengali",
  "Bodo",
  "Dogri",
  "Gujarati",
  "Hindi",
  "Kannada",
  "Kashmiri",
  "Konkani",
  "Maithili",
  "Malayalam",
  "Manipuri",
  "Marathi",
  "Nepali",
  "Odia",
  "Punjabi",
  "Sanskrit",
  "Santali",
  "Sindhi",
  "Tamil",
  "Telugu",
];

const LOCALE_MAP = {
  English: { gather: "en-IN", say: "en-IN" },
  Hindi: { gather: "hi-IN", say: "hi-IN" },
  Bengali: { gather: "bn-IN", say: "bn-IN" },
  Gujarati: { gather: "gu-IN", say: "gu-IN" },
  Kannada: { gather: "kn-IN", say: "kn-IN" },
  Malayalam: { gather: "ml-IN", say: "ml-IN" },
  Marathi: { gather: "mr-IN", say: "mr-IN" },
  Punjabi: { gather: "pa-IN", say: "pa-IN" },
  Tamil: { gather: "ta-IN", say: "ta-IN" },
  Telugu: { gather: "te-IN", say: "te-IN" },
  Nepali: { gather: "ne-NP", say: "hi-IN" },
  Odia: { gather: "or-IN", say: "hi-IN" },
  Assamese: { gather: "as-IN", say: "hi-IN" },
  Bodo: { gather: "hi-IN", say: "hi-IN" },
  Dogri: { gather: "hi-IN", say: "hi-IN" },
  Kashmiri: { gather: "hi-IN", say: "hi-IN" },
  Konkani: { gather: "hi-IN", say: "hi-IN" },
  Maithili: { gather: "hi-IN", say: "hi-IN" },
  Manipuri: { gather: "hi-IN", say: "hi-IN" },
  Sanskrit: { gather: "hi-IN", say: "hi-IN" },
  Santali: { gather: "hi-IN", say: "hi-IN" },
  Sindhi: { gather: "hi-IN", say: "hi-IN" },
};

function getLocale(language) {
  return LOCALE_MAP[language] || LOCALE_MAP.Hindi;
}

function isLanguagePresentInMessage(text) {
  if (!text) return false;
  return validLanguages.some(
    (lang) => text.trim().toLowerCase() === lang.toLowerCase(),
  );
}

function matchSpokenLanguage(speechText) {
  if (!speechText) return null;
  const normalized = speechText.trim().toLowerCase();
  return (
    validLanguages.find((lang) => normalized === lang.toLowerCase()) ||
    validLanguages.find((lang) => normalized.includes(lang.toLowerCase())) ||
    null
  );
}

module.exports = {
  validLanguages,
  getLocale,
  isLanguagePresentInMessage,
  matchSpokenLanguage,
};

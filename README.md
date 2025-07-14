<p align="center">
  <img src="./readme.png" alt="Saadhna AI Logo" width="400" />
</p>

<p align="center">
         ॐ गणेशाय नमः 
  
    वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ  
    निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥
</p>

<p>
   Project's श्लोक
   
    सा विद्या या विमुक्तये :-

    वह जो हमें सारे दुखों, पीड़ाओं, बंधनों, अज्ञान, प्रतियोगिताओं, भ्रम और भ्रामक कल्पनाओं से मुक्ति दिलाए, वह विद्या है।

    जो हमें द्वैत के भाव से, हम दो हैं के विचार से, अलगाव के विचार से, तुम और मैं के भेद से मुक्ति दिलाए, वह विद्या है।

    विद्या दृष्टि देती है जिससे मनुष्य अपने ब्रह्म रूप को पहचान सके।

    साधो, साधो, साधो, साधो।।
</p>

---

# Goal To Complete This Year

<p>

    AI Call, Rural Areas People can Live call on Our Toll Free Number, Where Ai will respond to them with Knowledge.
</p>


# 📡 GYANAM - ज्ञान से जुड़ी हर जिज्ञासा का समाधान, अब SMS पर

---

## 🌾 **परिचय (Introduction)**

**Gyanam** एक ऐसा प्रयास है जो भारत के उस कोने तक ज्ञान पहुँचाने के लिए बना है जहाँ अब भी इंटरनेट एक सपना है।  
चाहे कोई छात्र गांव के स्कूल में हो या कोई किसान अपने खेत में — **अगर जिज्ञासा है, तो उत्तर मिलेगा**।  
और वो भी **सिर्फ एक SMS के ज़रिए।**

**Gyanam** एक SMS-based AI assistant है जो **Twilio SMS gateway** के ज़रिए ग्रामीण भारत के लोगों तक पहुँचेगा।  
इंटरनेट की आवश्यकता नहीं है।  
सिर्फ एक साधारण मोबाइल और एक सवाल — बस इतना ही काफी है।

---

## 💡 **Gyanam क्या कर सकता है?**

- 👩‍🎓 **छात्र** अपनी पढ़ाई से जुड़े सवाल पूछ सकते हैं — विज्ञान, गणित, इतिहास, कुछ भी।
- 👨‍🌾 **किसान** खेती, मौसम, बीज, उर्वरक, कीट नियंत्रण जैसे सवालों के जवाब पा सकते हैं।
- 👵 **बुजुर्ग या अनपढ़ लोग** भी स्थानीय भाषा में मदद ले सकते हैं — बिना किसी मोबाइल ऐप या इंटरनेट के।

---

## 🔧 **टेक्निकल सारांश (Technical Overview)**

- 📨 **Twilio SMS API** – जिससे SMS प्राप्त किया जाता है।
- 🧠 **OpenAI / Gemini जैसे LLMs** – जो जवाब तैयार करते हैं (आपके हिसाब से जो लगा हो backend में)।
- 🌐 **Node.js/Express Backend** – SMS को रिसीव करता है, प्रोसेस करता है और जवाब भेजता है।
- 🕊️ **MongoDB** – बातचीत का लॉग स्टोर करने के लिए (यदि लागू हो)।

---

## 🧠 **कैसे काम करता है? (How it Works)**

1. उपयोगकर्ता SMS भेजता है एक निर्दिष्ट मोबाइल नंबर पर (Twilio number)  
   ✉️ उदाहरण: `Kheti me jaivik urvarak ka upyog kaise karein?`

2. Twilio webhook के ज़रिए ये SMS backend तक पहुँचता है।

3. Backend उस सवाल को AI मॉडल (LLM) को भेजता है।

4. AI जवाब देता है — सरल, स्पष्ट, और समझने लायक भाषा में।

5. Backend Twilio API का उपयोग करके उसी मोबाइल नंबर पर जवाब वापस भेजता है।  
   🔁 और यही चक्र चलता रहता है — जब तक सवाल बाकी हैं।

---

## ❤️ **क्यों बनाया गया Gyanam? (The Heart Behind It)**

हमने देखा है कि शहरों में टेक्नोलॉजी ने ज़िन्दगियाँ आसान कर दी हैं।  
लेकिन जो लोग गांवों में हैं — जिनके पास न स्मार्टफोन है, न इंटरनेट, न डेटा पैक — उनके लिए ज्ञान आज भी दूर है।

**Gyanam** उन्हीं के लिए है।

- जहाँ कोई छात्र डरता है कि "सवाल पूछने पर लोग क्या कहेंगे", वहाँ Gyanam उसे बिना झिझक सवाल पूछने की आज़ादी देता है।
- जहाँ कोई किसान वैज्ञानिक खेती करना चाहता है, पर जानकारी नहीं है — Gyanam वहाँ मार्गदर्शक बनता है।

---

## 🚀 **Features at a Glance**

- ✅ 100% SMS-based interaction
- ✅ No internet required for end users
- ✅ Local language support (coming soon / optional)
- ✅ Scalable backend with AI-powered responses
- ✅ Message logging (for feedback/improvement)

---

## ⚙️ **How to Run Locally**

bash

git clone [https://github.com/yourusername/gyanam.git](https://github.com/Aayush4532/gyanam.git)

cd gyanam

npm install

📝 Create a .env file with:

TWILIO_ACCOUNT_SID=your_sid

TWILIO_AUTH_TOKEN=your_token

TWILIO_PHONE_NUMBER=+91xxxxxxxxxx

OPENAI_API_KEY=your_openai_key

node index.js
---

## 🙏 **Contribute**
अगर आप भी मानते हैं कि ज्ञान हर किसी का अधिकार है,

तो आइए हमारे साथ जुड़िए और इस यात्रा को आगे बढ़ाइए।

Pull Requests, Suggestions, Feedback — सबका स्वागत है।

## 🫶 **Made with love, for the unseen Bharat 🇮🇳**
- "Gyanam is not just a backend. It's a backbone for those who had no one to ask."

## 🧑‍💻 **Author**
- Er Karamjeet Sony
- Backend Engineer | Social Tech Builder
- 📧 karamjeetsony8449@gmail.com

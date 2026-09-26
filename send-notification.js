const admin = require('firebase-admin');
const { GoogleGenerativeAI } = require('@google-generative-ai/server');

// Initialize Firebase Admin SDK
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const messaging = admin.messaging();

async function generateCuteMessage(daysLeft) {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Write a short, romantic, single-sentence notification message for my girlfriend adoring her. There are ${daysLeft} days left until her birthday on October 14th. Keep it sweet, loving, and under 15 words with a couple of cute emojis.`;

    const result = await model.generateContent(prompt);
    return result.response.text().trim();
  } catch (err) {
    console.error("Failed to generate AI message, using fallback:", err);
    return "You make my world brighter every single day! 💖";
  }
}

async function run() {
  const today = new Date();
  const birthday = new Date(today.getFullYear(), 9, 14); // October 14th

  if (today > birthday) {
    birthday.setFullYear(today.getFullYear() + 1);
  }

  const diffTime = birthday - today;
  const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // Get her FCM Token from Firestore
  const tokenDoc = await db.collection("fcmTokens").doc("girlfriend").get();
  if (!tokenDoc.exists) {
    console.error("No FCM token found in Firestore!");
    return;
  }

  const fcmToken = tokenDoc.data().token;
  const cuteMessage = await generateCuteMessage(daysLeft);

  const payload = {
    notification: {
      title: `${daysLeft} Days Until Your Birthday! 💖`,
      body: cuteMessage
    },
    token: fcmToken
  };

  await messaging.send(payload);
  console.log("Successfully sent notification!");
}

run().catch(console.error);

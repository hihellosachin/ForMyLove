import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";
import { getMessaging } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging.js";

const firebaseConfig = {
  apiKey: "AIzaSyCskxPH-4PAHxvEzooMXqBqjmTvbr95KHY",
  authDomain: "formylove-be54b.firebaseapp.com",
  projectId: "formylove-be54b",
  storageBucket: "formylove-be54b.firebasestorage.app",
  messagingSenderId: "645615205528",
  appId: "1:645615205528:web:d2a5c18ac39e02473ee4ed"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const messaging = getMessaging(app);

// Paste your Web Push certificate key pair from Firebase Console here
const VAPID_KEY = "BDlRxpdY2vQcihsYrBV4jO0KgpRNKlbK4dhPsGLWmm4WSqV-Kcwzx9r-_66xwym4k8C46drpD2gSG5wDbRAd8Fg";

export { db, storage, messaging, VAPID_KEY };

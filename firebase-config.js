import { initializeApp } from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { getFirestore } from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { getStorage } from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

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

export { db, storage };

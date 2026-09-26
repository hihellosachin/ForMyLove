importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCskxPH-4PAHxvEzooMXqBqjmTvbr95KHY",
  authDomain: "formylove-be54b.firebaseapp.com",
  projectId: "formylove-be54b",
  storageBucket: "formylove-be54b.firebasestorage.app",
  messagingSenderId: "645615205528",
  appId: "1:645615205528:web:d2a5c18ac39e02473ee4ed"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/icon.png' // You can change this to any cute image path
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

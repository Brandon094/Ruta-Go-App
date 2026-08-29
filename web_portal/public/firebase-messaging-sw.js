importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBpxgTKGvh3jJYylT6Qr6p2amgHmMzCTZQ",
  authDomain: "trasnporte-nataga---la-plata.firebaseapp.com",
  databaseURL: "https://trasnporte-nataga---la-plata-default-rtdb.firebaseio.com",
  projectId: "trasnporte-nataga---la-plata",
  storageBucket: "trasnporte-nataga---la-plata.firebasestorage.app",
  messagingSenderId: "175264872585",
  appId: "1:175264872585:web:124a80135af84a38f72e58",
  measurementId: "G-QXERYS2M87"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Mensaje en segundo plano recibido ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/assets/logo_icon.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

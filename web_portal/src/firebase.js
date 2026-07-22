import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// TODO: Reemplaza esto con la configuración de tu consola de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDyM1bZvabUpqINlIyF66DEaiHSePhzrB0",
  authDomain: "trasnporte-nataga---la-plata.firebaseapp.com",
  databaseURL: "https://trasnporte-nataga---la-plata-default-rtdb.firebaseio.com",
  projectId: "trasnporte-nataga---la-plata",
  storageBucket: "trasnporte-nataga---la-plata.firebasestorage.app",
  messagingSenderId: "175264872585",
  appId: "1:175264872585:web:124a80135af84a38f72e58",
  measurementId: "G-QXERYS2M87"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getDatabase(app);
export const firestore = getFirestore(app);

export default app;

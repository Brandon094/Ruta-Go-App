import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, logEvent as fbLogEvent } from "firebase/analytics";
import { getStorage } from "firebase/storage";

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

// --- Singleton Pattern Implementation (Web v1.5.1) ---

class FirebaseManager {
  constructor() {
    if (!FirebaseManager.instance) {
      this.app = initializeApp(firebaseConfig);
      this.auth = getAuth(this.app);
      this.db = getDatabase(this.app);
      this.firestore = getFirestore(this.app);
      this.storage = getStorage(this.app);
      this.analytics = getAnalytics(this.app);
      FirebaseManager.instance = this;
      console.log("✅ Firebase Ecosystem (Singleton) initialized.");
    }
    return FirebaseManager.instance;
  }

  // --- Getters (Mirroring MyApp.java) ---

  getAuth() { return this.auth; }
  getDb() { return this.db; }
  getFirestore() { return this.firestore; }
  getStorage() { return this.storage; }

  // --- Utilities ---

  /** @returns {import('firebase/database').DatabaseReference} */
  getRef(path) {
    return ref(this.db, path);
  }

  getCurrentUser() {
    return this.auth.currentUser;
  }

  getCurrentUserId() {
    return this.auth.currentUser?.uid || null;
  }

  isUserLoggedIn() {
    return !!this.auth.currentUser;
  }

  logEvent(name, params = {}) {
    fbLogEvent(this.analytics, name, params);
  }

  logError(error, context = "") {
    console.error(`❌ [FirebaseError] ${context}:`, error);
    // Aquí se podría integrar Crashlytics/Sentry si fuera necesario
  }
}

const firebaseManager = new FirebaseManager();

// Congelar el objeto para asegurar el patrón Singleton
Object.freeze(firebaseManager);

export const auth = firebaseManager.auth;
export const db = firebaseManager.db;
export const firestore = firebaseManager.firestore;
export const storage = firebaseManager.storage;
export const analytics = firebaseManager.analytics;

export default firebaseManager;

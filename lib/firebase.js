// lib/firebase.js
// Firebase is initialized here once and imported wherever needed.

import { initializeApp, getApps } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Prevent re-initializing on hot reload in dev
const app = firebaseConfig.projectId && getApps().length === 0 ? initializeApp(firebaseConfig) : getApps().length > 0 ? getApps()[0] : null;
const db = app ? getFirestore(app) : null;

// Analytics only runs in browser (not during SSR)
let analytics = null;
if (typeof window !== "undefined" && app) {
  isSupported().then((yes) => {
    if (yes) analytics = getAnalytics(app);
  });
}

/**
 * Save a waitlist email to Firestore.
 * Collection: "waitlist"
 * Fields: email, timestamp, source
 */
export async function saveWaitlistEmail(email, source = "landing-page") {
  if (!db) {
    console.warn("Firebase is not initialized. Check your environment variables.");
    return { success: false, error: "Firebase not configured" };
  }
  try {
    const docRef = await addDoc(collection(db, "waitlist"), {
      email: email.toLowerCase().trim(),
      source,
      timestamp: serverTimestamp(),
    });
    console.log("Waitlist entry saved:", docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error saving waitlist email:", error);
    return { success: false, error: error.message };
  }
}

export { app, db, analytics };

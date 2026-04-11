// lib/firebase.js
// Firebase is initialized here once and imported wherever needed.

import { initializeApp, getApps } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyA4RJFPKbBGM2Y9cd_WeDM89GW3arPrNJQ",
  authDomain: "blogo-583c6.firebaseapp.com",
  projectId: "blogo-583c6",
  storageBucket: "blogo-583c6.firebasestorage.app",
  messagingSenderId: "90868006512",
  appId: "1:90868006512:web:c6170afb51ed8efa4f7eb5",
};

// Prevent re-initializing on hot reload in dev
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

// Analytics only runs in browser (not during SSR)
let analytics = null;
if (typeof window !== "undefined") {
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

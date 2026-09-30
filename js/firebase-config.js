/**
 * Vul je Firebase web-config in (kopieer uit Firebase Console → Project settings).
 * Zolang PLACEHOLDER staat, toont de admin een setup-scherm.
 * Na config: maak ook Firestore doc admins/{jouw-email} aan (vereist voor writes).
 */
window.REDUCD_FIREBASE = {
  apiKey: "AIzaSyCL_7reEhrNiu4GI6mhEA61GKzuOQcrh28",
  authDomain: "reducdbe.firebaseapp.com",
  projectId: "reducdbe",
  storageBucket: "reducdbe.firebasestorage.app",
  messagingSenderId: "811821158715",
  appId: "1:811821158715:web:a64e84deced50108bfe71e",
  measurementId: "G-90BCMWGBJ1"
};

/** Google-accounts die blog mogen beheren */
window.REDUCD_ADMIN_EMAILS = [
  "info@reducd.be"
];

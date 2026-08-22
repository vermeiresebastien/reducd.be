/**
 * Vul je Firebase web-config in (kopieer uit Firebase Console → Project settings).
 * Zolang PLACEHOLDER staat, toont de admin een setup-scherm.
 * Na config: maak ook Firestore doc admins/{jouw-email} aan (vereist voor writes).
 */
window.REDUCD_FIREBASE = {
  apiKey: "PLACEHOLDER",
  authDomain: "PLACEHOLDER.firebaseapp.com",
  projectId: "PLACEHOLDER",
  storageBucket: "PLACEHOLDER.appspot.com",
  messagingSenderId: "PLACEHOLDER",
  appId: "PLACEHOLDER"
};

/** Google-accounts die blog mogen beheren */
window.REDUCD_ADMIN_EMAILS = [
  "info@reducd.be"
];

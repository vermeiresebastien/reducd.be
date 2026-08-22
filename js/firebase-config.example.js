/**
 * Kopieer dit bestand naar firebase-config.js en vul je Firebase-projectwaarden in.
 *
 * Firebase Console setup (eenmalig):
 * 1. https://console.firebase.google.com → nieuw project
 * 2. Authentication → Sign-in method → Google inschakelen
 * 3. Firestore Database → Create database (production mode)
 * 4. Project settings → Your apps → Web app → config kopiëren
 * 5. Authentication → Settings → Authorized domains: voeg je domain toe (localhost werkt standaard)
 * 6. Firestore Rules: plak de inhoud van firestore.rules
 * 7. Zet ADMIN_EMAILS hieronder op jouw Google-account e-mail(s)
 * 8. Firestore → collection "admins" → document-ID = die e-mail (lowercase). Zonder dit document blokkeren de rules alle writes.
 */
window.REDUCD_FIREBASE = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

/** Alleen deze Google-accounts mogen blogposts bewerken/publiceren */
window.REDUCD_ADMIN_EMAILS = [
  "jouw@email.com"
];

/**
 * REDUCD verdelersplatform — Google of e-maillink.
 * Admin (admins/{email} of REDUCD_ADMIN_EMAILS) ziet analytics.
 * Uitgenodigde verdelers (distributors/{email}) plaatsen bestellingen.
 */
import {
  isConfigured,
  init,
  isAdminUser,
  logout,
  formatDate
} from "./firebase-app.js?v=2";
import {
  GoogleAuthProvider,
  signInWithPopup,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  setDoc,
  updateDoc,
  query,
  where,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

const EMAIL_KEY = "reducd_platform_email";

export const MODELS = [
  { id: "vrijstaand-s", name: "Vrijstaand S", note: "± 14 dB(A)" },
  { id: "vrijstaand-l", name: "Vrijstaand L", note: "± 14 dB(A)" },
  { id: "vrijstaand-xl", name: "Vrijstaand XL", note: "± 14 dB(A)" },
  { id: "wand-s", name: "Wandmodel S", note: "10–12 dB(A)" },
  { id: "wand-l", name: "Wandmodel L", note: "10–12 dB(A)" },
  { id: "maatwerk", name: "Maatwerk", note: "Op specificatie" }
];

export const FINISHES = [
  { id: "magnelis", name: "Magnelis (standaard)" },
  { id: "zwart", name: "Zwart poedercoat" },
  { id: "ral", name: "RAL poedercoat" }
];

export const ORDER_STATUSES = [
  { id: "nieuw", label: "Nieuw" },
  { id: "bevestigd", label: "Bevestigd" },
  { id: "productie", label: "In productie" },
  { id: "verzonden", label: "Verzonden" },
  { id: "geleverd", label: "Geleverd" },
  { id: "geannuleerd", label: "Geannuleerd" }
];

function emailKey(email) {
  return String(email || "").toLowerCase().trim();
}

function continueUrl() {
  const u = new URL(location.href);
  u.hash = "";
  u.search = "";
  if (!u.pathname.endsWith("/")) u.pathname += "/";
  return u.toString();
}

export async function loginWithGoogleAny() {
  const ctx = init();
  if (!ctx) throw new Error("Firebase is niet geconfigureerd.");
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });
  const result = await signInWithPopup(ctx.auth, provider);
  return result.user;
}

export async function sendEmailLoginLink(email) {
  const ctx = init();
  if (!ctx) throw new Error("Firebase is niet geconfigureerd.");
  const clean = emailKey(email);
  if (!clean || !clean.includes("@")) throw new Error("Vul een geldig e-mailadres in.");
  await sendSignInLinkToEmail(ctx.auth, clean, {
    url: continueUrl(),
    handleCodeInApp: true
  });
  try {
    localStorage.setItem(EMAIL_KEY, clean);
  } catch (e) {}
}

export async function completeEmailLinkIfPresent() {
  const ctx = init();
  if (!ctx) return null;
  if (!isSignInWithEmailLink(ctx.auth, location.href)) return null;
  let email = "";
  try {
    email = localStorage.getItem(EMAIL_KEY) || "";
  } catch (e) {}
  if (!email) {
    email = window.prompt("Bevestig het e-mailadres waarmee je de link ontving.") || "";
  }
  email = emailKey(email);
  if (!email) throw new Error("Zonder e-mailadres kunnen we de link niet bevestigen.");
  const cred = await signInWithEmailLink(ctx.auth, email, location.href);
  try {
    localStorage.removeItem(EMAIL_KEY);
  } catch (e) {}
  history.replaceState({}, document.title, location.pathname);
  return cred.user;
}

export async function getDistributor(email) {
  const ctx = init();
  if (!ctx) return null;
  const snap = await getDoc(doc(ctx.db, "distributors", emailKey(email)));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
}

export async function getPlatformRole(user) {
  if (!user?.email) return { role: null, distributor: null };
  const admin = await isAdminUser(user);
  if (admin) return { role: "admin", distributor: null };
  const distributor = await getDistributor(user.email);
  if (distributor && distributor.active !== false) return { role: "distributor", distributor };
  return { role: null, distributor };
}

export function onPlatformAuth(callback) {
  const ctx = init();
  if (!ctx) {
    callback(null, { role: null, distributor: null });
    return () => {};
  }
  return onAuthStateChanged(ctx.auth, async (user) => {
    const role = user ? await getPlatformRole(user) : { role: null, distributor: null };
    callback(user, role);
  });
}

export async function createOrder(user, data) {
  const ctx = init();
  if (!ctx) throw new Error("Firebase is niet geconfigureerd.");
  const email = emailKey(user.email);
  const items = (data.items || []).filter((i) => i.model && Number(i.qty) > 0);
  if (!items.length) throw new Error("Voeg minstens één model toe.");
  const payload = {
    uid: user.uid,
    email,
    company: (data.company || "").trim(),
    contact: (data.contact || "").trim(),
    phone: (data.phone || "").trim(),
    street: (data.street || "").trim(),
    postcode: (data.postcode || "").trim(),
    city: (data.city || "").trim(),
    po: (data.po || "").trim(),
    notes: (data.notes || "").trim(),
    items: items.map((i) => ({
      model: i.model,
      finish: i.finish || "magnelis",
      ral: (i.ral || "").trim(),
      qty: Math.max(1, parseInt(i.qty, 10) || 1)
    })),
    units: items.reduce((n, i) => n + Math.max(1, parseInt(i.qty, 10) || 1), 0),
    status: "nieuw",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  };
  const ref = await addDoc(collection(ctx.db, "orders"), payload);
  return ref.id;
}

export async function listMyOrders(email) {
  const ctx = init();
  if (!ctx) return [];
  const q = query(collection(ctx.db, "orders"), where("email", "==", emailKey(email)));
  const snap = await getDocs(q);
  const rows = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  rows.sort((a, b) => stamp(b) - stamp(a));
  return rows;
}

export async function listAllOrders() {
  const ctx = init();
  if (!ctx) return [];
  const snap = await getDocs(collection(ctx.db, "orders"));
  const rows = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  rows.sort((a, b) => stamp(b) - stamp(a));
  return rows;
}

export async function updateOrderStatus(id, status) {
  const ctx = init();
  if (!ctx) throw new Error("Firebase is niet geconfigureerd.");
  await updateDoc(doc(ctx.db, "orders", id), { status, updatedAt: serverTimestamp() });
}

export async function listDistributors() {
  const ctx = init();
  if (!ctx) return [];
  const snap = await getDocs(collection(ctx.db, "distributors"));
  const rows = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  rows.sort((a, b) => (a.company || a.id).localeCompare(b.company || b.id, "nl"));
  return rows;
}

export async function upsertDistributor({ email, company, name, active = true }) {
  const ctx = init();
  if (!ctx) throw new Error("Firebase is niet geconfigureerd.");
  const id = emailKey(email);
  if (!id.includes("@")) throw new Error("Vul een geldig e-mailadres in.");
  await setDoc(
    doc(ctx.db, "distributors", id),
    {
      email: id,
      company: (company || "").trim(),
      name: (name || "").trim(),
      active: active !== false,
      updatedAt: serverTimestamp()
    },
    { merge: true }
  );
}

function stamp(row) {
  const t = row.createdAt;
  if (!t) return 0;
  if (t.toMillis) return t.toMillis();
  if (t.seconds) return t.seconds * 1000;
  return 0;
}

export function summarizeOrders(orders) {
  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();
  const open = new Set(["nieuw", "bevestigd", "productie"]);
  let units = 0;
  let thisMonth = 0;
  let openCount = 0;
  const byModel = {};
  const byDistributor = {};
  for (const o of orders) {
    const u = Number(o.units) || (o.items || []).reduce((n, i) => n + (Number(i.qty) || 0), 0);
    units += u;
    if (open.has(o.status || "nieuw")) openCount += 1;
    const d = o.createdAt?.toDate?.() || null;
    if (d && d.getMonth() === month && d.getFullYear() === year) thisMonth += 1;
    for (const item of o.items || []) {
      const key = item.model || "onbekend";
      byModel[key] = (byModel[key] || 0) + (Number(item.qty) || 0);
    }
    const dist = o.company || o.email || "—";
    byDistributor[dist] = (byDistributor[dist] || 0) + 1;
  }
  return {
    total: orders.length,
    thisMonth,
    openCount,
    units,
    byModel,
    byDistributor
  };
}

export function modelLabel(id) {
  return MODELS.find((m) => m.id === id)?.name || id;
}

export function finishLabel(id) {
  return FINISHES.find((f) => f.id === id)?.name || id;
}

export function statusLabel(id) {
  return ORDER_STATUSES.find((s) => s.id === id)?.label || id;
}

export { isConfigured, logout, formatDate, init };

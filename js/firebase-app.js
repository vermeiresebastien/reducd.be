import { getStaticPostBySlug, mergePublishedPosts } from "./blog-posts.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

function isConfigured() {
  const c = window.REDUCD_FIREBASE;
  return c && c.apiKey && c.apiKey !== "PLACEHOLDER" && !c.apiKey.startsWith("YOUR_");
}

function isAllowlistedEmail(email) {
  if (!email) return false;
  const list = (window.REDUCD_ADMIN_EMAILS || []).map((e) => e.toLowerCase().trim());
  return list.includes(email.toLowerCase().trim());
}

let app = null;
let auth = null;
let db = null;

function init() {
  if (!isConfigured()) return null;
  if (app) return { app, auth, db };
  app = initializeApp(window.REDUCD_FIREBASE);
  auth = getAuth(app);
  db = getFirestore(app);
  return { app, auth, db };
}

async function isAdminUser(user) {
  if (!user?.email) return false;
  if (isAllowlistedEmail(user.email)) return true;
  const { db: database } = init() || {};
  if (!database) return false;
  try {
    const snap = await getDoc(doc(database, "admins", user.email.toLowerCase()));
    return snap.exists();
  } catch {
    return false;
  }
}

async function loginWithGoogle() {
  const ctx = init();
  if (!ctx) throw new Error("Firebase is niet geconfigureerd.");
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });
  const result = await signInWithPopup(ctx.auth, provider);
  const ok = await isAdminUser(result.user);
  if (!ok) {
    await signOut(ctx.auth);
    throw new Error("Dit Google-account heeft geen admin-rechten.");
  }
  return result.user;
}

async function logout() {
  const ctx = init();
  if (ctx) await signOut(ctx.auth);
}

function onAuth(callback) {
  const ctx = init();
  if (!ctx) {
    callback(null, false);
    return () => {};
  }
  return onAuthStateChanged(ctx.auth, async (user) => {
    const admin = user ? await isAdminUser(user) : false;
    callback(user, admin);
  });
}

function slugify(text) {
  return String(text || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}

async function listPublishedPosts(max = 80) {
  const ctx = init();
  if (!ctx) return mergePublishedPosts([], max);
  try {
    const q = query(
      collection(ctx.db, "posts"),
      where("status", "==", "published"),
      limit(Math.max(max * 2, 50))
    );
    const snap = await getDocs(q);
    const posts = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    return mergePublishedPosts(posts, max);
  } catch (err) {
    console.error(err);
    return mergePublishedPosts([], max);
  }
}

async function listAllPosts() {
  const ctx = init();
  if (!ctx) return [];
  const snap = await getDocs(collection(ctx.db, "posts"));
  const posts = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  posts.sort((a, b) => {
    const ta = a.updatedAt?.toMillis?.() || a.updatedAt?.seconds * 1000 || 0;
    const tb = b.updatedAt?.toMillis?.() || b.updatedAt?.seconds * 1000 || 0;
    return tb - ta;
  });
  return posts;
}

async function getPostById(id) {
  const ctx = init();
  if (!ctx) return null;
  const snap = await getDoc(doc(ctx.db, "posts", id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
}

async function getPostBySlug(slug) {
  const fallback = getStaticPostBySlug(slug);
  const ctx = init();
  if (!ctx) return fallback;
  try {
    // status-filter is required so public queries match firestore.rules (published-only reads)
    const q = query(
      collection(ctx.db, "posts"),
      where("slug", "==", slug),
      where("status", "==", "published"),
      limit(1)
    );
    const snap = await getDocs(q);
    if (snap.empty) return fallback;
    const d = snap.docs[0];
    return { id: d.id, ...d.data(), source: "firebase" };
  } catch (err) {
    console.error(err);
    return fallback;
  }
}

async function savePost(data, id = null) {
  const ctx = init();
  if (!ctx) throw new Error("Firebase is niet geconfigureerd.");
  const payload = {
    title: data.title.trim(),
    slug: (data.slug || slugify(data.title)).trim(),
    excerpt: (data.excerpt || "").trim(),
    content: (data.content || "").trim(),
    coverImage: (data.coverImage || "").trim(),
    status: data.status === "published" ? "published" : "draft",
    authorName: data.authorName || "",
    authorEmail: data.authorEmail || "",
    updatedAt: serverTimestamp()
  };
  if (payload.status === "published") {
    payload.publishedAt = data.publishedAt || serverTimestamp();
  }
  if (id) {
    await updateDoc(doc(ctx.db, "posts", id), payload);
    return id;
  }
  payload.createdAt = serverTimestamp();
  if (payload.status === "published" && !payload.publishedAt) {
    payload.publishedAt = serverTimestamp();
  }
  const ref = await addDoc(collection(ctx.db, "posts"), payload);
  return ref.id;
}

async function removePost(id) {
  const ctx = init();
  if (!ctx) throw new Error("Firebase is niet geconfigureerd.");
  await deleteDoc(doc(ctx.db, "posts", id));
}

function formatDate(ts) {
  if (!ts) return "";
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleDateString("nl-BE", { year: "numeric", month: "long", day: "numeric" });
}

export {
  isConfigured,
  init,
  loginWithGoogle,
  logout,
  onAuth,
  slugify,
  listPublishedPosts,
  listAllPosts,
  getPostById,
  getPostBySlug,
  savePost,
  removePost,
  formatDate
};

/**
 * Local + deployable API for Gemini chat and fit calculation.
 * Key lives in .env (never in the browser).
 */
const http = require("http");
const fs = require("fs");
const path = require("path");
const { REDUCD_SYSTEM, fallbackAnswer } = require("./gemini-context");
const { summarize } = require("./fit-node");

function loadEnv() {
  const file = path.join(__dirname, "..", ".env");
  try {
    const raw = fs.readFileSync(file, "utf8");
    raw.split(/\r?\n/).forEach((line) => {
      const t = line.trim();
      if (!t || t.startsWith("#")) return;
      const i = t.indexOf("=");
      if (i < 1) return;
      const k = t.slice(0, i).trim();
      const v = t.slice(i + 1).trim();
      if (!process.env[k]) process.env[k] = v;
    });
  } catch (e) {}
}

loadEnv();

const PORT = Number(process.env.PORT || 8787);
const KEY = process.env.GEMINI_API_KEY || "";
const MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";

function send(res, status, body, extra) {
  const headers = Object.assign({
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  }, extra || {});
  res.writeHead(status, headers);
  res.end(JSON.stringify(body));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (c) => {
      data += c;
      if (data.length > 200000) {
        req.destroy();
        reject(new Error("too large"));
      }
    });
    req.on("end", () => {
      try { resolve(data ? JSON.parse(data) : {}); }
      catch (e) { reject(e); }
    });
    req.on("error", reject);
  });
}

async function geminiReply(messages, context) {
  if (!KEY || KEY === "YOUR_GEMINI_API_KEY") {
    const last = messages[messages.length - 1];
    return { text: fallbackAnswer(last && last.content), source: "fallback" };
  }
  const { GoogleGenAI } = await import("@google/genai");
  const ai = new GoogleGenAI({ apiKey: KEY });
  const contents = (messages || []).slice(-12).map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: String(m.content || "").slice(0, 4000) }]
  }));
  const ctx = context ? ("\n\nHuidige keuzehulp: " + JSON.stringify(context).slice(0, 1500)) : "";
  const models = [MODEL, "gemini-2.5-flash", "gemini-2.0-flash"];
  let lastErr = null;
  for (let i = 0; i < models.length; i++) {
    try {
      const response = await ai.models.generateContent({
        model: models[i],
        contents: contents,
        config: {
          systemInstruction: REDUCD_SYSTEM + ctx,
          temperature: 0.3,
          maxOutputTokens: 700
        }
      });
      const text = (response && response.text) || "";
      if (text.trim()) return { text: text.trim(), source: "gemini", model: models[i] };
    } catch (e) {
      lastErr = e;
    }
  }
  const last = messages[messages.length - 1];
  return { text: fallbackAnswer(last && last.content), source: "fallback", error: lastErr ? String(lastErr.message || lastErr) : "" };
}

const server = http.createServer(async (req, res) => {
  if (req.method === "OPTIONS") {
    send(res, 204, {});
    return;
  }
  const url = req.url.split("?")[0];
  if (req.method !== "POST") {
    send(res, 404, { error: "not_found" });
    return;
  }
  let body;
  try { body = await readBody(req); }
  catch (e) {
    send(res, 400, { error: "invalid_json" });
    return;
  }

  if (url === "/api/calculate-fit" || url === "/calculate-fit") {
    send(res, 200, summarize(body || {}));
    return;
  }

  if (url === "/api/chat" || url === "/chat") {
    const messages = Array.isArray(body.messages) ? body.messages : [];
    if (!messages.length) {
      send(res, 400, { error: "messages_required" });
      return;
    }
    try {
      const out = await geminiReply(messages, body.context || null);
      send(res, 200, out);
    } catch (e) {
      const last = messages[messages.length - 1];
      send(res, 200, { text: fallbackAnswer(last && last.content), source: "fallback" });
    }
    return;
  }

  send(res, 404, { error: "not_found" });
});

server.listen(PORT, "127.0.0.1", () => {
  console.log("REDUCD assistant API on http://127.0.0.1:" + PORT + "  model=" + MODEL + "  key=" + (KEY && KEY !== "YOUR_GEMINI_API_KEY" ? "set" : "missing"));
});

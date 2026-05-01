"use client";
import { useState, useEffect, useCallback } from "react";

const API = "https://mess-admin-prod.vercel.app/api";
const FONT = "'Helvetica Neue', sans-serif";
const RED = "#c0392b";

interface Contact {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  unsubscribed: boolean;
  created_at: string;
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [sendError, setSendError] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const [showImagePanel, setShowImagePanel] = useState(false);
  const [imageError, setImageError] = useState(false);

  const fetchContacts = useCallback(async (pw: string) => {
    const res = await fetch(`${API}/subscribers`, {
      headers: { "x-admin-password": pw },
    });
    if (res.status === 401) { setAuthed(false); return; }
    const data = await res.json();
    setContacts(data.data || []);
  }, []);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch(`${API}/subscribers`, {
      headers: { "x-admin-password": password },
    });
    if (res.status === 401) {
      setError("Wrong password");
      setLoading(false);
      return;
    }
    const data = await res.json();
    setContacts(data.data || []);
    setAuthed(true);
    setError("");
    setLoading(false);
  };

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setSent(null);
    setSendError("");
    const res = await fetch(`${API}/send`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-admin-password": password },
      body: JSON.stringify({ subject, message, imageUrl: imageUrl.trim() || undefined, imageAlt: imageAlt.trim() || undefined }),
    });
    const data = await res.json();
    if (!res.ok) { setSendError(data.error || "Something went wrong"); setSending(false); return; }
    setSent(data.sent);
    setSubject("");
    setMessage("");
    setImageUrl("");
    setImageAlt("");
    setShowImagePanel(false);
    setSending(false);
  };

  const deleteContact = async (email: string) => {
    setDeleting(email);
    const res = await fetch(`${API}/delete-contact`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json", "x-admin-password": password },
      body: JSON.stringify({ email }),
    });
    if (res.ok) setContacts((prev) => prev.filter((c) => c.email !== email));
    setDeleting(null);
  };

  useEffect(() => {
    if (authed) {
      const interval = setInterval(() => fetchContacts(password), 30000);
      return () => clearInterval(interval);
    }
  }, [authed, password, fetchContacts]);

  const active = contacts.filter((c) => !c.unsubscribed);

  // ── LOGIN ────────────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div style={{
        minHeight: "100vh", background: "#0a0a0a", display: "flex",
        flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: FONT,
      }}>
        <div style={{ marginBottom: 64, textAlign: "center" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/og-admin.png" alt="MESS ADMIN" style={{ width: 220, display: "block", margin: "0 auto" }} />
        </div>
        <form onSubmit={login} style={{ width: 300 }}>
          <div style={{ position: "relative", marginBottom: 24 }}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(""); }}
              style={{
                width: "100%", background: "rgba(255,255,255,0.03)",
                border: "1px solid #1e1e1e", borderColor: error ? RED : "#1e1e1e",
                color: "#e8e8e8", padding: "14px 18px", fontSize: 13, outline: "none",
                boxSizing: "border-box", fontFamily: FONT, letterSpacing: "0.1em", transition: "border-color 0.2s",
              }}
            />
            {error && <p style={{ fontSize: 10, color: RED, letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 8 }}>{error}</p>}
          </div>
          <button
            type="submit" disabled={loading}
            style={{
              width: "100%", background: RED, color: "#fff", border: "none",
              padding: "14px 0", fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase",
              cursor: loading ? "default" : "pointer", opacity: loading ? 0.6 : 1,
              transition: "opacity 0.2s, background 0.2s", fontFamily: FONT,
            }}
            onMouseEnter={(e) => { if (!loading) { e.currentTarget.style.background = "#e8e8e8"; e.currentTarget.style.color = "#0a0a0a"; } }}
            onMouseLeave={(e) => { e.currentTarget.style.background = RED; e.currentTarget.style.color = "#fff"; }}
          >
            {loading ? "..." : "Enter"}
          </button>
        </form>
      </div>
    );
  }

  // ── DASHBOARD ────────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "#e8e8e8", fontFamily: FONT }}>
      <header style={{
        borderBottom: "1px solid #1a1a1a", padding: "0 48px", height: 64,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontSize: 16, fontWeight: 700, letterSpacing: "-0.04em", color: "#e8e8e8" }}>MESS</span>
          <span style={{ width: 1, height: 16, background: "#2a2a2a" }} />
          <span style={{ fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase", color: "#444" }}>Admin</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          <div style={{ textAlign: "right" }}>
            <span style={{ fontSize: 22, fontWeight: 300, color: "#e8e8e8", lineHeight: 1 }}>{active.length}</span>
            <span style={{ fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: "#444", marginLeft: 8 }}>subscribers</span>
          </div>
          <button
            onClick={() => fetchContacts(password)}
            style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "#444", background: "none", border: "none", cursor: "pointer", fontFamily: FONT, transition: "color 0.2s", padding: 0 }}
            onMouseEnter={(e) => e.currentTarget.style.color = "#e8e8e8"}
            onMouseLeave={(e) => e.currentTarget.style.color = "#444"}
          >Refresh</button>
        </div>
      </header>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", maxWidth: 1100, margin: "0 auto", padding: "56px 48px", gap: 80 }}>

        {/* ── Compose ── */}
        <div>
          <p style={{ fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase", color: "#444", marginBottom: 36 }}>Compose</p>
          <form onSubmit={sendEmail} style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            <div>
              <label style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "#555", display: "block", marginBottom: 10 }}>Subject</label>
              <input value={subject} onChange={(e) => setSubject(e.target.value)}
                placeholder="MESS PLANET — Save the date"
                style={{ width: "100%", background: "transparent", border: "none", borderBottom: "1px solid #2a2a2a", color: "#e8e8e8", padding: "10px 0", fontSize: 14, fontWeight: 300, outline: "none", boxSizing: "border-box", fontFamily: FONT, letterSpacing: "-0.01em", transition: "border-color 0.2s" }}
                onFocus={(e) => e.currentTarget.style.borderBottomColor = "#555"}
                onBlur={(e) => e.currentTarget.style.borderBottomColor = "#2a2a2a"}
              />
            </div>
            <div>
              <label style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "#555", display: "block", marginBottom: 10 }}>Message</label>
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={10}
                placeholder="Write your message here..."
                style={{ width: "100%", background: "#0f0f0f", border: "1px solid #1e1e1e", color: "#e8e8e8", padding: "16px", fontSize: 13, fontWeight: 300, outline: "none", resize: "vertical", boxSizing: "border-box", lineHeight: 1.8, fontFamily: FONT, transition: "border-color 0.2s" }}
                onFocus={(e) => e.currentTarget.style.borderColor = "#333"}
                onBlur={(e) => e.currentTarget.style.borderColor = "#1e1e1e"}
              />
            </div>

            {/* Image */}
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <label style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "#555" }}>Image</label>
                <button type="button"
                  onClick={() => { setShowImagePanel(!showImagePanel); setImageUrl(""); setImageAlt(""); setImageError(false); }}
                  style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: showImagePanel ? RED : "#444", background: "none", border: "none", cursor: "pointer", fontFamily: FONT, transition: "color 0.2s", padding: 0 }}
                >{showImagePanel ? "Remove" : "+ Add"}</button>
              </div>
              {showImagePanel && (
                <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 12 }}>
                  <input type="url" value={imageUrl} onChange={(e) => { setImageUrl(e.target.value); setImageError(false); }} placeholder="https://..."
                    style={{ width: "100%", background: "transparent", border: "none", borderBottom: "1px solid #2a2a2a", color: "#e8e8e8", padding: "10px 0", fontSize: 13, fontWeight: 300, outline: "none", boxSizing: "border-box", fontFamily: FONT }}
                    onFocus={(e) => e.currentTarget.style.borderBottomColor = "#555"}
                    onBlur={(e) => e.currentTarget.style.borderBottomColor = "#2a2a2a"}
                  />
                  <input type="text" value={imageAlt} onChange={(e) => setImageAlt(e.target.value)} placeholder="Alt text (optional)"
                    style={{ width: "100%", background: "transparent", border: "none", borderBottom: "1px solid #1e1e1e", color: "#888", padding: "8px 0", fontSize: 11, fontWeight: 300, outline: "none", boxSizing: "border-box", fontFamily: FONT }}
                  />
                  {imageUrl && !imageError && (
                    <div style={{ border: "1px solid #1e1e1e", overflow: "hidden" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={imageUrl} alt={imageAlt || "preview"} onError={() => setImageError(true)}
                        style={{ width: "100%", display: "block", maxHeight: 200, objectFit: "cover" }} />
                    </div>
                  )}
                  {imageError && <p style={{ fontSize: 10, color: RED, letterSpacing: "0.1em", textTransform: "uppercase", margin: 0 }}>Could not load image — check the URL</p>}
                </div>
              )}
            </div>

            {sendError && <p style={{ fontSize: 10, color: RED, letterSpacing: "0.1em", textTransform: "uppercase", margin: 0 }}>{sendError}</p>}
            {sent !== null && (
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#27ae60", flexShrink: 0 }} />
                <p style={{ fontSize: 10, color: "#27ae60", letterSpacing: "0.1em", textTransform: "uppercase", margin: 0 }}>Sent to {sent} subscribers</p>
              </div>
            )}

            <button type="submit" disabled={sending || !subject || !message}
              style={{
                background: sending || !subject || !message ? "transparent" : RED,
                color: sending || !subject || !message ? "#333" : "#fff",
                border: `1px solid ${sending || !subject || !message ? "#222" : RED}`,
                padding: "14px 0", fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase",
                cursor: sending || !subject || !message ? "default" : "pointer", transition: "all 0.2s", fontFamily: FONT,
              }}
              onMouseEnter={(e) => { if (!sending && subject && message) { e.currentTarget.style.background = "#e8e8e8"; e.currentTarget.style.borderColor = "#e8e8e8"; e.currentTarget.style.color = "#0a0a0a"; } }}
              onMouseLeave={(e) => { if (!sending && subject && message) { e.currentTarget.style.background = RED; e.currentTarget.style.borderColor = RED; e.currentTarget.style.color = "#fff"; } }}
            >
              {sending ? `Sending to ${active.length}...` : `Send to ${active.length} subscriber${active.length !== 1 ? "s" : ""}`}
            </button>
          </form>
        </div>

        {/* ── Subscribers ── */}
        <div>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 36 }}>
            <p style={{ fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase", color: "#444", margin: 0 }}>Subscribers</p>
            <span style={{ fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: "#333" }}>{contacts.length} total</span>
          </div>
          {contacts.length === 0 ? (
            <p style={{ fontSize: 13, color: "#333", fontWeight: 300 }}>No subscribers yet.</p>
          ) : (
            <div style={{ maxHeight: 560, overflowY: "auto" }}>
              {contacts.map((c, i) => (
                <div key={c.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #141414", padding: "12px 0", opacity: c.unsubscribed ? 0.35 : 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
                    <span style={{ fontSize: 9, color: "#333", letterSpacing: "0.1em", flexShrink: 0 }}>{String(i + 1).padStart(2, "0")}</span>
                    {c.first_name && <span style={{ fontSize: 11, color: "#555", flexShrink: 0 }}>{c.first_name}</span>}
                    <span style={{ fontSize: 12, color: "#c0c0c0", fontWeight: 300, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.email}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0, marginLeft: 8 }}>
                    {c.unsubscribed && <span style={{ fontSize: 8, color: "#333", letterSpacing: "0.15em", textTransform: "uppercase" }}>Unsub</span>}
                    {!c.unsubscribed && <span style={{ width: 4, height: 4, borderRadius: "50%", background: RED }} />}
                    <button onClick={() => deleteContact(c.email)} disabled={deleting === c.email} title="Remove subscriber"
                      style={{ background: "none", border: "none", cursor: deleting === c.email ? "default" : "pointer", padding: "2px 4px", color: "#333", fontSize: 14, lineHeight: 1, fontFamily: FONT, transition: "color 0.15s", opacity: deleting === c.email ? 0.4 : 1 }}
                      onMouseEnter={(e) => e.currentTarget.style.color = RED}
                      onMouseLeave={(e) => e.currentTarget.style.color = "#333"}
                    >{deleting === c.email ? "·" : "×"}</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

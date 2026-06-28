"use client";

import { useState, useEffect } from "react";

export function AdminHeroClient({ initialAuthenticated }: { initialAuthenticated: boolean }) {
  const [isAuthenticated, setIsAuthenticated] = useState(initialAuthenticated);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [contentEn, setContentEn] = useState("");
  const [contentAr, setContentAr] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      // Fetch current content
      Promise.all([
        fetch("/api/activities?locale=en").then((r) => r.json()),
        fetch("/api/activities?locale=ar").then((r) => r.json())
      ]).then(([enData, arData]) => {
        setContentEn(enData.content || "");
        setContentAr(arData.content || "");
      }).catch(console.error);
    }
  }, [isAuthenticated]);

  const handleRequestOtp = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/otp", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        setOtpSent(true);
      } else {
        setError(data.error || "Failed to send OTP");
      }
    } catch (e) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp })
      });
      const data = await res.json();
      if (data.success) {
        setIsAuthenticated(true);
      } else {
        setError(data.error || "Invalid OTP");
      }
    } catch (e) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setSaveMessage("");
    try {
      const res = await fetch("/api/activities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contentEn, contentAr })
      });
      if (res.ok) {
        setSaveMessage("Saved successfully!");
      } else {
        setSaveMessage("Failed to save.");
      }
    } catch (e) {
      setSaveMessage("Network error during save.");
    } finally {
      setSaving(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div style={{ background: "#f8f9fa", padding: "24px", borderRadius: "8px", border: "1px solid #ddd" }}>
        <h2 style={{ marginTop: 0 }}>Authentication Required</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        
        {!otpSent ? (
          <div>
            <p>An OTP will be sent to the admin WhatsApp number (+201555250555).</p>
            <button 
              onClick={handleRequestOtp} 
              disabled={loading}
              style={{ padding: "8px 16px", cursor: "pointer" }}
            >
              {loading ? "Sending..." : "Request OTP"}
            </button>
          </div>
        ) : (
          <div>
            <p>Enter the 6-digit OTP sent to WhatsApp:</p>
            <input 
              type="text" 
              value={otp} 
              onChange={(e) => setOtp(e.target.value)} 
              placeholder="123456"
              style={{ padding: "8px", marginRight: "8px", fontSize: "16px" }}
            />
            <button 
              onClick={handleVerifyOtp} 
              disabled={loading || otp.length < 4}
              style={{ padding: "8px 16px", cursor: "pointer" }}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <h3>English Content (Markdown)</h3>
        <textarea 
          value={contentEn} 
          onChange={(e) => setContentEn(e.target.value)}
          rows={10} 
          style={{ width: "100%", padding: "12px", fontFamily: "monospace", borderRadius: "8px", border: "1px solid #ccc" }}
          placeholder="[📢 **Announcement** Subtitle](https://link)&#10;&#10;[🚀 **AI Pilot Day** For Managers](https://link)"
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h3>Arabic Content (Markdown)</h3>
        <textarea 
          value={contentAr} 
          onChange={(e) => setContentAr(e.target.value)}
          rows={10} 
          dir="rtl"
          style={{ width: "100%", padding: "12px", fontFamily: "monospace", borderRadius: "8px", border: "1px solid #ccc" }}
          placeholder="[📢 **إعلان هام** التفاصيل](https://link)&#10;&#10;[🚀 **AI Pilot Day** للمديرين](https://link)"
        />
      </div>

      <button 
        onClick={handleSave} 
        disabled={saving}
        style={{ padding: "12px 24px", fontSize: "16px", background: "#0d6efd", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer" }}
      >
        {saving ? "Saving..." : "Save Activities"}
      </button>

      {saveMessage && <span style={{ marginLeft: "16px", color: saveMessage.includes("success") ? "green" : "red" }}>{saveMessage}</span>}
    </div>
  );
}

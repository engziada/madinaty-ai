# Madinaty AI — Firebase Push Notifications & Google Analytics 4 Setup Guide

A complete, step-by-step record of how we integrated **Firebase Cloud Messaging (FCM)** for free browser push notifications and **Google Analytics 4 (GA4)** for visitor journey tracking into the Madinaty AI Next.js platform.

---

## Table of Contents

1. [Prerequisites](#1-prerequisites)
2. [Firebase Project Setup](#2-firebase-project-setup)
3. [Google Analytics 4 Setup](#3-google-analytics-4-setup)
4. [Environment Variables](#4-environment-variables)
5. [Code Implementation](#5-code-implementation)
6. [Firebase Console Configuration Fixes](#6-firebase-console-configuration-fixes)
7. [Testing Push Notifications](#7-testing-push-notifications)
8. [Testing GA4 Events](#8-testing-google-analytics-4-events)
9. [Production Deployment Checklist](#9-production-deployment-checklist)
10. [Troubleshooting](#10-troubleshooting)

---

## 1. Prerequisites

- A Google account
- Access to [Firebase Console](https://console.firebase.google.com)
- Access to [Google Analytics](https://analytics.google.com)
- The Madinaty AI Next.js project cloned locally
- Node.js and npm installed

---

## 2. Firebase Project Setup

### Step 2.1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click **"Add project"**
3. Name it: **`madinatyai`**
4. Disable Google Analytics for now (we will connect it later manually)
5. Click **"Create project"**

### Step 2.2: Register a Web App

1. From the project dashboard, click the **"</>" (Web)** icon to add a web app
2. App nickname: **`Madinaty AI Web`**
3. Check **"Also set up Firebase Hosting"** (optional — we deploy independently)
4. Click **"Register app"**
5. Firebase generates a config object. **Copy all these values** — you will need them later:

```
apiKey: "AIzaSyD6i0BWgpuloOv8YwhS7t4XAo4npkttYWs"
authDomain: "madinatyai.firebaseapp.com"
projectId: "madinatyai"
storageBucket: "madinatyai.firebasestorage.app"
messagingSenderId: "604538726222"
appId: "1:604538726222:web:cf825b960377f22f17a01f"
measurementId: "G-RRZPQNYY5Z"
```

### Step 2.3: Generate a Web Push VAPID Key

1. In Firebase Console, click **⚙️ Project settings** (gear icon, top-left)
2. Go to the **"Cloud Messaging"** tab
3. Scroll down to **"Web Push certificates"**
4. Click **"Generate key pair"**
5. Copy the **Key pair** value (a long Base64 string starting with `BNEzu...` or similar)
6. This is your **VAPID Key** — used to authenticate push subscription requests from the browser

> **Note:** If you later get an `OAuth 2 authentication credential missing` error, come back here, **delete the old key pair**, and **generate a brand new one**.

### Step 2.4: Enable the Firebase Cloud Messaging API

1. Go to [Google Cloud Console → APIs Library](https://console.cloud.google.com/apis/library)
2. Search for: **`Firebase Cloud Messaging API`**
3. Click the result and press **"Enable"**

### Step 2.5: Fix API Key Restrictions

By default, Firebase auto-generates API keys with domain restrictions. Since we are developing on `localhost`, we must temporarily allow unrestricted access.

1. Go to [Google Cloud Console → APIs & Services → Credentials](https://console.cloud.google.com/apis/credentials)
2. Under **API Keys**, find the key named: `Browser key (auto created by Firebase)`
3. Click the **key name** to open its settings
4. Under **Application restrictions**:
   - Change **HTTP referrers** to **None** (for local testing)
   - Later, you can restrict it to `https://www.madinatyai.com`
5. Under **API restrictions**:
   - Choose **Don't restrict key** (or explicitly allow `Firebase Cloud Messaging API`)
6. Click **Save**

---

## 3. Google Analytics 4 Setup

### Step 3.1: Create a GA4 Property

1. Go to [Google Analytics](https://analytics.google.com)
2. Click **Admin** (bottom-left)
3. In the **Property** column, click **"Create Property"**
4. Property name: **`Madinaty AI`**
5. Time zone: **Egypt Time (GMT+2)**
6. Currency: **EGP**
7. Click **Next**
8. Industry: **Technology**
9. Business size: **Small**
10. Click **Create**

### Step 3.2: Create a Web Data Stream

1. Choose **"Web"** as the platform
2. Website URL: `https://www.madinatyai.com`
3. Stream name: **`Madinaty AI Web Stream`**
4. Click **Create stream**
5. You will be shown a **Measurement ID** that looks like:

```
G-RRZPQNYY5Z
```

6. **Copy this ID** — you'll need it later

### Step 3.3: Register Custom Dimensions

These let you filter reports by locale, theme, device, etc.

1. In GA4, go to **Admin → Custom definitions**
2. Click **"Create custom dimension"**
3. Create these **Event-scoped** dimensions:

| Dimension Name | Event Parameter |
|----------------|-----------------|
| `locale` | `locale` |
| `theme` | `theme` |
| `platform` | `platform` |
| `os` | `os` |
| `browser` | `browser` |

4. For each: enter the name, select scope **Event**, enter the matching parameter, then click **Save**

---

## 4. Environment Variables

Create or edit `.env.local` in your project root and add these values (replace example values with your actual Firebase credentials):

```bash
# === Google Analytics 4 ===
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-RRZPQNYY5Z

# === Firebase (public-safe, exposed to browser) ===
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyD6i0BWgpuloOv8YwhS7t4XAo4npkttYWs
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=madinatyai.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=madinatyai
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=madinatyai.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=604538726222
NEXT_PUBLIC_FIREBASE_APP_ID=1:604538726222:web:cf825b960377f22f17a01f
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-RRZPQNYY5Z
NEXT_PUBLIC_FIREBASE_VAPID_KEY=BKqZhXA2v6aoTt4DuaPbX22q-GykGz2NLIIz_OTFn1oYRDi_Z76Y2Tbwpv01yC0POQyX98RSrZ2Mi7-nZc4nWmg
```

> **Important:** After editing `.env.local`, always **restart the dev server** (`Ctrl+C` then `npm run dev`). Environment variables are read once at startup.

---

## 5. Code Implementation Summary

This section summarizes the files that were created or modified during implementation.

### 5.1 Dependencies Installed

```bash
npm install firebase@^11.6.1 @next/third-parties@15.5.15
```

Packages added to `package.json`:
- `firebase` — FCM client SDK
- `@next/third-parties` — Official Next.js wrapper for Google Analytics (best performance)

### 5.2 Files Created

| File | Purpose |
|------|---------|
| `src/lib/firebase.ts` | Lazy-initialized Firebase client for FCM, token request, and foreground toast notifications |
| `public/firebase-messaging-sw.js` | Service Worker that handles background push notifications (served verbatim from `/public`) |
| `src/lib/gtag.ts` | Type-safe wrapper around `window.gtag` for custom GA4 event tracking |
| `src/app/api/push-subscribe/route.ts` | API route: `POST` saves FCM token + segmentation data; `DELETE` removes it |
| `src/hooks/usePushNotifications.ts` | React hook managing notification permission lifecycle, token storage, and refresh |
| `src/components/NotificationPrompt.tsx` | Astro-themed bilingual prompt UI (auto-detects `ar`/`en` from `html lang`) |

### 5.3 Files Modified

| File | Changes |
|------|---------|
| `package.json` | Added `firebase` + `@next/third-parties` dependencies |
| `.env.local` | Added all Firebase + GA environment variables |
| `public/manifest.json` | Added `gcm_sender_id: "103953800507"` required by FCM |
| `src/lib/db.ts` | Added `push_tokens` SQLite table with rich segmentation columns |
| `src/app/layout.tsx` | Injected `<GoogleAnalytics />` into `<head>`; added `<NotificationPrompt />` inside `<body>` |
| `src/app/globals.css` | Added `.notif-prompt` component styles with light/dark theme support |
| `src/components/JoinModal.tsx` | Tracks `join_modal_opened`, `join_form_submitted`, `join_form_error` |
| `src/components/ChatPanel.tsx` | Tracks `chat_started` (first message) + `chat_message_sent` |
| `src/components/ThemeToggle.tsx` | Tracks `theme_toggled` with `light`/`dark` value |

### 5.4 `push_tokens` Database Schema

```sql
CREATE TABLE IF NOT EXISTS push_tokens (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  token TEXT NOT NULL UNIQUE,
  locale TEXT DEFAULT 'ar',
  platform TEXT,           -- 'desktop' | 'mobile'
  os TEXT,                 -- 'windows' | 'macos' | 'android' | 'ios' | 'linux'
  browser TEXT,            -- 'chrome' | 'firefox' | 'safari' | 'edge' | 'opera'
  screen_size TEXT,        -- 'sm' | 'md' | 'lg' | 'xl'
  user_agent TEXT,
  referrer TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### 5.5 Tracked GA4 Events

| Event Name | Trigger | Parameters |
|-----------|---------|-----------|
| `page_view` | Auto (via GoogleAnalytics component) | page_title, page_location |
| `join_modal_opened` | Click "Join" button | `locale` |
| `join_form_submitted` | Form submits successfully | `locale`, `role` |
| `join_form_error` | Validation or server error | `locale`, `error_count` |
| `chat_started` | First chat message sent | `locale` |
| `chat_message_sent` | Any chat message sent | `locale` |
| `theme_toggled` | Click theme toggle | `theme: 'light' \| 'dark'` |
| `notification_prompt_shown` | Prompt renders on screen | `locale` |
| `notification_granted` | User enables notifications | `locale`, `platform`, `os`, `browser` |
| `notification_dismissed` | User clicks "Not now" | `locale` |
| `notification_denied` | User blocks permission | `locale` |

---

## 6. Firebase Console Configuration Fixes

If you encounter the error:

```
Messaging: A problem occurred while subscribing the user to FCM:
Request is missing required authentication credential.
Expected OAuth 2 access token...
```

Apply these fixes in order:

### Fix 1: Enable Firebase Cloud Messaging API

- Go to [Google Cloud Console → APIs Library](https://console.cloud.google.com/apis/library/fcm.googleapis.com)
- Search `Firebase Cloud Messaging API`
- Click **Enable**

### Fix 2: Remove API Key Restrictions

- Go to [Google Cloud Console → Credentials](https://console.cloud.google.com/apis/credentials)
- Find `Browser key (auto created by Firebase)`
- Set **Application restrictions** → **None**
- Set **API restrictions** → **Don't restrict key**
- Click **Save**

### Fix 3: Regenerate Web Push VAPID Key

- Firebase Console → Project Settings → Cloud Messaging tab
- Scroll to **Web Push certificates**
- **Delete** the existing key pair
- Click **Generate key pair**
- Copy the new key into `.env.local` as `NEXT_PUBLIC_FIREBASE_VAPID_KEY`
- **Restart the dev server**

---

## 7. Testing Push Notifications

### Step 7.1: Verify Token Saved in Database

After granting permission on the website, run:

```bash
node -e "const db = require('better-sqlite3')('data/madinaty.db'); console.log(db.prepare('SELECT token, locale, platform, os, browser, screen_size, created_at FROM push_tokens ORDER BY id DESC LIMIT 1').all());"
```

**Expected output:** One row with your token and device segmentation data.

### Step 7.2: Send a Test Notification from Firebase Console

1. Go to [Firebase Console → Cloud Messaging](https://console.firebase.google.com/project/madinatyai/notification)
2. Click **"New campaign"**
3. Fill in:
   - **Notification title**: `🧪 Test — Madinaty AI`
   - **Notification text**: `This is a test push notification!`
4. Click **Next**
5. In **Target**:
   - If you've implemented topic subscriptions: select topic `all`
   - Otherwise: select **Device token** and paste the token from Step 7.1
6. Click through to **Review** → **Publish**

### Step 7.3: Verify Receipt

| State | Expected Result |
|-------|-----------------|
| **Tab visible (foreground)** | An ephemeral in-app toast appears in the bottom-left for 6 seconds |
| **Tab in background or closed** | Your OS (Windows, macOS, Android) shows a system notification |

> **Test on Chrome or Edge.** Safari and Firefox have stricter / partial support for web push.

---

## 8. Testing Google Analytics 4 Events

### Step 8.1: Install GA Debugger

1. Install the [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna) Chrome extension
2. Click the extension icon to turn it **blue** (active)
3. Open DevTools → Console — every `gtag` call will be printed here

### Step 8.2: Trigger Events and Verify in Console

Open `http://localhost:3000/ar` and perform these actions:

| Action | Event Logged in Console |
|--------|------------------------|
| Click **"انضم الآن"** (Join button) | `gtag('event', 'join_modal_opened', { locale: 'ar' })` |
| Toggle light/dark theme | `gtag('event', 'theme_toggled', { theme: 'dark' })` |
| Type first message in chat + press Enter | `gtag('event', 'chat_started', { locale: 'ar' })` |
| Send another chat message | `gtag('event', 'chat_message_sent', { locale: 'ar' })` |
| Click **"تفعيل الإشعارات"** | `gtag('event', 'notification_granted', { locale, platform, os, browser })` |

### Step 8.3: Verify in GA4 Real-Time Dashboard

1. Go to [analytics.google.com](https://analytics.google.com)
2. Select your **Madinaty AI** property
3. Click **Reports → Real-time** (or the ⚡ icon)
4. Open your local site in a browser
5. You should see **1 active user** appear within 30 seconds

> **Note:** Standard reports (non-real-time) take **24-48 hours** to populate. Real-time is instant.

### Step 8.4: Verify Custom Dimensions Are Working

1. In GA4, go to **Reports → Engagement → Events**
2. Search for one of your custom events (e.g., `join_modal_opened`)
3. Click the event name → **Add comparison**
4. Select dimension **`locale`** and compare `ar` vs `en`

---

## 9. Production Deployment Checklist

Before deploying to `https://www.madinatyai.com`, complete these steps:

### Firebase Security

- [ ] Re-add **HTTP referrer restrictions** to your API key (allow `https://www.madinatyai.com` and `https://*.madinatyai.com`)
- [ ] Remove `localhost` from the allowed referrers
- [ ] Re-enable **API restrictions** if you disabled them (allow only `Firebase Cloud Messaging API`)

### Environment

- [ ] Confirm `.env.local` is present on the production server with all Firebase + GA variables
- [ ] `NEXT_PUBLIC_FIREBASE_VAPID_KEY` must match the key in Firebase Console
- [ ] `NEXT_PUBLIC_GA_MEASUREMENT_ID` must match your GA4 web stream

### Service Worker

- [ ] Ensure `public/firebase-messaging-sw.js` is included in the build output
- [ ] The file is served at `https://www.madinatyai.com/firebase-messaging-sw.js` (check in browser)

### Notifications

- [ ] Test push notification on the production domain using the **Device token** target method
- [ ] Verify the notification badge/icon renders correctly (`/logo.png` and `/logo-lite.svg` are accessible)

---

## 10. Troubleshooting

| Symptom | Likely Cause | Fix |
|---------|-------------|-----|
| `OAuth 2 authentication credential missing` | API key restricted or VAPID key stale | Regenerate VAPID key + remove API key restrictions |
| `getToken returned empty` | Service worker not registered | Refresh page; check that `firebase-messaging-sw.js` loads in Network tab |
| Prompt never appears | Already granted/denied, or unsupported browser | Check `Notification.permission` in DevTools Console; Safari iOS <16.4 unsupported |
| GA4 events not visible | Debugger off or measurement ID wrong | Enable GA Debugger extension; verify `NEXT_PUBLIC_GA_MEASUREMENT_ID` |
| Foreground toast not showing | Page in background or notification payload missing | Ensure notification payload has `notification.title` and `notification.body` |
| Real-time user count is 0 | GA script blocked by ad blocker | Disable ad blocker on your domain; check DevTools Network tab for `gtag.js` |
| No rows in `push_tokens` table | DB file doesn't exist yet or no one consented | Visit `/ar` in browser, click Enable, then run SQLite query |

---

## Appendix A: Quick SQLite Queries

```bash
# Total subscribers
node -e "const db = require('better-sqlite3')('data/madinaty.db'); console.log(db.prepare('SELECT COUNT(*) as total FROM push_tokens').get());"

# All tokens with full details
node -e "const db = require('better-sqlite3')('data/madinaty.db'); console.log(db.prepare('SELECT * FROM push_tokens').all());"

# Subscribers by locale
node -e "const db = require('better-sqlite3')('data/madinaty.db'); console.log(db.prepare('SELECT locale, COUNT(*) as c FROM push_tokens GROUP BY locale').all());"

# Subscribers by platform
node -e "const db = require('better-sqlite3')('data/madinaty.db'); console.log(db.prepare('SELECT platform, COUNT(*) as c FROM push_tokens GROUP BY platform').all());"
```

---

## Appendix B: Architecture Diagram

```
Visitor opens https://www.madinatyai.com
    |
    +-- GA4 script loads automatically (via @next/third-parties)
    |   +-- Tracks page_view and all custom events via gtag()
    |
    +-- NotificationPrompt renders after 1.2s delay
        |
        +-- User clicks "Enable Notifications"
            |
            +-- Browser shows native permission dialog
                |
                +-- Granted
                |   |
                |   +-- Firebase SDK generates FCM token
                |   |
                |   +-- POST /api/push-subscribe
                |       +-- Token + device data saved to SQLite
                |
                +-- Denied / Dismissed
                    +-- GA4 event logged; prompt hidden

Later: Admin sends notification via Firebase Console
    |
    +-- FCM delivers to all active tokens
        |
        +-- Tab in foreground → in-app toast shown
        +-- Tab in background → OS notification shown
```

---

*Document generated on: 2026-05-16*  
*Project: Madinaty AI — Next.js 15, Firebase 11, GA4*

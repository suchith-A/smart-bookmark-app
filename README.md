# 🚀 Smart Bookmark App

A full-stack real-time bookmark manager built with **Next.js (App Router)**, **Supabase**, and **Tailwind CSS**.

Live Demo:  
👉 https://smart-bookmark-app-a8w6.vercel.app

---

## 📌 Features

- 🔐 Google OAuth Authentication (Supabase Auth)
- 👤 User-specific private bookmarks (Row Level Security)
- ➕ Add new bookmarks (Title + URL)
- 🗑 Delete bookmarks
- ⚡ Real-time updates across multiple tabs
- 🌐 Deployed on Vercel

---

## 🛠 Tech Stack

- **Frontend:** Next.js 16 (App Router)
- **Backend:** Supabase (Auth + PostgreSQL + Realtime)
- **Styling:** Tailwind CSS
- **Authentication:** Google OAuth
- **Deployment:** Vercel

---

## 🧠 Architecture Overview

1. Users log in using Google OAuth via Supabase.
2. Supabase handles session management.
3. Bookmarks are stored in PostgreSQL.
4. Row Level Security (RLS) ensures users can only access their own bookmarks.
5. Supabase Realtime listens for database changes.
6. UI updates instantly without refresh.

---

## 🔒 Database Security (RLS)

The `bookmarks` table uses Row Level Security policies:

- Users can view only their own bookmarks.
- Users can insert only their own bookmarks.
- Users can delete only their own bookmarks.

This ensures complete data isolation per user.

---

## ⚙️ Local Setup Instructions

Clone the repository:

```bash
git clone https://github.com/suchith-A/smart-bookmark-app.git
cd smart-bookmark-app

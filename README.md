# The Wild Oasis – Customer Website

A beautiful, modern **customer-facing website** for **The Wild Oasis** luxury cabin resort.  
Users can browse cabins, check availability, make reservations, view & manage their bookings, and update their guest profile — all with a smooth, optimistic UI.

Built as the client-side companion to the internal hotel management dashboard (often called "The Wild Oasis" admin app in Jonas Schmedtmann's course).

## Tech Stack

- **Next.js 14+** (App Router)
- **React** 19 (with new hooks: useOptimistic, useActionState, useTransition, Suspense)
- **Supabase** – PostgreSQL database + auth helpers
- **Auth.js / NextAuth v5** – Google OAuth login
- **Tailwind CSS** + modern utility-first styling
- **Server Actions** & **Server Components**

## Key Features & Learning Highlights

- First real Next.js (App Router) project
- Google authentication via NextAuth + Google Developer Console
- Image & font optimization with Next.js `<Image>` & `next/font`
- Clean, responsive, luxurious UI/UX
- Used brand-new React 19 APIs for the first time:
  - `useOptimistic` → instant UI feedback before server response
  - `useActionState` → form state & error handling
  - `useTransition` → non-blocking updates
  - `Suspense` boundaries + streaming
- Optimistic reservations & profile updates
- Protected routes (account, reservations)
- Dynamic cabin filtering & date selection
- Form validation & nice user feedback

## Getting Started

### 1. Prerequisites

- Node.js ≥ 18
- A Supabase project (PostgreSQL + auth enabled)
- Google OAuth credentials

### 2. Environment Variables

Create `.env.local` in the root:

```env
# Supabase
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-anon-key

# NextAuth / Auth.js
AUTH_GOOGLE_ID=your-google-client-id
AUTH_GOOGLE_SECRET=your-google-client-secret
AUTH_SECRET=generate-a-strong-random-secret   # openssl rand -base64 32

# Optional – helps in dev & avoids warning
NEXTAUTH_URL=http://localhost:3000
# In production → https://your-domain.com
```

> **Tip**: Use `openssl rand -base64 32` or https://generate-secret.vercel.app/32 to create a secure `AUTH_SECRET`.

### 3. Installation & Development

```bash
# Clone & enter folder
git clone https://github.com/Calcifer077/the-wild-oasis-website-udemy.git
cd the-wild-oasis-website

# Install dependencies
npm install
# or yarn / pnpm / bun install

# Start dev server
npm run dev
# or yarn dev / pnpm dev / bun dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure (simplified)

```text
app/
├── _components/         → all reusable UI pieces
├── _lib/                → actions, data fetching, supabase client, auth helpers
├── account/             → protected area (profile, reservations, edit booking)
├── cabins/              → cabin list + detail page
├── api/auth/[...nextauth]/ → NextAuth route handler
└── ... (other pages: about, login, etc.)
```

## Acknowledgments

Built while following **Jonas Schmedtmann's "The Ultimate React Course 2025"** (Next.js section) on Udemy.  
Huge thanks to Jonas for the excellent teaching — this project taught me modern Next.js patterns in a very practical way.

---

Feel free to star ⭐ this repo if you find it useful!

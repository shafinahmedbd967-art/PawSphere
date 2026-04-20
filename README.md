# 🐾 PawSphere — AI-Powered Animal Rescue Platform

> Bangladesh's first AI-powered, community-driven animal rescue, adoption, and care platform.

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev

# 3. Open in browser
# → http://localhost:3000
```

---

## 📁 Project Structure

```
pawsphere/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx            # 🏠 Home / Landing page
│   │   ├── map/page.tsx        # 🗺️ Live interactive map
│   │   ├── rescue/page.tsx     # 🆘 Rescue & Emergency + Ambulance
│   │   ├── adopt/page.tsx      # 🏠 Adoption with smart matching
│   │   ├── vet/page.tsx        # 🏥 Vet directory & booking
│   │   ├── volunteer/page.tsx  # 👥 Volunteer network & tasks
│   │   ├── donate/page.tsx     # 💰 Donation & transparency
│   │   ├── community/page.tsx  # 💬 Community feed
│   │   ├── dashboard/page.tsx  # 📊 Admin analytics dashboard
│   │   └── auth/page.tsx       # 🔐 Login / Signup
│   ├── components/
│   │   ├── layout/             # Navbar, PageLayout, ThemeProvider
│   │   ├── map/                # Leaflet MapComponent
│   │   └── ui/                 # Shared UI components
│   ├── store/
│   │   └── appStore.ts         # Zustand global state
│   ├── lib/
│   │   └── mockData.ts         # All dummy data
│   └── translations/
│       ├── en.json             # English translations
│       └── bn.json             # Bangla translations
├── tailwind.config.js
├── next.config.mjs
└── package.json
```

---

## ✨ Features Implemented

| Module | Status |
|--------|--------|
| 🗺️ Live Rescue Map (Leaflet + OpenStreetMap) | ✅ |
| 🆘 Rescue & Emergency System | ✅ |
| 🚑 Animal Ambulance System | ✅ |
| 🏥 Vet Directory & Appointment Booking | ✅ |
| 🏠 Adoption with Smart Match Algorithm | ✅ |
| 🍖 Feeding & Donation System | ✅ |
| 👥 Volunteer Network & Task Assignment | ✅ |
| 📢 Notifications & Lost Pet Alerts | ✅ |
| 🧠 AI Severity Analysis (mock) | ✅ |
| 📊 Admin Dashboard & Analytics | ✅ |
| 🏆 Gamification (Points, Badges, Leaderboard) | ✅ |
| 💬 Community Feed | ✅ |
| 🔐 Auth with Role-Based Access | ✅ |
| 🌐 Bangla / English Toggle | ✅ |
| 🌙 Dark / Light Mode | ✅ |
| 📱 Mobile-First Responsive | ✅ |

---

## 🎨 Design System

- **Primary:** `#FF8C42` (Warm Orange)
- **Secondary:** `#2EC4B6` (Teal)
- **Style:** Glassmorphism + Neumorphism hybrid
- **Fonts:** Sora (display), DM Sans (body), Hind Siliguri (Bangla)
- **Animations:** Framer Motion

---

## 🔐 Demo Login

Click any demo account on the login page:

| Role | Email | Password |
|------|-------|----------|
| 👑 Admin | admin@pawsphere.bd | demo123 |
| 🩺 Vet | vet@pawsphere.bd | demo123 |
| 🙋 Volunteer | vol@pawsphere.bd | demo123 |
| 👤 User | user@pawsphere.bd | demo123 |

---

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **State:** Zustand
- **Animations:** Framer Motion
- **Maps:** Leaflet + React-Leaflet
- **Charts:** Recharts
- **i18n:** Custom JSON translation system
- **Notifications:** React Hot Toast

---

## 🚀 Production Roadmap

To make this production-ready, connect:

1. **Database:** PostgreSQL (Prisma ORM)
2. **Auth:** NextAuth.js or Clerk
3. **Maps:** Upgrade to Google Maps / Mapbox for Bangladesh coverage
4. **Images:** Cloudinary for uploads
5. **Real-time:** Socket.io for live updates
6. **Push Notifications:** Firebase / OneSignal
7. **Payments:** bKash / Nagad / SSLCommerz integration
8. **AI:** OpenAI Vision API for injury analysis

---

*Built with ❤️ for animals of Bangladesh* 🇧🇩

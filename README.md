# 🛒 BazarDor (বাজার দর)

## Overview
**BazarDor (বাজার দর)** is a web-based commodity price-tracking application built for educational and learning purposes. The platform provides users with insights and updates on daily essential market prices in Bangladesh—including rice, lentils, oil, vegetables, fish, meat, eggs, and spices.

The primary goal of this project was to practice modern full-stack web development concepts, including dynamic routing, state management, responsive UI design, and authentication workflows in a Next.js environment.

---

## Technologies Used

* **Framework:** Next.js (App Router)
* **Frontend Library:** React
* **Styling:** Tailwind CSS
* **Fonts & UI:** Next.js Google Fonts (`Hind Siliguri` for Bengali typography), `react-hot-toast` for toast notifications
* **Authentication:** Custom Auth Client (`auth-client`)
* **Data Fetching:** Asynchronous JavaScript / REST API Integration

---

## Key Features

### 1. Live Price Ticker & Dynamic Date Display
* Animated looping ticker showcasing real-time price updates and percentage changes for core essentials.
* Localized Bangladeshi date display (`bn-BD`) using React's `useSyncExternalStore` to avoid SSR hydration mismatches.

### 2. Categorized Product Directory
* Organizes commodities into intuitive categories (e.g., Rice, Lentils, Oil, Vegetables, Fish, Meat).
* Allows effortless browsing and category filtering across essential market items.

### 3. Price Trend Tracking (Risers & Fallers)
* Automatically filters and highlights products with recent price increases or price drops.
* Displays visual indicators (color-coded badges and direction arrows) for market changes.

### 4. Detailed Product Pages & Market Statistics
* Dynamic routing (`/product/[slug]`) providing unit-based price metrics (kg, liter, piece, dozen).
* Calculates key statistics automatically—including minimum, maximum, and average market rates, along with regional market breakdowns.

### 5. User Authentication & Protected Workflows
* Integrated Sign In, Sign Up, Profile, and Sign Out user session flows.
* Uses React `<Suspense>` boundaries to handle client-side URL params and session state safely.
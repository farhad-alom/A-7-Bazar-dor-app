# BazarDor (বাজার দর)

## 🛒 Short Description
BazarDor is a modern web application that helps users check daily essential commodity prices in Bangladesh at a glance. It provides real-time market price comparisons, category-wise filtering, and secure user authentication so citizens can stay informed about market conditions easily.

---

## 🛠️ Technologies Used
- **Next.js:** Used for building a fast and responsive User Interface (UI).
- **Next.js App Router:** Handles seamless page routing and navigation.
- **Tailwind CSS:** Provides clean styling, modern design, and mobile responsiveness.
- **JavaScript:** Powers the core application logic and data fetching.
- **BetterAuth:** Secures user registration, login, and profile management.
- **MongoDB:** Stores user profiles and commodity data securely.

---

## ✨ 5 Key Features
1. **Live Price Ticker:** A smooth scrolling banner displaying real-time updates for essential goods like rice, onion, and potatoes.
2. **Category Filtering:** Easily filter commodities by categories such as rice, pulses, oil, vegetables, fish, and meat.
3. **Market Price Comparison:** View minimum, maximum, and average prices across different local markets in Bangladesh.
4. **Secure Authentication:** User signup and sign-in powered by BetterAuth, including social login support (Google & GitHub).
5. **Responsive Dashboard:** Fully optimized user profile page where members can view and update their account details.

---

## 🚀 Live Link

### How to View the Live Project
View the live, fully functional application instantly by visiting the production URL hosted on Vercel:
👉 **[Live Demo Link](https://a-7-bazar-dor-ej9zqofnn-no-team-e544.vercel.app)**

### How to Run Locally
If you want to review the source code locally on your machine, follow these simple steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/farhad-alom/A-7-Bazar-dor-app.git
   cd A-7-Bazar-dor-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add your credentials:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   BETTER_AUTH_SECRET=your_auth_secret
   BETTER_AUTH_URL=http://localhost:3000
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.
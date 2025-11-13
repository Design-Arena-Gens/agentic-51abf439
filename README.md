# AnnapurnaAI – Ancient Indian Food Recommender

AnnapurnaAI blends classical Ayurvedic principles with modern wellness tracking to recommend healing foods, rituals, and remedies tailored to each user. The platform features a React + Tailwind frontend, an Express + MongoDB API, JWT authentication, Recharts visualisations, and a Vercel-ready deployment pipeline.

## ✨ Features

- Elegant Ayurvedic-inspired UI with responsive layouts and mindful typography
- Email/password authentication with JWT protection and profile completion flow
- Personalised dashboard displaying health score, hydration, calories, and sleep trends
- Daily stat logging modal with Recharts weight/calorie trend visualisations
- Food recommendation explorer filtered by disease, dosha, and activity level
- Curated remedy library plus a ritual-of-the-day spotlight
- Conversational Ayurvedic chatbot for quick guidance and rituals

## 🧱 Project Structure

```
.
├── api/                  # Serverless entrypoint for Vercel
├── backend/              # Express API, models, controllers, services
├── frontend/             # React (Vite) client with Tailwind + Recharts
├── package.json          # Workspace root with shared scripts
└── vercel.json           # Deployment configuration
```

## 🚀 Local Development

1. Install workspace dependencies:
   ```bash
   npm install
   ```
2. Copy environment templates and provide secrets:
   ```bash
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env
   ```
   Populate `backend/.env` with your MongoDB Atlas URI and `JWT_SECRET`.

3. Run backend and frontend in separate terminals:
   ```bash
   npm run dev:backend
   npm run dev:frontend
   ```
   - API: `http://localhost:5000`
   - Web: `http://localhost:5173` (proxied `/api` requests to the backend)

## 🧪 Build & Verification

```bash
npm run build   # Builds the React application (used by Vercel)
```

## 🌩 Deployment

The repository is configured for Vercel:

- `frontend` is built via `@vercel/static-build`
- `api/index.js` wraps the Express app for serverless execution
- Static assets are served from `frontend/dist`

Configure the following environment variables on Vercel:

- `MONGODB_URI`
- `JWT_SECRET`
- (Optional) `CLIENT_ORIGIN` – comma-separated list of allowed origins

Deploy with:

```bash
vercel deploy --prod --yes --token $VERCEL_TOKEN --name agentic-51abf439
```

## 🛡 Tech Stack

- **Frontend:** React 18, Vite, Tailwind CSS, Recharts, Axios, React Router
- **Backend:** Node.js, Express, MongoDB Atlas, Mongoose, JWT, bcrypt, Helmet, CORS
- **Deployment:** Vercel, Serverless Functions, Workspace-based monorepo

---

Crafted with reverence for ancient Indian culinary wisdom and mindful modern design. 🕉️

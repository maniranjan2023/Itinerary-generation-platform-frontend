# 🧳 Travel Itinerary App

This project is a **full-stack travel itinerary web application** that allows users to create, view, and share trips with integrated weather forecasts. It demonstrates complete end-to-end development across **frontend, backend, and database layers**.

---

## Features

### 🏖️ Core Functionality

* Create a trip with:

  * Trip name
  * Destination city
  * Start and end dates
  * List of activities (each with a title and optional time)
* View your itinerary in a **day-by-day** format
* Store trip data in a database (SQLite or PostgreSQL)
* Integrated **weather forecasts** for trip dates using OpenWeather API
* Generate **read-only shareable links** for each itinerary
* Shared public view for friends to see trip details

---

## 🧩 Tech Stack

| Layer            | Technology                               |
| ---------------- | ---------------------------------------- |
| **Frontend**     | React + Vite                             |
| **Backend**      | Node.js + Express                        |
| **Database**     | SQLite (local) / PostgreSQL (production) |
| **ORM**          | Prisma / Sequelize                       |
| **Styling**      | Tailwind CSS                             |
| **External API** | OpenWeather API                          |

---

## Project Structure

```
travel-itinerary-app/
├── backend/
│   ├── server.js
│   ├── routes/
│   │   └── trips.js
│   ├── models/
│   │   └── Trip.js
│   └── prisma/
│       └── schema.prisma
│
├── frontend/
│   ├── index.html
│   ├── vite.config.js
│   ├── src/
│   │   ├── main.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── CreateTrip.jsx
│   │   │   └── TripDetails.jsx
│   │  
│   │   
│   └── package.json
│
├── .env
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/travel-itinerary-app.git
cd travel-itinerary-app
```

### 2️⃣ Backend Setup

```bash
cd backend
npm install
npm run dev
```

Create a `.env` file in the `backend/` folder:

```env
DATABASE_URL="file:./dev.db"
PORT=5000
OPENWEATHER_API_KEY=your_openweather_api_key
BASE_URL=http://localhost:3000
```

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The app will start on **[http://localhost:5173](http://localhost:5173)** (default Vite port).

---

## 🔌 API Endpoints

| Method | Endpoint                   | Description                      |
| ------ | -------------------------- | -------------------------------- |
| `POST` | `/api/trips`               | Create a new trip                |
| `GET`  | `/api/trips`               | List all trips                   |
| `GET`  | `/api/trips/:id`           | Get trip details and itinerary   |
| `GET`  | `/api/trips/share/:linkId` | Get shared (read-only) itinerary |

---

## 🌤️ Weather Integration

This app integrates with the **OpenWeather API** to fetch and display weather forecasts for each day of your trip.

You can get a free API key at [https://openweathermap.org/api](https://openweathermap.org/api).

Example request:

```bash
GET https://api.openweathermap.org/data/2.5/forecast?q=Paris&appid=YOUR_API_KEY
```

---

## 🧪 Development

### Frontend Development (Vite + React)

* Uses **Vite** for fast HMR (Hot Module Replacement)
* Supports ESLint for clean code
* Organized modular structure (pages, components, and utils)

### Backend Development (Express)

* RESTful API for trip management
* Integration with database using Prisma ORM
* Environment variable support with `.env`

---

## 🧰 Scripts

### Backend

```bash
npm run dev     # Start backend server in development mode
npm start       # Run production build
```

### Frontend

```bash
npm run dev     # Start Vite development server
npm run build   # Create production build
npm run preview # Preview production build locally
```

---

## 🚀 Deployment

| Layer        | Platform                                |
| ------------ | --------------------------------------- |
| **Frontend** | Vercel / Netlify                        |
| **Backend**  | Render / Railway / Heroku               |
| **Database** | PostgreSQL on Supabase / Neon / Railway |

---

## 🧑‍💻 Author

**Your Name**
📧 [your.email@example.com](mailto:your.email@example.com)
🌐 [GitHub](https://github.com/yourusername)

---

## 📜 License

This project is licensed under the **MIT License** – free to use, modify, and di

# IFSC Service API

A simple Node.js + Express service that provides IFSC code details with caching and database storage.

---

## Demo

[Live Demo](https://ifsc-service-1.onrender.com)

EndPoint : https://ifsc-service-1.onrender.com/ifsc/<IFSC_CODE>

Replace IFSC_CODE with original code.


---

## Features

- Fetch IFSC details from external API
- Store IFSC details in MongoDB
- Caching with Redis
- Smart data retrieval:
  - Return cached data if fresh
  - Update from external API if stale or missing
- Configurable cache TTL and stale days via `.env`

---

## Tech Stack

- **Backend:** Node.js, TypeScript, Express
- **Database:** MongoDB (Atlas or local)
- **Cache:** Redis (Upstash / cloud / local Docker)
- **HTTP client:** Axios

---

## Folder Structure

```
project-root/
│
├─ src/
│   ├─ controllers/
│   ├─ models/
│   ├─ routes/
│   ├─ services/
│   └─ utils/
│
├─ package.json
├─ tsconfig.json
├─ .env
└─ README.md
```

---

## Setup (Local)

1. **Clone the repo:**

   ```sh
   git clone <repo-url>
   cd <repo-folder>
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Create a `.env` file:**

   ```
   MONGO_URI=
   REDIS_URL=
   PORT=
   CACHE_TTL=
   STALE_DAYS=
   ```

4. **Start MongoDB and Redis locally:**

   - MongoDB via Compass or `mongod`
   - Redis via Docker: `docker run -d --name redis -p 6379:6379 redis`

5. **Run the project:**
   ```sh
   npm run dev
   ```

---

## Access API

```
GET http://localhost:3000/api/ifsc/<IFSC_CODE>
```

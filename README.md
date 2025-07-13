# 🛠️ Auction-API – Backend

This is the **backend** service for the Auction Assist platform, powering real-time auction management, user tracking, and bidding logic using **Node.js**, **Express**, **Prisma**, and **PostgreSQL**.

---

## 🚀 API Base URL

```
http://localhost:5000
```

---

## 📦 Tech Stack

- 🌐 Node.js + Express
- 🛢️ PostgreSQL
- 🔁 Prisma ORM
- 🔒 CORS, dotenv, cookie-parser
- 📞 Twilio API integration for call logging

---

## 🧬 Folder Structure

```
src/
├── controllers/       # Route handlers
├── routes/            # Express routes
├── middlewares/       # Auth and utility middleware
├── prisma/            # Prisma schema & migration setup
├── utils/             # Helper utilities
├── index.ts           # App entry point
└── config/            # Configuration and constants
```

---

## 🧪 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/auction-assist-backend.git
cd auction-assist-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/auction-assist
PORT=5000
TWILIO_ACCOUNT_SID=your_sid
TWILIO_AUTH_TOKEN=your_token
```

### 4. Set up Prisma

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 5. Start the server

```bash
npm run dev
```

The server will be running on `http://localhost:5000`

---

## 📚 API Overview

### 👤 Users

- `GET /users`
- `POST /users`
- `GET /users/:id`

### 🛍️ Auctions

- `GET /auctions`
- `POST /auctions`
- `GET /auctions/:id`

### 💰 Bids

- `POST /bids`
- `GET /auctions/:id/bids`

### 📞 Call Logs

- `POST /call-logs`
- `GET /call-logs`

---

## 🔄 Auto Auction Status Update

Auction `status` is automatically derived based on `startTime` and `endTime`, and can be updated via a scheduled job or when fetching records.

```ts
const now = new Date();
if (now < startTime) status = 'Upcoming';
else if (now > endTime) status = 'Completed';
else status = 'Active';
```

---

## 🔐 CORS Support

For development:

```ts
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
```

---

## 🔧 Deployment Notes

Ensure your database and environment variables are correctly set in production. Use `npx prisma migrate deploy` to run migrations.

---

## 🧩 Related Projects

- 🎯 [Auction Assist Frontend](https://github.com/your-username/auction-assist-frontend) – React + Tailwind + ShadCN

---

## 📄 License

MIT License – feel free to fork, modify, or contribute.

---

Built for scalable, real-time auctions with ❤️

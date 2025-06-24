# 🗣️ Voice-Controlled Real-Time Auction System

A Node.js-based backend API for a real-time auction system that integrates with a voice agent (OmniDimension) to allow users to participate in live auctions via phone calls.

---

## 🚀 Features

- 📞 Voice-enabled auction interaction via OmniDimension
- 🔍 Real-time auction listing & bid tracking
- 📈 Bidding with validation for highest offer
- 🧠 User recognition by phone number
- 📊 Persistent bidding history
- 🌐 RESTful API endpoints
- 💾 PostgreSQL database with Prisma ORM

---

## 🧱 Tech Stack

| Layer         | Technology              |
| ------------- | ----------------------- |
| Backend       | Node.js, Express.js     |
| ORM           | Prisma                  |
| Database      | PostgreSQL              |
| Voice Agent   | OmniDimension           |
| Deployment    | Render (API)            |

---

## 📁 Project Structure
/AuctionAPI
├── prisma/
│ ├── schema.prisma
├── routes/
│ ├── auction.js
│ ├── user.js
│ ├── call.js
├── index.js
├── .env
├── package.json
└── README.md

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://<username>:<password>@<host>:<port>/<dbname>"
PORT=3000
```

## 📦 Installation
```bash
Copy
Edit
git clone https://github.com/<your-username>/auction-voice-agent.git
cd auction-voice-agent
npm install
npx prisma generate
```



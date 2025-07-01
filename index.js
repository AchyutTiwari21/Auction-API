import express from "express";
import dotenv from "dotenv";
import auctionRoutes from "./routes/auction.js";
import userRoutes from "./routes/user.js";
import callRoutes from "./routes/call.js";
import cors from "cors";

dotenv.config({
    path: './.env'
});

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json());

app.use('/auctions', auctionRoutes);
app.use('/users', userRoutes);
app.use('/calls', callRoutes);

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
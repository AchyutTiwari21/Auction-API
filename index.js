import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config({
    path: './.env'
});

const app = express();

app.use(cors({
    origin: [process.env.FRONTEND_ORIGIN, process.env.OMNI_DIMENSION_ORIGIN],
    credentials: true
}));

app.use(express.json({limit: "1mb"}));
app.use(express.urlencoded({extended: true, limit: "1mb"}));
app.use(express.static("public"));
app.use(cookieParser());

app.get('/keep-alive', (req, res) => {
  res.status(200).send('OK');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(err.message);
});

import auctionRoutes from "./routes/auction.route.js";
import userRoutes from "./routes/user.route.js";
import callRoutes from "./routes/call.route.js";

app.use('/auctions', auctionRoutes);
app.use('/users', userRoutes);
app.use('/calls', callRoutes);

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
import { Router } from "express";
import {
  fetchAuction,
  fetchAuctionById,
  getAllAuctionBids,
  getAllBids,
  placeBid,
} from "../controllers/auctionController/index.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// GET /auctions - Fetch all active auctions
router.route('/').get(verifyJWT, fetchAuction);

// GET /auctions/auction?id=auctionId - Fetch auction by ID
router.route('/auction').get(verifyJWT, fetchAuctionById);

// POST /auctions/bid - Place a bid
router.route('/bid').post(verifyJWT, placeBid);

// GET /auctions/bids?id=auctionId - Get all bids for a specific auction
router.route('/bids').get(verifyJWT, getAllBids);

// GET /auctions/allBids - Get all bids in the auction
router.route('/allBids').get(verifyJWT, getAllAuctionBids);

export default router;

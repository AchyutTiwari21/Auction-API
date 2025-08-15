import { Router } from "express";
import {
  fetchAuction,
  fetchAuctionById,
  getAllAuctionBids,
  getAllBids,
  getUserBids,
  placeBid,
  getWinningBids
} from "../controllers/auctionController/index.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// GET /auctions - Fetch all active auctions
router.route('/').get(fetchAuction);

// GET /auctions/auction?id=auctionId - Fetch auction by ID
router.route('/auction').get(fetchAuctionById);

// POST /auctions/bid - Place a bid
router.route('/bid').post(placeBid);

// GET /auctions/bids?id=auctionId - Get all bids for a specific auction
router.route('/bids').get(getAllBids);

// GET /auctions/allBids - Get all bids in the auction
router.route('/allBids').get(getAllAuctionBids);

// GET /auctions/userBids - Get all bids made by the authenticated user
router.route('/userBids').get(verifyJWT, getUserBids);  

// GET /auctions/winningBids - Get all winning bids for the authenticated user
router.route('/winningBids').get(verifyJWT, getWinningBids);

export default router;

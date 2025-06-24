const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET /auctions - Fetch all active auctions
router.get('/', async (req, res) => {
  try {
    const now = new Date();

    const auctions = await prisma.auction.findMany({
      where: {
        endTime: {
          gt: now,
        },
      },
      include: {
        currentBid: true,
      },
      orderBy: {
        endTime: 'asc',
      },
    });

    res.status(200).json(auctions);
  } catch (error) {
    console.error('Error fetching auctions:', error);
    res.status(500).json({ error: 'Failed to fetch auctions' });
  }
});

// GET /auctions/:id - Fetch auction by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const auction = await prisma.auction.findUnique({
      where: { id },
      include: {
        currentBid: true, // Include current highest bid
        bids: {
          include: {
            user: {
              select: { id: true, phone: true, name: true }
            }
          },
          orderBy: { createdAt: 'desc' } // Optional: show latest bids first
        }
      }
    });

    if (!auction) {
      return res.status(404).json({ error: 'Auction not found' });
    }

    res.json(auction);
  } catch (error) {
    console.error('Error fetching auction:', error);
    res.status(500).json({ error: 'Failed to fetch auction' });
  }
});

// POST /auctions/:id/bid - Place a bid
router.post('/:id/bid', async (req, res) => {
  const auctionId = req.params.id;
  const { userId, bidAmount } = req.body;

  if (!userId || !bidAmount) {
    return res.status(400).json({ error: 'userId and bidAmount are required' });
  }

  try {
    const auction = await prisma.auction.findUnique({
      where: { id: auctionId },
      include: { currentBid: true },
    });

    if (!auction) {
      return res.status(404).json({ error: 'Auction not found' });
    }

    const now = new Date();
    if (auction.endTime < now) {
      return res.status(400).json({ error: 'Auction has already ended' });
    }

    const currentHighest = auction.currentBid?.amount || 0;

    if (bidAmount <= currentHighest) {
      return res.status(400).json({
        error: `Bid must be higher than the current bid of ${currentHighest}`,
      });
    }

    const floatBidAmount = parseFloat(bidAmount);
    // Create the new bid
    const newBid = await prisma.bid.create({
      data: {
        amount: floatBidAmount,
        user: { connect: { id: userId } },
        auction: { connect: { id: auctionId } },
      },
    });

    // Update the auction with the new highest bid
    await prisma.auction.update({
      where: { id: auctionId },
      data: {
        currentBidId: newBid.id,
      },
    });

    res.status(201).json({ message: 'Bid placed successfully', bid: newBid });
  } catch (error) {
    console.error('Error placing bid:', error);
    res.status(500).json({ error: 'Failed to place bid' });
  }
});

// GET /auctions/:id/bids - Get all bids for a specific auction
router.get('/:id/bids', async (req, res) => {
  const auctionId = req.params.id;

  try {
    const auction = await prisma.auction.findUnique({
      where: { id: auctionId },
    });

    if (!auction) {
      return res.status(404).json({ error: 'Auction not found' });
    }

    const bids = await prisma.bid.findMany({
      where: { auctionId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            phone: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc', // Latest bids first
      },
    });

    res.status(200).json(bids);
  } catch (error) {
    console.error('Error fetching bids:', error);
    res.status(500).json({ error: 'Failed to fetch bids' });
  }
});

module.exports = router;

import { asyncHandler } from "../../utils/index.js";
import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

export const placeBid = asyncHandler(async (req, res) => {
    const { auctionId, userId, bidAmount } = req.body;

    if (!auctionId || !userId || !bidAmount) {
        return res.status(400).json({ error: 'auctionId, userId and bidAmount are required' });
    }

    try {
        const auction = await prismaClient.auction.findUnique({
            where: { id: String(auctionId) },
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
        const newBid = await prismaClient.bid.create({
        data: {
            amount: floatBidAmount,
            user: { connect: { id: userId } },
            auction: { connect: { id: auctionId } },
        },
        });

        // Update the auction with the new highest bid
        await prismaClient.auction.update({
            where: { id: auctionId },
            data: {
                currentBidId: newBid.id,
            },
        });

        return res.status(201).json({ message: 'Bid placed successfully', bid: newBid });
    } catch (error) {
        console.error('Error placing bid:', error);
        return res.status(500).json({ error: 'Failed to place bid' });
    }
})
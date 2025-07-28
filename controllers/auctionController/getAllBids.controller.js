import { asyncHandler } from "../../utils/index.js";
import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

export const getAllBids = asyncHandler(async (req, res) => {
    const auctionId = req.query.id;

    if (!auctionId) {
        return res.status(400).json({ error: 'Auction ID is required' });
    }

    try {
        const auction = await prismaClient.auction.findUnique({
           where: { id: auctionId },
        });

        if (!auction) {
           return res.status(404).json({ error: 'Auction not found' });
        }

        const bids = await prismaClient.bid.findMany({
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

        return res.status(200).json(bids);
    } catch (error) {
        console.error('Error fetching bids:', error);
        return res.status(500).json({ error: 'Failed to fetch bids' });
    }
});
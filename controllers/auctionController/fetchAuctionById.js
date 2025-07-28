import { asyncHandler } from "../../utils/index.js";
import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

export const fetchAuctionById = asyncHandler(async (req, res) => {
    const { id } = req.query;

    if (!id) {
        return res.status(400).json({ error: 'Auction ID is required' });
    }

    try {
        const auction = await prismaClient.auction.findUnique({
        where: { id: String(id) },
        include: {
            currentBid: true, // Include current highest bid
            product: true, // Include product details
            bids: {
            include: {
                user: {
                   select: { id: true, phone: true, name: true }
                }
            },
            orderBy: { createdAt: 'desc' }
            }
        }
        });

        if (!auction) {
           return res.status(404).json({ error: 'Auction not found' });
        }

        return res.json(auction);
    } catch (error) {
        console.error('Error fetching auction:', error);
        return res.status(500).json({ error: 'Failed to fetch auction' });
    }
});
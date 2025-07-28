import { asyncHandler } from "../../utils/index.js";
import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

export const getAllAuctionBids = asyncHandler(async (req, res) => {
    try {
        const bids = await prismaClient.bid.findMany({
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        phone: true,
                        email: true,
                        picture: true
                    }
                },
                auction: {
                    select: {
                        id: true,
                        startTime: true,
                        endTime: true,
                        product: {
                            select: {
                                name: true,
                                imageUrl: true
                            }
                        },
                        currentBid: {
                            select: {
                                amount: true
                            }
                        }
                    }
                }
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        return res.status(200).json(bids);
    } catch (error) {
        console.error('Error fetching bids:', error);
        return res.status(500).json({ error: 'Failed to fetch bids' });
    }
})
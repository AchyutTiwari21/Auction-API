import { asyncHandler } from "../../utils/index.js";
import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

export const fetchAuction = asyncHandler( async(req, res) => {
    try {
        // const now = new Date();
        const auctions = await prismaClient.auction.findMany({
            include: {
                product: {
                    select: {
                        name: true,
                        description: true,
                        imageUrl: true
                    }
                },
                currentBid: true,
                bids: {
                select: {
                    id: true,
                    amount: true,
                    createdAt: true,
                    user: {
                        select: {
                            id: true,
                            name: true,
                            picture: true
                        }
                    }
                }
                }
            },
            orderBy: {
                endTime: 'asc'
            }
        });


        return res.status(200).json(auctions);
  } catch (error) {
        console.error('Error fetching auctions:', error);
        return res.status(500).json({ error: 'Failed to fetch auctions' });
  }
})
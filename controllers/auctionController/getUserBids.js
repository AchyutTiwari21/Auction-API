import { asyncHandler } from "../../utils/index.js";
import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

export const getUserBids = asyncHandler(async (req, res) => {
    const user = req.user;

    if(!user) {
        return res.status(401).json({
            message: "User not authenticated",
            success: false
        });
    }

    const userId = user.id;

    try {
        const bids = await prismaClient.bid.findMany({
            where: { userId },
            select: {
                id: true,
                amount: true,
                createdAt: true,
                auction: {
                    select: {
                        product: {
                            select: {
                                imageUrl: true,
                                name: true
                            }
                        },
                        endTime: true,
                        currentBid: {
                            select: {
                                id: true
                            }
                        }
                    }
                }
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        if(!bids) {
            return res.status(404).json({
                message: "No bids found for this user",
                success: false
            });
        }

        return res.status(200).json(bids);
    } catch (error) {
        console.log(error.message || "Error while fetching user bids");
        return res.status(500).json({
            message: error.message || "Internal server error",
            success: false
        });
    }
})
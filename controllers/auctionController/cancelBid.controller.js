import { asyncHandler } from "../../utils/index.js";
import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

export const cancelBid = asyncHandler(async (req, res) => {
    const user = req.user;
    if (!user) {
        return res.status(401).json({ 
            message: 'Unauthorized',
            success: false
        });
    }

    const bidId = req.params.bidId;
    if (!bidId) {
        return res.status(400).json({ 
            message: 'bidId is required',
            success: false
        });
    }

    try {
        const bid = await prismaClient.bid.findUnique({
            where: { id: String(bidId) },
            include: { 
                auction: { 
                    include: { 
                        bids: { 
                            orderBy: { createdAt: 'desc' } 
                        } 
                    } 
                } 
            },
        });

        if (!bid) {
            return res.status(404).json({ 
                message: 'Bid not found',
                success: false
            });
        }

        if (bid.userId !== user.id) {
            return res.status(403).json({ 
                message: 'Not authorized to cancel this bid',
                success: false
            });
        }

        const auction = bid.auction;

        // If the cancelled bid is the current bid
        if (auction.currentBidId === bidId) {
            if (auction.bids.length < 2) {
                await prismaClient.auction.update({
                    where: { id: auction.id },
                    data: { currentBidId: null }
                });
            }

            // Set the next-highest bid as the current bid
            await prismaClient.auction.update({
                where: { id: auction.id },
                data: { currentBidId: auction.bids[1].id }
            });
        }

        await prismaClient.bid.delete({
            where: { id: String(bidId) },
        });

        return res.status(200).json({ 
            message: 'Bid cancelled successfully', 
            success: true 
        });

    } catch (error) {
        console.error('Error cancelling bid:', error);
        return res.status(500).json({ 
            message: error.message || 'Failed to cancel bid',
            success: false
        });
    }
});

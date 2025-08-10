import { asyncHandler } from "../../utils/index.js";
import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

export const recordCall = asyncHandler(async (req, res) => {
    const { userId, email, auctionId, startedAt, endedAt, status } = req.body;

    if (!userId || !email || !startedAt || !status) {
        return res.status(400).json({ error: 'Missing required fields: userId, email, startedAt, or status' });
    }

    try {
        const newCall = await prismaClient.callLog.create({
            data: {
                userId,
                email,
                auctionId: auctionId || null,
                startedAt: new Date(startedAt),
                endedAt: endedAt ? new Date(endedAt) : null,
                status,
            },
        });

        return res.status(201).json({
            message: 'Call logged successfully',
            call: newCall,
        });
    } catch (error) {
        console.error('Error logging call:', error);
        return res.status(500).json({ error: 'Failed to log call' });
    }
});
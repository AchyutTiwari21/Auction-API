import { asyncHandler } from "../../utils/index.js";
import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

export const retriveCallLog = asyncHandler(async (req, res) => {
    try {
        const callLogs = await prismaClient.callLog.findMany({
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        picture: true,
                        email: true,
                    },
                },
            },
            orderBy: { startedAt: 'desc' },
        });

        return res.status(200).json(callLogs);
    } catch (error) {
        console.error('Error retrieving call logs:', error);
        return res.status(500).json({ error: 'Failed to retrieve call logs' });
    }
})
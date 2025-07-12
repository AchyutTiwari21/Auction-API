import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// POST /calls - Record a new phone call
router.post('/', async (req, res) => {
  const { userId, phone, auctionId, startedAt, endedAt, status } = req.body;

  if (!userId || !phone || !startedAt || !status) {
    return res.status(400).json({ error: 'Missing required fields: userId, phone, startedAt, or status' });
  }

  try {
    const newCall = await prisma.callLog.create({
      data: {
        userId,
        phone,
        auctionId: auctionId || null,
        startedAt: new Date(startedAt),
        endedAt: endedAt ? new Date(endedAt) : null,
        status,
      },
    });

    res.status(201).json({
      message: 'Call logged successfully',
      call: newCall,
    });
  } catch (error) {
    console.error('Error logging call:', error);
    res.status(500).json({ error: 'Failed to log call' });
  }
});

// GET /calls - Retrieve call logs 
router.get('/callLogs', async (req, res) => {
  try {
    const callLogs = await prisma.callLog.findMany({
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

    res.status(200).json(callLogs);
  } catch (error) {
    console.error('Error retrieving call logs:', error);
    res.status(500).json({ error: 'Failed to retrieve call logs' });
  }
});

export default router;

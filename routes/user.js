import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// POST /users - Register or Identify User by Phone
router.post('/', async (req, res) => {
  const { phone, name } = req.body;

  if (!phone) {
    return res.status(400).json({ error: 'Phone number is required' });
  }

  try {
    // Check if user already exists
    let user = await prisma.user.findUnique({
      where: { phone },
    });

    if (!user) {
      // Register new user
      user = await prisma.user.create({
        data: {
          phone,
          name: name || null,
        },
      });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error creating or fetching user:', error);
    res.status(500).json({ error: 'Failed to create or identify user' });
  }
});

export default router;
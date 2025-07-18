import { asyncHandler } from "../../utils";
import { PrismaClient } from "@prisma/client/extension";

const prismaClient = new PrismaClient();

export const getUsers = asyncHandler(async(req, res) => {
    const users = await prismaClient.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        picture: true,
        bids: {
          select: {
            id: true,
            amount: true,
          },
        },
        createdAt: true,
      },
    });

    if(users) {
        return res.status(200).json(users);
    }
    else {
        return res.status(500).json({
            message: "Something went wrong while fetching the users.",
            success: false
        });
    }
});
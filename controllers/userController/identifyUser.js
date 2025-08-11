import { asyncHandler } from "../../utils/index.js";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prismaClient = new PrismaClient();

export const identifyUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            message: "Username and password are required", 
            success: false
        });
    }

    const user = await prismaClient.user.findFirst({
        where: {
            username
        }
    });

    if(!user) {
        return res.status(404).json({
            message: "Signup to chat with the ai voice agent.",
            success: false
        });
    }

    const isPasswordValid = await bcrypt.compare(password, user?.password);
    
    if(!isPasswordValid) {
        return res.status(401).json({
            message: "Password is not valid.",
            status: false
        });
    }

    const loggedInUser = await prismaClient.user.findFirst({
        where: {
            username
        },
        select: {
            id: true,
            name: true,
            email: true,
            username: true,
            totalBids: true
        }
    });

    return res.status(200).json(loggedInUser);
})
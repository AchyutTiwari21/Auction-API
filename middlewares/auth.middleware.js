import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { ACCESS_TOKEN_SECRET } from "../config.js";

const prismaClient = new PrismaClient();

export const verifyJWT = asyncHandler(async (req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.headers("authorization")?.replace("Bearer ", "");
    
        if(!token) {
            throw new ApiError(401, "Unauthorized request");
        }
    
        const decodedToken = jwt.verify(token, ACCESS_TOKEN_SECRET);
    
        const user = await prismaClient.user.findFirst({
            where: {
                id: decodedToken.id
            },
            select: {
                id: true,
                username: true,
                name: true,
                picture: true,
                email: true,
                totalBids: true
            }
        });
    
        if(!user) {
            return res.status(401).json({
                message: "Invalid Access Token",
                success: false
            });
        }
    
        req.user = user;
        next();
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Something went wrong while signing JWT token.",
            success: false
        });
    }
});
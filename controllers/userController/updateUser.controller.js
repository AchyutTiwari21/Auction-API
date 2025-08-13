import { asyncHandler, ApiResponse } from "../../utils/index.js";
import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

export const updateUser = asyncHandler(async (req, res) => {
    try {
        const user = req.user;
    
        if(!user) {
            return res.status(401).json({
                message: "User not authenticated.",
                status: false
            });
        }
    
        const { name, email, dob, username } = req.body;
    
        if(!name || !email || !dob || !username) {
            return res.status(400).json({
                message: "All fields are required.",
                status: false
            });
        }
    
        const updatedUser = await prismaClient.user.update({
            where: {
                id: user.id
            },
            data: {
                name,
                email,
                dob,
                username
            }
        });
    
        if(!updatedUser) {
            return res.status(500).json({
                message: "Failed to update user.",
                status: false
            });
        }
    
        return res.status(200).json(
            new ApiResponse(
                200,
                null,
                "User updated successfully."
            )
        );
    } catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({
            message: "Internal server error.",
            status: false
        });
    }
});
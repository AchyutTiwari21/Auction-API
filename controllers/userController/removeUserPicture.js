import { asyncHandler, ApiResponse } from "../../utils/index.js";
import { PrismaClient } from "@prisma/client";
import { deleteFromCloudinary } from "../../utils/cloudinary.js";

const prismaClient = new PrismaClient();

export const removeUserPicture = asyncHandler(async (req, res) => {
    try {
        const user = req?.user;
    
        if (!user) {
            return res.status(500).json({
                message: "User not found",
                success: false
            });
        }

        if(!user.picture) {
            return res.status(400).json({
                message: "No picture to remove",
                success: false
            });
        }

        const deleteResponse = await deleteFromCloudinary(user.picture);
        if (!deleteResponse) {
            return res.status(500).json({
                message: "Error deleting old picture from cloudinary",
                success: false
            });
        }

        const updatedUser =  await prismaClient.user.update({
            where: { id: user.id },
            data: {
                picture: null,
            }
        });

        if(!updatedUser) {
            return res.status(500).json({
                message: "Error removing user profile picture",
                success: false
            });
        }

        return res.status(200).json(
            new ApiResponse(
                200,
                null,
                "User profile picture removed successfully."
            )
        );
    } catch (error) {
        console.error("Error: ", error);
        return res.status(500).json({
            message: error.message || "Internal Server Error"
        });
    }
});
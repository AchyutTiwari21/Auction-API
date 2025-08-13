import { asyncHandler, ApiResponse } from "../../utils/index.js";
import { PrismaClient } from "@prisma/client";
import { uploadOnCloudinary, deleteFromCloudinary } from "../../utils/cloudinary.js";

const prismaClient = new PrismaClient();

export const addUserPicture = asyncHandler(async (req, res) => {
    try {
        const user = req?.user;
        
        if (!user) {
            return res.status(500).json({
                message: "User not found",
                success: false
            });
        }
    
        const userId = user.id;

        if(user.picture) {
            // If user already has a picture, delete the old one from cloudinary
            const deleteResponse = await deleteFromCloudinary(user.picture);
            if (!deleteResponse) {
                return res.status(500).json({
                    message: "Error deleting old picture from cloudinary",
                    success: false
                });
            }
        }
    
        const filePath = req.file?.path;
        if(!filePath) {
            res.status(400).json({
                message: "No file uploaded",
                success: false
            });
        }
    
        const cloudinaryResponse = await uploadOnCloudinary(filePath);
    
        if (!cloudinaryResponse) {
            return res.status(500).json({
                message: "Error uploading file to cloudinary",
                success: false
            });
        }
        
        const updatedUser =  await prismaClient.user.update({
            where: { id: userId },
            data: {
                picture: cloudinaryResponse.url,
            }
        });

        if(!updatedUser) {
            return res.status(500).json({
                message: "Error updating user profile picture",
                success: false
            });
        }

        return res.status(200).json(
            new ApiResponse(
                200,
                updatedUser.picture,
                "User profile picture add successfully."
            )
        )
    } catch (error) {
        console.error("Error: ", error);
        return res.status(500).json({
            message: error.message || "Internal Server Error"
        });
    }
});
import { asyncHandler, ApiResponse } from "../../utils/index.js";
import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

export const signoutUser = asyncHandler( async(req, res) => {

    const user = req.user;

    await prismaClient.user.update({
        where: {
            id: user.id
        },
        data: {
            refreshToken: null
        }
    });

    const options = {
        httpOnly: true,
        sameSite: 'none',
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, null, "User logged Out"));
});
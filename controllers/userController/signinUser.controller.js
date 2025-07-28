import { asyncHandler, ApiResponse } from "../../utils/index.js";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { generateAccessAndRefreshTokens } from "../../utils/generateToken.js";

const prismaClient = new PrismaClient();

export const signinUser = asyncHandler(async(req, res) => {

    const {email, username, password} = req.body;

    if(!username && !email) {
        return res.status(400).json({
            message: "Username or email is required",
            status: false
        });
    }

    const user = await prismaClient.user.findFirst({
        where: {
            OR: [
                { email: email },
                { username: username }
            ]
        }
    });

    if(!user) {
        return res.status(404).json({
            message: "User does not exist with this username or email",
            status: false
        });
    }

    const isPasswordValid = await bcrypt.compare(password, user?.password);

    if(!isPasswordValid) {
        return res.status(401).json({
            message: "Password is not valid.",
            status: false
        });
    }

    const { accessToken, refreshToken } = generateAccessAndRefreshTokens(user);

    const loggedInUser = await prismaClient.user.update({
        where: {
            id: user.id
        },
        data: {
            refreshToken: refreshToken
        },
        select: {
            id: true,
            dob: true,
            name: true,
            picture: true,
            email: true,
            totalBids: true
        }
    })

    const options = {
        httpOnly: true,
        sameSite: 'none',
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200,
            {
                user: loggedInUser, accessToken, refreshToken
            },
            "User logged In Successfuly"
        )
    );
})
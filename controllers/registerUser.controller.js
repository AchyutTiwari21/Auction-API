import { asyncHandler, ApiResponse } from "../utils";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prismaClient = new PrismaClient();

export const registerUser = asyncHandler(async(req, res) => {

    const {username, password, name, picture, email} = req.body;

    if(!username || !password || !name || !email) {
        res.status(400).json({
            message: "All fields are required.",
            success: false
        })
    }

    // checking if user is present or not
    const existedUser = await prismaClient.user.findFirst({
        where: {
            OR: [
                {username},
                {email}
            ]
        }
    });

    if(existedUser) {
        res.status(409).json({
            message: "User already existed with username or email."
        })
    }

    const hashedPassword = await bcrypt.hash(password, 5);

    const user = await prismaClient.user.create({
        data: {
            username,
            name,
            email,
            password: hashedPassword,
            picture
        }
    });

    if(user) {
        res.status(201).json(
            new ApiResponse(
                201,
                { id: user.id, username: user.username, name: user.name, picture: user.picture, email: user.email },
                "User has been signed up",
                true
            )
        );
        return;
    } else {
        res.status(500).json({
            message: "Something went wrong while registering the user.s"
        });
        return;
    }
});
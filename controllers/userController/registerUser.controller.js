import { asyncHandler, ApiResponse } from "../../utils/index.js";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prismaClient = new PrismaClient();

export const registerUser = asyncHandler(async(req, res) => {

    const {name, email, dob, password} = req.body;

    if(!name || !email || !dob || !password) {
        return res.status(400).json({
            message: "All fields are required.",
            success: false
        });
    }

    // checking if user is present or not
    const existedUser = await prismaClient.user.findFirst({
        where: {
            email
        }
    });

    if(existedUser) {
        return res.status(409).json({
            message: "User already existed with username or email."
        });
    }

    const hashedPassword = await bcrypt.hash(password, 5);

    const user = await prismaClient.user.create({
        data: {
            name,
            email,
            dob: new Date(dob),
            password: hashedPassword
        }
    });

    if(user) {
        res.status(201).json(
            new ApiResponse(
                201,
                null,
                "User has been signed up",
                true
            )
        );
        return;
    } else {
        res.status(500).json({
            message: "Something went wrong while registering the users",
            success: false
        });
        return;
    }
});
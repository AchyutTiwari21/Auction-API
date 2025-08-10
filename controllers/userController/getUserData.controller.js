import { asyncHandler, ApiResponse } from "../../utils/index.js";

export const getUserData = asyncHandler(async(req, res) => {
    // const user = req.user;

    return res.status(200).json(
        new ApiResponse(
            200,
            {id: 2323, name: "John Doe"},
            "User Data retrived successfully."            
        )
    );
})
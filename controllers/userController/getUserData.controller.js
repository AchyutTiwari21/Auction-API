import { asyncHandler, ApiResponse } from "../../utils/index.js";

export const getUserData = asyncHandler(async(req, res) => {
    const user = req.user;

    return res.status(200).json(user);
})
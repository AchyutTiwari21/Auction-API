import jwt from "jsonwebtoken";
import { 
    ACCESS_TOKEN_SECRET, 
    REFRESH_TOKEN_SECRET,
    ACCESS_TOKEN_EXPIRY,
    REFRESH_TOKEN_EXPIRY
} from "../config.js";

export const generateAccessAndRefreshTokens = ( user ) => {
    const accessToken = jwt.sign(
        {
            id: user.id,
            email: user.email
        },
        ACCESS_TOKEN_SECRET,
        {
            expiresIn: ACCESS_TOKEN_EXPIRY
        }
    );

    const  refreshToken = jwt.sign(
        {
            id: user.id
        },
        REFRESH_TOKEN_SECRET,
        {
            expiresIn: REFRESH_TOKEN_EXPIRY
        }
    );

    return {
        accessToken,
        refreshToken
    }
}
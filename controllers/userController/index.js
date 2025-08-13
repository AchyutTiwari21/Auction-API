import { registerUser } from "./registerUser.controller.js";
import { getUsers } from "./getUsers.controller.js";
import { signinUser } from "./signinUser.controller.js";
import { signoutUser } from "./signoutUser.controller.js";
import { getUserData } from "./getUserData.controller.js";
import { identifyUser } from "./identifyUser.js";
import { addUserPicture } from "./addUserPicture.js";
import { updateUser } from "./updateUser.controller.js";

export {
    registerUser,
    getUsers,
    signinUser,
    updateUser,
    identifyUser,
    signoutUser,
    getUserData,
    addUserPicture
}
import { Router } from "express";
import { 
  registerUser,
  getUsers,
  signinUser,
  signoutUser,
  getUserData,
  identifyUser,
  addUserPicture
} from "../controllers/userController/index.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route('/signup').post(registerUser);
router.route('/signin').post(signinUser);
router.route('/signout').post(verifyJWT, signoutUser);

router.route('/me').get(verifyJWT, getUserData);
router.route('/getAllUsers').get(getUsers);
router.route('/identifyUser').post(identifyUser);

router.route('/addUserPicture').post(verifyJWT, upload.single('picture'), addUserPicture);

export default router;
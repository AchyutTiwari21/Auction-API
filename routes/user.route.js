import { Router } from "express";
import { 
  registerUser,
  getUsers,
  signinUser,
  signoutUser
} from "../controllers/userController/index.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route('/signup').post(registerUser);
router.route('/signin').post(signinUser);
router.route('/signout').post(verifyJWT, signoutUser);

router.route('/getAllUsers').get(verifyJWT, getUsers);

export default router;
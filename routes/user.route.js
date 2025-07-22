import { Router } from "express";
import { 
  registerUser,
  getUsers,
  signinUser
} from "../controllers/userController/index.js"

const router = Router();

router.route('/signup').post(registerUser);

router.route('/signin').post(signinUser);

router.route('/getAllUsers').get(getUsers);

export default router;
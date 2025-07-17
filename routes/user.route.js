import { Router } from "express";
import { 
  registerUser,
  getUsers
} from "../controllers"

const router = Router();

router.route('/signup').post(registerUser);

router.route('/getAllUsers').get(getUsers);

export default router;
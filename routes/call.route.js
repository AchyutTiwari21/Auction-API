import { Router } from "express";
import {
  recordCall,
  retriveCallLog
} from "../controllers/callController/index.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// POST /calls - Record a new phone call
router.route('/').post(verifyJWT, recordCall);

// GET /calls - Retrieve call logs
router.route('/callLogs').get(verifyJWT, retriveCallLog);

export default router;

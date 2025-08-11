import { Router } from "express";
import {
  recordCall,
  retriveCallLog
} from "../controllers/callController/index.js";

const router = Router();

// POST /calls - Record a new phone call
router.route('/').post(recordCall);

// GET /calls - Retrieve call logs
router.route('/callLogs').get(retriveCallLog);

export default router;

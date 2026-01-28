import { Router } from "express";
import { syncUser } from "../controllers/userController.js";
import { requireAuth } from "@clerk/express";

const router = Router();

// /api/users/sync -> POST request -> sync CLERK user to DB Protected
router.post("/sync", requireAuth, syncUser)

export default router;
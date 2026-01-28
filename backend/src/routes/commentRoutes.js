import { Router } from "express";
import { requireAuth } from "@clerk/express";
import * as commentController from "../controllers/commentController.js"

const router = Router();

// POST /api/comments/:productId - add a comment (protected)
router.post("/:productId", requireAuth, commentController.createComment);

// DELETE /api/comments/:commentId - delete comment (protected)
router.delete("/:commentId", requireAuth, commentController.deleteComment);

export default router;
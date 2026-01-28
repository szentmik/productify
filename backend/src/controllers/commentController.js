import * as queries from "../db/queries.js";
import { getAuth } from "@clerk/express";

export const createComment = async (req, res) => {
    try {
        const { userId } = getAuth(req);
        if (!userId) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }
        const { productId } = req.params;
        const { content } = req.body;
        if (!content) {
            res.status(400).json({ error: "Comment required" });
            return;
        }

        const product = await queries.getProductById(productId);
        if (!product) {
            res.status(404).json({ error: "Product not found" });
            return;
        }

        const comment = await queries.createComment({
            content,
            userId,
            productId
        });
        res.status(200).json(comment);

    } catch (error) {
        console.error("Failed to create comment ", error);
        res.status(500).json({ error: "Failed to create comment" });
    }
}

export const deleteComment = async (req, res) => {
    try {
        const { userId } = getAuth(req);
        if (!userId) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }
        const { commentId } = req.params;

        const existingComment = await queries.getCommentById(commentId);
        if (!existingComment) {
            res.status(404).json({ error: "Comment does not exist" });
            return;
        }

        if (existingComment.userId !== userId) {
            res.status(403).json({ error: "You are not the owner of the comment" });
            return;
        }
        await queries.deleteComment(commentId);

        res.status(200).json({ message: "Comment deleted successfully" })
    } catch (error) {
        console.error("Failed to delete the comment", error);
        res.status(500).json({ error: "Failed to delete." });
    }
}
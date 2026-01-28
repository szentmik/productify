import * as queries from "../db/queries.js";

import { getAuth } from "@clerk/express";

export const syncUser = async (req, res) => {
    try {
        const { userId } = getAuth(req);
        if (!userId) return res.status(401).json({ error: "Unauthorized" });

        const { email, name, imageUrl } = req.body;

        if (!email || !name || !imageUrl) {
            return res.status(400).json({ error: "Email, name, imageUrl are required." });
        }

        const user = await queries.upsertUser({
            id: userId,
            email,
            name,
            imageUrl
        });

        res.status(200).json(user);

    } catch (err) {
        console.error("error syncing user: ", err);

        res.status(500).json({ error: "Failed to sync user" })
    }
}
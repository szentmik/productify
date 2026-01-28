import express from "express";
import cors from "cors";
import { ENV } from "./config/env.js";
import { clerkMiddleware } from '@clerk/express';
import { db } from "./db/db.js";

import userRoutes from "./routes/userRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import productRoutes from "./routes/productRoutes.js";

const app = express();

app.use(cors({origin: ENV.FRONTEND_URL}));
app.use(clerkMiddleware());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/", (req, res)=>{
    res.status(200).json({endpoints:{
        users: "/api/users",
        products: "/api/products",
        comments: "/api/comments"
    }});
});

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/comments", commentRoutes);

app.listen(ENV.PORT, () => console.log(`The server is running on port: ${ENV.PORT}`));
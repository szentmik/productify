import express from "express";
import cors from "cors";
import { ENV } from "./config/env.js";
import { clerkMiddleware } from '@clerk/express'

const app = express();

app.use(cors({origin: ENV.FRONTEND_URL}));
app.use(clerkMiddleware());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/", (req, res)=>{
    res.json({endpoints:{
        users: "/api/users",
        products: "/api/products",
        comments: "/api/comments"
    }});
});

app.listen(ENV.PORT, () => console.log(`The server is running on port: ${ENV.PORT}`));
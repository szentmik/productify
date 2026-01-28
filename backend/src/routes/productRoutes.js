import { Router } from "express";
import * as productController from "../controllers/productController.js";
import { getAuth, requireAuth } from "@clerk/express";

const router = Router();

//GET /api/products => get all products (public)
router.get("/", productController.getAllproducts)

//GET /api/products/id => got one product (public)
router.get("/:id", productController.getProductById)

// GET /api/products/my => my product (protected)
router.get("/my", requireAuth, productController.getMyProduct)

// POST /api/products => create a product (protected)
router.post("/", requireAuth, productController.createProduct)

// PUT /api/products/:id => update a product (protected)
router.put("/:id", requireAuth, productController.updateProduct)

// DELETE /api/products/:id => delete a product (protected)
router.delete("/:id", requireAuth, productController.deleteProduct)

export default router;
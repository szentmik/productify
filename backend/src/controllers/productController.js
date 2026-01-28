import * as queries from "../db/queries.js";
import { getAuth } from "@clerk/express";

// GET all products

export const getAllproducts = async (req, res) => {
    try {
        const products = await queries.getAllproducts();
        res.status(200).json(products);
    } catch (error) {
        console.error("Error getting products: ", error);
        res.status(500).json({ error: "Failed to get products" })
    }
};

// get only one product

export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await queries.getProductById(id);

        if (!product) {
            res.status(404).json({ error: "Product not found" });
            return;
        }

        res.status(200).json(product);
    } catch (error) {
        console.error("Failed to get the product: ", error);
        res.status(500).json({ error: "Failed to get the product" });
    }
};

// get my product

export const getMyProduct = async (req, res) => {
    try {
        const { userId } = getAuth(req);

        if (!userId) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }

        const products = await queries.getProductByUserId(userId);
        res.status(200).json(products)
    } catch (error) {
        console.error("Error getting user products: ", error);
        res.status(500).json({ error: "Failed to get user products" })
    }
};

// create a product 

export const createProduct = async (req, res) => {
    try {
        const { userId } = getAuth(req);
        if (!userId) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }
        const { title, description, imageUrl } = req.body;

        if (!title || !description || !imageUrl) {
            res.status(400).json({ error: "Title, description and imageUrl are required" });
            return;
        }

        const product = await queries.createProduct({
            title,
            description,
            imageUrl,
            userId
        });

        res.status(200).json(product);

    } catch (error) {
        console.error("Failed to create a product ", error);
        res.status(500).json({ error: "Failed to create a product" });
    }
};

// Update a product

export const updateProduct = async (req, res) => {
    try {
        const { userId } = getAuth(req);
        if (!userId) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }

        const { id } = req.params;
        const { title, description, imageUrl } = req.body;

        const existingProduct = await queries.getProductById(id);
        if (!existingProduct) {
            res.status(404).json({ error: `There is no product with this id: ${id}`});
            return;
        }

        if (existingProduct.userId !== userId) {
            res.status(403).json({ error: "You can only edit your own products." });
            return;
        }

        const product = await queries.updateProduct(id, {
            title,
            description,
            imageUrl
        });

        res.status(200).json(product);

    } catch (error) {
        console.error("Failed to update the product", error);
        res.status(500).json({ error: "Failed to update the product" });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { userId } = getAuth(req);
        if(!userId) {
            res.status(401).json({error: "Unauthorized"});
            return;
        }

        const { id } = req.params;
        const existingProduct = await queries.getProductById(id);

        if(!existingProduct){
            res.status(404).json({error: "Product does not exist"});
            return;
        }

        if(existingProduct.userId !== userId){
            res.status(403).json({error: "You are not allowed to delete this product"});
            return;
        }

        await queries.deleteProduct(id);

        res.status(200).json({message: "Product deleted successfully"});


    } catch (error) {
        console.error("Failed to delete product", error);
        res.status(500).json({error: "Failed to delete product"});
    }
};
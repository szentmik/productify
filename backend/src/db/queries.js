import { db } from "./db.js";
import { desc, eq } from "drizzle-orm";
import { users, comments, products } from "./schema.js";

// user queries

export const createUser = async (data) => {
    const [user] = await db.insert(users).values(data).returning();
    return user;
};

export const getUserById = async (id) => {
    return db.query.users.findFirst({ where: eq(users.id, id) });
};

export const updateUser = async (id, data) => {
    const [user] = await db.update(users).set(data).where(users.id, id).returning();
    return user;
};

// upsert => create or update
export const upsertUser = async (data) => {
    const existingUser = await getUserById(data.id);
    if (existingUser) return updateUser(data.id, data);

    return createUser(data);
}

// product queries

export const createProduct = async (data) => {
    const [product] = await db.insert(products).values(data).returning();
    return product;
};

export const getAllproducts = async (data) => {
    return db.query.products.findMany({
        with: { user: true },
        orderBy: (products, { desc }) => [desc(products.createdAt)],
    });
}

export const getProductById = async (id) => {
    return db.query.products.findFirst({
        where: eq(products.id, id),
        with: {
            user: true,
            comments: { user: true },
            orderBy: (comments, { desc }) => [desc(comments.createdAt)]
        }
    });
};

export const getProductByUserId = async (userId) => {
    return db.query.products.findMany({
        where: eq(products.userId, userId),
        with: {
            user: true
        },
        orderBy: (products, { desc }) => [desc(products.createdAt)]
    })
};

export const updateProduct = async (id, data) => {
    const [product] = await db.update(products).set(data).where(eq(products.id, id)).returning();
    return product;
};

export const deleteProduct = async (id) => {
    const [product] = await db.delete(products).where(eq(products.id, id)).returning();
    return product;
};

// comments queries

export const createComment = async (data) => {
    const [newComment] = await db.insert(comments).values(data).returning();
    return newComment;
};

export const deleteComment = async (id) => {
    const [deletedComment]   = await db.delete(comments).where(eq(comments.id, id)).returning();
    return deletedComment;
};


export const getCommentById = async (id) => {
    return db.query.comments.findFirst({
        where: eq(comments.id, id),
        with: {users:true}
    });
};
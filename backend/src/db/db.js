import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema.js";
import { ENV } from "../config/env.js";

if(!ENV.DB_URL){
    throw new Error("DB_URL is not set");
}

const pool = new Pool({connectionString: ENV.DB_URL});

export const db = drizzle({client:pool}, {schema});
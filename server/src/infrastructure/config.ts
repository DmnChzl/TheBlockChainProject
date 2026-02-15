import { SQL } from "bun";
import { drizzle } from "drizzle-orm/bun-sql";

export const client = new SQL(process.env.DATABASE_NAME || "db.sqlite");
export const database = drizzle({ client });

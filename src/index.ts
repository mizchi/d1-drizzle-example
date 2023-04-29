import { drizzle } from 'drizzle-orm/d1';
import { users } from './schema';

export interface Env {
  DB: D1Database;
}

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    const db = drizzle(env.DB);
    const result = await db.select().from(users).all();
    return Response.json(result);
  },
};

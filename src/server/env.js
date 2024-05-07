// @ts-check
/**
 * This file is included in `/next.config.js` which ensures the app isn't built with invalid env vars.
 * It has to be a `.js`-file to be imported there.
 */
import zod from 'zod';
const { z } = zod;

/*eslint sort-keys: "error"*/
const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  DIRECT_URL: z.string().url().optional(),
  NODE_ENV: z.enum(["development", "test", "prod"]),
});

const env = envSchema.safeParse(process.env);

if (!env.success) {
  throw new Error(
    "❌ Invalid environment variables: " +
      JSON.stringify(env.error.format(), null, 4),
  );
}
module.exports.env = env.data;

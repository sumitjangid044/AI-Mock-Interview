/** @type { import("drizzle-kit").Config } */

export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
        url: 'postgresql://neondb_owner:npg_0iInyTNHFS7R@ep-muddy-sound-aexrsbn5-pooler.c-2.us-east-2.aws.neon.tech/Ai-mock-interview?sslmode=require&channel_binding=require',
    }
};
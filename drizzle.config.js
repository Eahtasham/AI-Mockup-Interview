import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./utils/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url:"postgresql://neondb_owner:npg_wc0kBhQ1XMLq@ep-rapid-glade-a8ukqrvv-pooler.eastus2.azure.neon.tech/neondb?sslmode=require",
  },
  out: "./drizzle",
});

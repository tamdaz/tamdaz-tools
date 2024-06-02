import { defineConfig } from "@playwright/test";
import dotenv from "dotenv"

dotenv.config();

export default defineConfig({
    use: {
        baseURL: process.env.PROJECT_URL,
    }
})
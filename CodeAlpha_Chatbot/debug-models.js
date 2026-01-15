import { GoogleGenAI } from "@google/genai";
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// Simulate __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function listModels() {
    try {
        // Try to read .env.local manually since we can't easily rely on vite's loadEnv in a pure node script without more setup
        const envPath = path.resolve(process.cwd(), '.env.local');

        let apiKey = process.env.VITE_API_KEY;

        if (!apiKey && fs.existsSync(envPath)) {
            const envContent = fs.readFileSync(envPath, 'utf-8');
            const match = envContent.match(/VITE_API_KEY=(.*)/);
            if (match && match[1]) {
                apiKey = match[1].trim();
            }
        }

        if (!apiKey) {
            console.error("❌ API Key not found in environment or .env.local");
            return;
        }

        console.log("Found API Key:", apiKey.substring(0, 5) + "...");

        const ai = new GoogleGenAI({ apiKey });

        console.log("Fetching models...");
        const result = await ai.models.list();
        if (result.models) {
            console.log("MODELS_START");
            result.models.forEach(m => {
                // strip 'models/' prefix if present
                const name = m.name.replace('models/', '');
                console.log(name);
            });
            console.log("MODELS_END");
        } else {
            console.log("NO_MODELS_FOUND");
        }
    } catch (error) {
        console.error("ERROR:" + error.message);
    }
}
listModels();

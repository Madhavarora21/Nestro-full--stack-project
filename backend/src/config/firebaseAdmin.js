import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

let serviceAccount;

if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    // Render / Production
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
} else {
    // Local development
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    serviceAccount = JSON.parse(
        readFileSync(
            join(__dirname, "firebase-service-account.json"),
            "utf-8"
        )
    );
}

if (!getApps().length) {
    initializeApp({
        credential: cert(serviceAccount),
    });
}

const adminAuth = getAuth();

export default adminAuth;
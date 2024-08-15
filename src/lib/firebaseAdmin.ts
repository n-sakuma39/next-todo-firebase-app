import admin from "firebase-admin";
import bcrypt from "bcryptjs";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

export const auth = admin.auth();

export const verifyPasswordHash = async (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};
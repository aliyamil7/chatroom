import admin from "firebase-admin";

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(
  /\\n/g,
  "\n",
).replace(/"/g, "");

if (!projectId || !clientEmail || !privateKey) {
  throw new Error("Missing Firebase environment variables");
}

admin.initializeApp({
  credential: admin.credential.cert({
    projectId,
    clientEmail,
    privateKey,
  }),
  databaseURL: "https://chatroom-d0143-default-rtdb.firebaseio.com",
});

export const db: admin.database.Database = admin.database();

import admin from "firebase-admin";
import serviceAccount from "../chatroom-d0143-firebase-adminsdk-fbsvc-5935d83412.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  databaseURL: "https://chatroom-d0143-default-rtdb.firebaseio.com",
});

export const db: admin.database.Database = admin.database();

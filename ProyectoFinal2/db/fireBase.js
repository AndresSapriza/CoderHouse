import admin from 'firebase-admin';
import fs from 'fs';

let serviceAccount = JSON.parse(fs.readFileSync('./db/serviceAccountKey.json','utf-8'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

console.log('Firebase connected');

export default admin.firestore();
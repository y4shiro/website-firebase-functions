import * as functions from 'firebase-functions';
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  connectFirestoreEmulator,
  collection,
  addDoc,
} from 'firebase/firestore';

const config = functions.config().config;
const env = config.env;

const firebaseConfig = {
  apiKey: config.api_key,
  authDomain: config.auth_domain,
  projectId: config.project_id,
  storageBucket: config.storage_bucket,
  messagingSenderId: config.messaging_sender_id,
  appId: config.app_id,
};

initializeApp(firebaseConfig);
const db = getFirestore();
if (env === 'development') connectFirestoreEmulator(db, 'localhost', 8080);

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions
  .region('asia-northeast1')
  .https.onRequest(async (request, response) => {
    try {
      const docRef = await addDoc(collection(db, 'users'), {
        first: 'Ada',
        last: 'Lovelace',
        born: 1815,
        env: config.env,
      });
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
    response.send('Hello from Firebase!');
  });

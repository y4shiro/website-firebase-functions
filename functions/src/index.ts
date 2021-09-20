import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const config = functions.config().config;

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

const db = admin.firestore();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions
  .region('asia-northeast1')
  .https.onRequest(async (request, response) => {
    try {
      const docRef = db.collection('users').doc('alovelace');

      await docRef.set({
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

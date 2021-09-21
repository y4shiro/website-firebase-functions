import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import axisos from 'axios';

const config = functions.config().config;

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  storageBucket: config.storage_bucket,
});

const db = admin.firestore();
const storage = admin.storage();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions
  .region('asia-northeast1')
  .https.onRequest(async (request, response) => {
    try {
      const imgRes = await axisos('http://placehold.jp/150x150.png', {
        responseType: 'arraybuffer',
      });

      const docRef = db.collection('image').doc('png');

      await docRef.set({
        header: imgRes.headers,
        data: imgRes.data,
        status: imgRes.status,
        env: config.env,
        bucket: config.storage_bucket,
      });
      console.log('Document written with ID: ', docRef.id);

      // Cloud Storage に書き込む
      const blob = storage.bucket().file('test.png');
      const blobStream = blob.createWriteStream({
        resumable: false,
        metadata: { 'Content-Type': 'image/png' },
      });

      blobStream.on('error', (err) => {
        console.log(err);
      });

      blobStream.on('finish', () => {
        console.log('image upload!');
      });

      blobStream.end(imgRes.data);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
    response.send('Hello from Firebase!');
  });

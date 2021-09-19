import * as functions from 'firebase-functions';
import axios from 'axios';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions
  .region('asia-northeast1')
  .https.onRequest(async (request, response) => {
    try {
      const res = await axios.get('http://placehold.jp/150x150.png', {
        responseType: 'arraybuffer',
      });

      functions.logger.info('get image', res.data);
    } catch (err) {
      functions.logger.info('failed get image');
    }

    functions.logger.info('Hello logs!', { structuredData: true });
    response.send('Hello from Firebase!');
  });

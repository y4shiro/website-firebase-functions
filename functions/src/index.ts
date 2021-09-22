import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import axisos from 'axios';

const config = functions.config().config;

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  storageBucket: config.storage_bucket,
});

const storage = admin.storage();
const fetchUrl = config.fetch_url;

export const getGitHubGraph = functions
  .region('asia-northeast1')
  .pubsub.schedule('0 */12 * * *') // 12時間おきに実行
  .timeZone('Asia/Tokyo')
  .onRun(async () => {
    try {
      // axios でダウンロード
      const imgRes = await axisos(fetchUrl, {
        responseType: 'arraybuffer',
      });

      // Cloud Storage に書き込む
      const blob = storage.bucket().file('github_graph.svg');
      const blobStream = blob.createWriteStream({
        resumable: false,
        metadata: { 'Content-Type': imgRes.headers['content-type'] },
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
  });

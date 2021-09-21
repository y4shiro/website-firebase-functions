# website-firebase-functions

## これは何?

[個人のポートフォリオページ](https://y4shiro.net) / ([GitHub リポジトリ](https://github.com/y4shiro/website)) で表示する GitHub の Contribution グラフを Firebase Cloud Storage に保存するもの。

## 開発環境

### 実行環境など

- Node.js v14 系
- TypeScript v4 系

### プラグインやパッケージ

- firebase v9.0.2
- firebase-functions v9.11.1
- firebase-admin v3.14.1
- axios v0.21.4

## 必要なもの

### Firebase Admin SDK の秘密鍵

ローカルのエミュレータでは環境変数で読み込む必要あり  
本番はデフォで読み込まれている

### 環境変数

- Fetch 先の URL
- Storage Bucket のアドレス

ローカル、本番共にそれぞれ読み込む

```
{
  "config": {
    "fetch_url": <URL>,
    "storage_bucket": <STORAGE_BUCKET>,
  }
}
```

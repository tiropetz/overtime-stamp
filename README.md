## 概要

MFクラウドで今月分の残業申請を一括申請するスクリプト。
休日かつ残業未申請の日だけ、指定した残業時間、コメントで一括申請される。

## 環境構築

1. node moduleのインストール

```sh
yarn
```

2. **ルート直下** に以下の内容で `env.js` を追加

```js
export const COMPANY_ID = "YOUR_COMPANY_ID"; 
export const EMAIL = "YOUR_ACCOUNT_EMAIL";
export const PASSWORD = "YOUR_ACCOUNT_PASSWORD";
export const OVERTIME = "01:00"; // 残業時間 HH:mm
export const COMMENT = "YOUR_COMMENT"; // 申請コメント
```

## 使い方

```sh
yarn stamp
```

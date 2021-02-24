## 概要

MFクラウドで残業申請を一括申請するスクリプト。
休日かつ残業未申請の日だけ、指定した残業時間、コメントで一括申請される。

## 注意

- 一括打刻されるのは、**今月分のみ** になります。
- 打刻には1分程度かかります。

## 環境構築

1. node moduleのインストール

```sh
yarn
```

2. `env.js` に必要な情報を入力

```js
// MFクラウド ログイン用
export const COMPANY_ID = "bita";
export const EMAIL = "YOUR_MF_CLOUD_EMAIL";
export const PASSWORD = "YOUR_MF_CLOUD_PASS";

// 打刻用
export const OVERTIME = "01:00"; // 残業時間 HH:mm
export const COMMENT = "案件対応のため"; // 申請コメント

```

## 使い方

```sh
yarn stamp
```

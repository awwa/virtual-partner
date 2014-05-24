virtual-partner
===============

# 実行環境の準備
## PaaS的な環境を使う場合 
適当にデプロイして環境変数に以下の値を設定する。 
```bash
SENDGRID_USERNAME=SendGridアカウント
SENDGRID_PASSWORD=SendGridパスワード
FROM=仮想彼女のメールアドレス
FROM_NAME=仮想彼女の名前
```

## ローカル環境を使う場合 
```bash
cp .env.example .env
vi .env
```

.envファイルの編集
```bash
SENDGRID_USERNAME=SendGridアカウント
SENDGRID_PASSWORD=SendGridパスワード
FROM=仮想彼女のメールアドレス
FROM_NAME=仮想彼女の名前
```
# SendGridのアカウントを取得してParse Webhookの設定を行う。
# メールを送る


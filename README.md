## 概要

このプロジェクトは、Next.js と Firebase を使用した TODO アプリケーションです。  
ユーザーは、タスクの追加、編集、削除し、進捗状況を管理することができます。

## 技術スタック

- Next.js 14.2.5
- React 18
- TypeScript
- Tailwind CSS 3.4.1
- Firebase

## 主要ライブラリ

- @hookform/resolvers 3.9.0
- @types/react-icons 3.0.0
- shadcn/ui
- firebase 10.12.4
- next-auth 4.24.7
- react-datepicker 7.3.0
- react-hook-form 7.52.1
- zod 3.23.8

## 実装機能

- タスクの追加、編集、削除（データベース保存）
- タスクの進捗状況の管理
- タスクの期限設定（カレンダー選択）
- ユーザー認証（指定ID/PW、GitHub、Google）

## コメント

Todo アプリは、いろいろありますが、自分なりに機能面でこういう機能があったら、より管理しやすく、見やすいと思い、実装しました。  
認証では NextAuth を使い、Todo 自体は、Firebase とデータベース連動しています。

## 著者

[SakuTech blog](https://github.com/n-sakuma39/)# next-todo-firebase-app

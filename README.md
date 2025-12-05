# Ur-Vibe ⚡🔮

\<div align="center"\>
\<img src="[https://placehold.co/1200x400/1a1a2e/bc13fe?text=Ur-Vibe+Game+Preview](https://www.google.com/search?q=https://placehold.co/1200x400/1a1a2e/bc13fe%3Ftext%3DUr-Vibe%2BGame%2BPreview)" alt="Ur-Vibe Banner" width="100%" /\>
\</div\>

\<br /\>

**「あいつ、本当はそんなこと考えてたの？」**

**Ur-Vibe（ユア・バイブ）** は、友達の「意外な一面」をベットして遊ぶ、新感覚の**匿名価値観バトルゲーム**です。
Google Gemini AIを搭載し、その場のノリに合わせた「究極の2択」や「際どい質問」をリアルタイムで生成。飲み会、サークル、合宿など、仲間との距離を縮めたい（あるいは本性を暴きたい）夜に最適です。

-----

## 📱 どんなアプリ？

スマートフォンを持ち寄って遊ぶ、ローカルマルチプレイヤーWebアプリです。

  * **ターゲット:** 大学生、サークル仲間、親しい友人
  * **コンセプト:** 「KNOW YOUR FRIENDS（友達を知る）」
  * **特徴:** Y2K/サイバーパンク風のネオンデザイン & AIによる無限のクイズ生成

-----

## 🎮 ゲームモード

### 1\. Majority Bet（多数派予想）⚖️

**みんなの価値観、読み切れるか？**
AIが生成する「究極の2択」に対して、プレイヤー全員が投票します。

  * **ルール:** 「どっちの回答が多数派になるか？」を予想して手持ちのコインをベット！
  * **例題:** 「愛か、金か？」「浮気は許すか、即別れるか？」
  * 予想が当たればコイン獲得。友達の倫理観や好みをどれだけ理解しているかが試されます。

### 2\. Anonymous（匿名暴露）👻

**その秘密、誰の回答？**
普段は聞けないような質問に対し、匿名で正直に回答するモードです。

  * **ルール:** 全員の匿名回答が画面に表示されます。「このヤバい回答を書いたのは誰だ！？」と議論し、最後に正体を明かします。
  * **例題:** 「今までで一番の黒歴史は？」「墓場まで持っていく秘密は？」
  * 深夜のテンションで盛り上がること間違いなしの、リスキーな心理戦です。

### 3\. AI Generator（AI生成機能）✨

**ネタ切れの心配なし。**

  * 「恋愛」「バイト」「サークル」「就活」など、キーワードを入力するだけで、Gemini APIがその場にぴったりのクイズを即座に生成します。
  * 飽きることなく、無限に遊び続けられます。

-----

## 🛠️ 技術スタック

  * **Frontend:** React (v19), TypeScript, Vite
  * **Styling:** Tailwind CSS (Neon/Glassmorphism Design)
  * **AI:** Google Gemini API (`gemini-2.5-flash`)
  * **Icons:** Lucide React

-----

## 🚀 始め方 (Getting Started)

### 前提条件

  * Node.js がインストールされていること
  * Google Gemini API キーを取得していること

### インストール手順

1.  **リポジトリをクローン**

    ```bash
    git clone https://github.com/your-repo/ur-vibe.git
    cd ur-vibe
    ```

2.  **依存関係のインストール**

    ```bash
    npm install
    ```

3.  **環境変数の設定**
    ルートディレクトリに `.env.local` ファイルを作成し、APIキーを設定します。

    ```env
    GEMINI_API_KEY=your_google_gemini_api_key
    ```

4.  **アプリの起動**
    ローカルサーバーを立ち上げます。

    ```bash
    npm run dev
    ```

    表示されたURL（例: `http://localhost:3000`）にアクセスしてゲーム開始！

-----

## 📸 開発者向けメモ

  * **デザイン:** `tailwind.config.js` でネオンカラー（`neon-pink`, `neon-cyan` 等）やグリッチアニメーションを独自定義しています。
  * **プロンプト:** `services/geminiService.ts` 内で、AIへの命令（JSON形式での出力強制など）を管理しています。

-----

*Let's check your vibe.*

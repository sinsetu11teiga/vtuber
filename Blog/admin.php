<!DOCTYPE html>
<html>
<head>
    <title>ブログ投稿ページ</title>
    <link rel="stylesheet" href="blog.css">
</head>
<body>
    <h1>ブログ投稿</h1>

    <?php
    // フォームが送信されたときに実行
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // 入力値の取得
        $title = $_POST['title'];
        $content = $_POST['content'];

        // データベースへの接続設定
        $host = 'mysql213.phy.lolipop.lan';
        $dbname = 'LAA1454536-teiga01';
        $username = 'LAA1454536';
        $password = 'dqg7LGebqa4EKPH';

        // データベースへの接続
        try {
            $db = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
            $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $e) {
            echo 'データベースに接続できませんでした。エラー: ' . $e->getMessage();
            exit;
        }

        // 投稿の保存
        try {
            $stmt = $db->prepare("INSERT INTO blog (title, content) VALUES (:title, :content)");
            $stmt->bindParam(':title', $title);
            $stmt->bindParam(':content', $content);
            $stmt->execute();

            echo '投稿が保存されました。';
        } catch(PDOException $e) {
            echo '投稿を保存できませんでした。エラー: ' . $e->getMessage();
        }
    }
    ?>

    <form method="POST" action="">
        <label for="title">タイトル:</label><br>
        <input type="text" name="title" id="title" required><br>

        <label for="content">内容:</label><br>
        <textarea name="content" id="content" rows="5" required></textarea><br>

        <input type="submit" value="投稿">
    </form>
</body>
</html>
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ブログ</title>
</head>
<body>
    <?php
// データベース接続
$pdo = new PDO('mysql:host=mysql213.phy.lolipop.lan;dbname=	LAA1454536-teiga01;charset=utf8mb4', 'LAA1454536', 'dqg7LGebqa4EKPH');

// ブログ記事のIDを取得
$id = $_GET['id'];

// ブログ記事の情報を取得
$stmt = $pdo->prepare('SELECT title, content, created_at FROM blog_posts WHERE id = :id');
$stmt->bindParam(':id', $id, PDO::PARAM_INT);
$stmt->execute();
$post = $stmt->fetch();

// ブログ記事の内容を表示
if ($post) {
    $title = htmlspecialchars($post['title'], ENT_QUOTES, 'UTF-8');
    $content = nl2br(htmlspecialchars($post['content'], ENT_QUOTES, 'UTF-8'));
    $created_at = date('Y/m/d H:i', strtotime($post['created_at']));
    
    echo '<h2>' . $title . '</h2>';
    echo '<p>投稿日: ' . $created_at . '</p>';
    echo '<div>' . $content . '</div>';
} else {
    echo '指定された記事は存在しません。';
}
?>
</body>
</html>
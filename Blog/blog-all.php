<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ブログ一覧-新雪帝我ブログ</title>
</head>
<body>
     <?php
     // データベース接続
$pdo = new PDO('mysql:host=mysql213.phy.lolipop.lan;dbname=LAA1454536-teiga01;charset=utf8mb4', 'LAA1454536', 'dqg7LGebqa4EKPH');

// ブログ記事の情報を取得
$stmt = $pdo->query('SELECT id, title, created_at FROM blog_posts ORDER BY created_at DESC');
$blog_posts = $stmt->fetchAll();

// ブログ記事一覧を表示
foreach ($blog_posts as $post) {
    $id = $post['id'];
    $title = htmlspecialchars($post['title'], ENT_QUOTES, 'UTF-8');
    $created_at = date('Y/m/d H:i', strtotime($post['created_at']));
    
    echo '<h2><a href="blog.php?id=' . $id . '">' . $title . '</a></h2>';
    echo '<p>投稿日: ' . $created_at . '</p>';
}
     ?>
</body>
</html>
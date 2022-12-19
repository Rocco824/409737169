<?php
session_start();
include("pdoInc.php");
 
if(isset($_SESSION['account']) && $_SvvvvESSION['account'] != null){ // 如果登入過，則直接轉到登入後頁面
    echo '<meta http-equiv=REFRESH CONTENT=0;url=php_sess_index.php>';
}
else if(isset($_POST['account']) && isset($_POST['password'])){
    $acc = preg_replace("/[^A-Za-z0-9]/", "", $_POST['account']);
    $pwd = preg_replace("/[^A-Za-z0-9]/", "", $_POST['password']);
    if($acc != NULL && $pwd != NULL){
        $sth = $dbh->prepare('SELECT * FROM user where account = ?');
        $sth->execute(array($acc));
        $row = $sth->fetch(PDO::FETCH_ASSOC);
        // 比對密碼
        if($row['pwd'] == md5($pwd)){
            $_SESSION['account'] = $row['account'];
            $_SESSION['nickname'] = $row['nickname'];
            $_SESSION['is_admin'] = $row['is_admin'];
            echo '<meta http-equiv=REFRESH CONTENT=0;url=php_sess_index.php>';
        }
    }
}
?>
 
<html><head></head>
<body bgcolor="#ccccff">
 
<form action="php_sess_login.php" method="post">
    帳號：<input type="text" name="account"><br>
    密碼：<input type="text" name="password"><br>
    <input type="submit">
</form>
 
</body></html>
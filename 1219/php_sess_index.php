<?php
session_start();
include("pdoInc.php");
 
if(!isset($_SESSION['account'])){
    die ('<meta http-equiv=REFRESH CONTENT=0;url=php_sess_login.php>');
}
?>
 
<html><head></head>
<body bgcolor="#ccccff">
 
<?php
echo "Hi, ".$_SESSION['account']." (".htmlspecialchars($_SESSION['nickname']).")";
?>
 
<table border="1">
    <tr>
        <th>資料序號</th>
        <th>當日排名</th>
        <th>前日排名</th>
        <th>歌曲名稱</th>
        <th>演 唱 者</th>
    </tr>
    <?php
        $sql = "SELECT * from songrank";
        $sth = $dbh->query($sql);
        while($row = $sth->fetch(PDO::FETCH_ASSOC)){
            echo "<tr><td>".$row['id']."</td>";
            echo "<td>".$row['this_rank']."</td>";
            echo "<td>".$row['prev_rank']."</td>";
            echo "<td>".$row['song_name']."</td>";
            echo "<td>".$row['singer_name']."</td><tr>";
        }
    ?>
</table>
 
<a href="php_sess_logout.php">登出</a>
 
</body></html>
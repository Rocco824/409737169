<html><head></head>
<body bgcolor="#ccccff">
 
<?php
if( isset($_POST['a']) && isset($_POST['b']) ){
    echo (int)$_POST['a'] * (int)$_POST['b'];
}
?>
 
<form action="we1.php" method="post">
    <input type="text" name="a"> *
    <input type="text" name="b">
    <input type="submit" value='查看結果'>
</form>
 
</body></html>
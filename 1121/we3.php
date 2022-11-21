<html><head></head>
<body bgcolor="#ccccff">

<?php
if( isset($_POST['a'])){

$a = (float)$_POST['a'];
for ($i = 1; $i <=$a; $i++){
    echo $i;
}
}
?>

<form action="we3.php" method="post">
    <input type="text" name="a">
    <input type="submit">

</form>

</body></html>
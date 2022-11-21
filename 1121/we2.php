<html><head></head>
<body bgcolor="#ccccff">


<?php
if( isset($_POST['a']) && isset($_POST['b']) ){
$a = (float)$_POST['a'];
$b = (float)$_POST['b'];
$c = (float)$_POST['c'];;
$d = ($b * $b) - (4 * $a * $c);




if($d > 0){
    $ans_plus = (-1 * $b + sqrt($d)) / (2 * $a);
    $ans_minus = (-1 * $b - sqrt($d)) / (2 * $a);
    echo "方程式有兩相異實數解：" . $ans_plus . " 和 " . $ans_minus;
}
else if ($d == 0){
    $ans = (-1 * $b) / (2 * $a);
    echo "方程式有重根：" . $ans;
}
else {
    echo "方程式有兩相異虛根";
}
}
?>

<form action="we2.php" method="post">
    <input type="text" name="a">
    <input type="text" name="b">
    <input type="text" name="c">
    <input type="submit">
</form>

</body></html>
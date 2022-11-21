<html><head><style>body, select{font-size:50px}</style></head>
<body bgcolor="#ccccff">
  
<?php
 
$grade = array(
    'Apple' => 82,
    'Banana' => 79,
    'Cherry' => 88,
    'Durian' => 93,
);
  
if( isset($_POST['stuName'])){
    if(array_key_exists($_POST['stuName'], $grade)){
        echo '成績是：'. $grade[$_POST['stuName']] . ' 分';
    }
    else {
        echo '錯誤：學生姓名不存在';
    }
}
?>
  
<form action="we5.php" method="post">
    <input type="hidden" value="Apple" name="stuName">
    <input type="submit" value="按我查看成績">
</form>
  
</body></html>
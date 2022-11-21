<html><head></head>
<body bgcolor="#ccccff">

<?php

if( isset($_POST['a']) && isset($_POST['b']) ){
    echo (int)$_POST['a'] * (int)$_POST['b'];
}
if(isset($_POST['op'])){
	echo $_POST['op'];
}

?>

<form action="we4.php" method="post">
    <input type="text" name="a">
    <select name='op'>
    	<option>+</option>
    	<option>-</option>
    	<option>*</option>
    	<option>/</option>
	</select>
	<input type='text' name=b>
	<input type='submit'>

 </form>
</body></html>
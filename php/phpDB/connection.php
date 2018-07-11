<?php
	// open connection
	function openConn(){
		$servername = "localhost";
		$username = "root";
		$password = "";
		$db = "perfumetyr";
		$conn = mysqli_connect($servername, $username, $password, $db);
		mysqli_query($conn,'SET CHARACTER SET utf8');
	    if (!$conn) {
	        die('Could not connect: ' . mysql_error());
	    } 
		return $conn;
	}
	// close connection
	function closeConn(){
		$closConnection = mysqli_close(openConn());
		return $closConnection;
	}
?>
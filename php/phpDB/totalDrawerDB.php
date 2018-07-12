<?php
function checkNewDate(){
	$newDate=$_GET['newDate'];
	$jsonData='';
	$dd='';
	$getDateDrawerQuery="SELECT id FROM drawer WHERE dateD='".$newDate."' and type='total' ORDER BY dateD DESC";
	$getDateDrawerQuerySQL=mysqli_query(openConn(),$getDateDrawerQuery);
	if($getDateDrawerQuerySQL){
		while($row = mysqli_fetch_assoc($getDateDrawerQuerySQL)){	
			if($row != NULL){
				$dd=$row['id'];
			}
		}
	}
	if($dd){
	// file_put_contents("WWWWttttxxx.txt",$dd);
		$jsonData='[{"newDate":true}]';
	} else if(!$dd){
	// file_put_contents("WWWWxxx.txt",$dd);
		$jsonData='[{"newDate":false}]';
	}
	// file_put_contents("WWWW.txt",$jsonData);
	echo $jsonData;
}
function addTotalDrawer(){
	$newDate=$_GET['newDate'];
	$jsonData='';
	$totalDrawer=0.0;
	$getTotalDrawerQuery="SELECT amount,reason,dateD FROM drawer WHERE dateD!='".$newDate."' and type='total' GROUP by dateD order by dateD DESC LIMIT 1";
	$getTotalDrawerQuerySQL=mysqli_query(openConn(),$getTotalDrawerQuery);
	if($getTotalDrawerQuerySQL){
		while($row = mysqli_fetch_assoc($getTotalDrawerQuerySQL)){	
			if($row != NULL){
				$totalDrawer=ROUND($row['amount'],5);
				$reason=$row['reason'];
			}
		}
	}
	// file_put_contents("WWWW.txt",$reason);
	if($reason=='false'){
		$addTotalDrawerQuery="INSERT INTO drawer (dateD,amount,type,reason) VALUES('".$newDate."','".$totalDrawer."','total','false')";
		$addTotalDrawerQuerySQL = mysqli_query(openConn(),$addTotalDrawerQuery);
		$getTotalDrawerQuery="SELECT id FROM drawer ORDER BY id DESC LIMIT 1";
		$getTotalDrawerQuerySQL=mysqli_query(openConn(),$getTotalDrawerQuery);
		if($getTotalDrawerQuerySQL){
			while($row = mysqli_fetch_assoc($getTotalDrawerQuerySQL)){	
				if($row != NULL){
					$jsonData=$row['id'];
				}
			}
		}
	} else if($reason=='true'){
		$addTotalDrawerQuery="INSERT INTO drawer (dateD,amount,type,reason) VALUES('".$newDate."','0','total','false')";
		$addTotalDrawerQuerySQL = mysqli_query(openConn(),$addTotalDrawerQuery);
		$getTotalDrawerQuery="SELECT id FROM drawer ORDER BY id DESC LIMIT 1";
		$getTotalDrawerQuerySQL=mysqli_query(openConn(),$getTotalDrawerQuery);
		if($getTotalDrawerQuerySQL){
			while($row = mysqli_fetch_assoc($getTotalDrawerQuerySQL)){	
				if($row != NULL){
					$jsonData=$row['id'];
				}
			}
		}
	}
	echo $jsonData;
}
?>
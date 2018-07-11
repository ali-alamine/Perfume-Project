<?php
function getAllEssence(){
	$getAllEssenceQuery="select item.IID as id, item.item_name as name from item inner join component on item.IID = component.IID where component.com_type ='ess' ";
	$getAllEssenceQuerySQL=mysqli_query(openConn(),$getAllEssenceQuery);
	$jsonData = "";
	if($getAllEssenceQuerySQL){
		while($row = mysqli_fetch_assoc($getAllEssenceQuerySQL)){	
			if($row != NULL){
				if($jsonData != ""){
					$jsonData = $jsonData . ",";
				}
				$jsonData = $jsonData . '{"id":"' . $row['id'] . '",';
				$jsonData = $jsonData . '"essenceName":"' . $row['name'] . '"}';				
			}
		}
		$jsonData = '[' . $jsonData . ']';
	}
	echo $jsonData;
}

function getAllBottle(){
	$getAllEssenceQuery="select item.IID as id, item.item_name as name, component.com_capacity as cap from item inner join component on item.IID = component.IID where component.com_type ='bot' ";
	$getAllEssenceQuerySQL=mysqli_query(openConn(),$getAllEssenceQuery);
	$jsonData = "";
	if($getAllEssenceQuerySQL){
		while($row = mysqli_fetch_assoc($getAllEssenceQuerySQL)){	
			if($row != NULL){
				if($jsonData != ""){
					$jsonData = $jsonData . ",";
				}
				$jsonData = $jsonData . '{"id":"' . $row['id'] . '",';
				$jsonData = $jsonData . '"botCapacity":"' . $row['cap'] . '",';
				$jsonData = $jsonData . '"botName":"' . $row['name'] . '"}';				
			}
		}
		$jsonData = '[' . $jsonData . ']';
	}
	echo $jsonData;
}

function getAllAcc(){
	$getAllAccQuery="select item.IID as id, item.item_name as name from item inner join component on item.IID = component.IID where component.com_type ='acc' ";
	$getAllAccQuerySQL=mysqli_query(openConn(),$getAllAccQuery);
	$jsonData = "";
	if($getAllAccQuerySQL){
		while($row = mysqli_fetch_assoc($getAllAccQuerySQL)){	
			if($row != NULL){
				if($jsonData != ""){
					$jsonData = $jsonData . ",";
				}
				$jsonData = $jsonData . '{"id":"' . $row['id'] . '",';
				$jsonData = $jsonData . '"accName":"' . $row['name'] . '"}';				
			}
		}
		$jsonData = '[' . $jsonData . ']';
	}
	echo $jsonData;
}

function damageEssence(){
	$essenceId = $_GET['essenceId'];
	$essenceQuantity=$_GET['essenceQuantity'];
	$updateEssenceQuery="UPDATE component SET com_quan = com_quan - '".($essenceQuantity/1000)."' WHERE IID='".$essenceId."'";
	$updateEssenceQuerySQL=mysqli_query(openConn(),$updateEssenceQuery);
	echo "{}";
}

function damageAlcohol(){
	$alcoholQuantity=$_GET['alcoholQuantity'];
	$updateEssenceQuery="UPDATE component SET com_quan = com_quan - '".($alcoholQuantity/1000)."' WHERE com_type='alc'";
	$updateEssenceQuerySQL=mysqli_query(openConn(),$updateEssenceQuery);
	echo "{}";
}
function damageBottle(){
	$bottleId = $_GET['bottleId'];
	$bottleQuantity=$_GET['bottleQuantity'];
	$updateBottleQuery="UPDATE component SET com_quan = com_quan - ".$bottleQuantity." WHERE IID=".$bottleId;
	$updateBottleQuerySQL=mysqli_query(openConn(),$updateBottleQuery);
	echo "{}";
}
function damageItem(){
	$itemId = $_GET['itemId'];
	$itemQuantity=$_GET['itemQuantity'];
	$updateItemQuery="UPDATE component SET com_quan = com_quan - ".$itemQuantity." WHERE IID=".$itemId;
	$updateItemQuerySQL=mysqli_query(openConn(),$updateItemQuery);
	file_put_contents('accDama.txt', $updateItemQuery);
	echo "{}";
}
?>
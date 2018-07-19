<?php
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
function searchEssence(){
	$essenceName=$_GET['essenceName'];
	$searchEssenceQuery=" select item.IID as id, item.item_name as name,component.com_quan as quan from item inner join component on item.IID = component.IID where component.com_type ='ess' AND item_name like '".$essenceName."%'";

	$searchEssenceQuerySQL=mysqli_query(openConn(),$searchEssenceQuery);
	$jsonData = "";
	if($searchEssenceQuerySQL){
		while($row = mysqli_fetch_assoc($searchEssenceQuerySQL)){	
			if($row != NULL){
				if($jsonData != ""){
					$jsonData = $jsonData . ",";
				}
				$jsonData = $jsonData . '{"id":"' . $row['id'] . '",';
				$jsonData = $jsonData . '"quantity":"' . $row['quan'] . '",';			
				$jsonData = $jsonData . '"essenceName":"' . $row['name'] . '"}';			
			}
		}
		$jsonData = '[' . $jsonData . ']';
	}
	// file_put_contents("jsonData.txt", $jsonData);
	echo $jsonData;
}
function searchBottle(){
	$bottleKeywordSearch=$_GET['bottleKeywordSearch'];

	$searchBottleQuery="select item.IID as id, item.item_name as name,component.com_quan as quan, component.com_capacity as cap from item inner join component on item.IID = component.IID where (component.com_type ='bot' AND item_name like '".$bottleKeywordSearch."%') OR (component.com_type ='bot' AND com_capacity like '".$bottleKeywordSearch."%')  ";

	$searchBottleQuerySQL=mysqli_query(openConn(),$searchBottleQuery);
	$jsonData = "";
	if($searchBottleQuerySQL){
		while($row = mysqli_fetch_assoc($searchBottleQuerySQL)){	
			if($row != NULL){
				if($jsonData != ""){
					$jsonData = $jsonData . ",";
				}
				$jsonData = $jsonData . '{"id":"' . $row['id'] . '",';
				$jsonData = $jsonData . '"quantity":"' . $row['quan'] . '",';			
				$jsonData = $jsonData . '"botCapacity":"' . $row['cap'] . '",';
				$jsonData = $jsonData . '"botName":"' . $row['name'] . '"}';		
			}
		}
		$jsonData = '[' . $jsonData . ']';
	}
	echo $jsonData;
}
function searchAccessory(){	
	$accessoryName=$_GET['accessoryName'];
	$searchAccessoryQuery="select item.IID as id, item.item_name as name,component.com_quan as quan from item inner join component on item.IID = component.IID where component.com_type ='acc' AND item_name like '".$accessoryName."%' ";

	$searchAccessoryQuerySQL=mysqli_query(openConn(),$searchAccessoryQuery);
	$jsonData = "";
	if($searchAccessoryQuerySQL){
		while($row = mysqli_fetch_assoc($searchAccessoryQuerySQL)){	
			if($row != NULL){
				if($jsonData != ""){
					$jsonData = $jsonData . ",";
				}
				$jsonData = $jsonData . '{"id":"' . $row['id'] . '",';
				$jsonData = $jsonData . '"quantity":"' . $row['quan'] . '",';			
				$jsonData = $jsonData . '"accName":"' . $row['name'] . '"}';				
			}
		}
		$jsonData = '[' . $jsonData . ']';
	}
	echo $jsonData;
}
function getQuantityAlcohol(){
	// $essenceName=$_GET['essenceName'];
	$getQuantityAlcoholQuery=" select item.IID as id,component.com_quan as quan from item inner join component on item.IID = component.IID where component.com_type ='alc'";

	$getQuantityAlcoholQuerySQL=mysqli_query(openConn(),$getQuantityAlcoholQuery);
	$jsonData = "";
	if($getQuantityAlcoholQuerySQL){
		while($row = mysqli_fetch_assoc($getQuantityAlcoholQuerySQL)){	
			if($row != NULL){
				if($jsonData != ""){
					$jsonData = $jsonData . ",";
				}
				$jsonData = $jsonData . '{"quantity":"' . $row['quan'] . '"}';			
			}
		}
		$jsonData = '[' . $jsonData . ']';
	}
	// file_put_contents("jsonData.txt", $jsonData);
	echo $jsonData;
}
?>
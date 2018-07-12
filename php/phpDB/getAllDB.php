<?php
function getAllEssence(){
	$getAllEssenceQuery="SELECT item.IID as IID,item_name,item_cost,item_selling,com_quan FROM item inner join component on item.IID = component.IID where component.com_type='ess'";
	$getAllEssenceQuerySQL=mysqli_query(openConn(),$getAllEssenceQuery);
	$jsonData = "";
	if($getAllEssenceQuerySQL){
		while($row = mysqli_fetch_assoc($getAllEssenceQuerySQL)){	
			if($row != NULL){
				if($jsonData != ""){
					$jsonData = $jsonData . ",";
				}
				$jsonData = $jsonData . '{"id":"' . $row['IID'] . '",';
				$jsonData = $jsonData . '"name":"' . $row['item_name'] . '",';
				$jsonData = $jsonData . '"quantity":"' . $row['com_quan'] . '",';
				$jsonData = $jsonData . '"cost":"' . $row['item_cost'] . '",';			
				$jsonData = $jsonData . '"selling":"' . $row['item_selling'] . '"}';			
			}
		}
		$jsonData = '[' . $jsonData . ']';
	}
	echo $jsonData;
}
function getAlcohol(){
	$getAllEssenceQuery="SELECT item.IID as IID,item_name,item_cost,item_selling,com_quan FROM item inner join component on item.IID = component.IID where component.com_type='alc'";
	$getAllEssenceQuerySQL=mysqli_query(openConn(),$getAllEssenceQuery);
	$jsonData = "";
	if($getAllEssenceQuerySQL){
		while($row = mysqli_fetch_assoc($getAllEssenceQuerySQL)){	
			if($row != NULL){
				if($jsonData != ""){
					$jsonData = $jsonData . ",";
				}
				$jsonData = $jsonData . '{"id":"' . $row['IID'] . '",';
				$jsonData = $jsonData . '"name":"' . $row['item_name'] . '",';
				$jsonData = $jsonData . '"quantity":"' . $row['com_quan'] . '",';
				$jsonData = $jsonData . '"cost":"' . $row['item_cost'] . '",';			
				$jsonData = $jsonData . '"selling":"' . $row['item_selling'] . '"}';			
			}
		}
		$jsonData = '[' . $jsonData . ']';
	}
	// file_put_contents("text5.txt", $jsonData);
	echo $jsonData;
}
function getAllBottle(){
	$getAllBottleQuery="SELECT item.IID as IID,item_name,item_cost,item_selling,com_capacity,com_quan FROM item inner join component on item.IID = component.IID where component.com_type ='bot'";
	$getAllBottleQuerySQL=mysqli_query(openConn(),$getAllBottleQuery);
	$jsonData = "";
	if($getAllBottleQuerySQL){
		while($row = mysqli_fetch_assoc($getAllBottleQuerySQL)){	
			if($row != NULL){
				if($jsonData != ""){
					$jsonData = $jsonData . ",";
				}
				$jsonData = $jsonData . '{"id":"' . $row['IID'] . '",';
				$jsonData = $jsonData . '"name":"' . $row['item_name'] . '",';
				$jsonData = $jsonData . '"quantity":"' . $row['com_quan'] . '",';
				$jsonData = $jsonData . '"cost":"' . $row['item_cost'] . '",';			
				$jsonData = $jsonData . '"selling":"' . $row['item_selling'] . '",';		
				$jsonData = $jsonData . '"capacity":"' . $row['com_capacity'] . '"}';		
			}
		}
		$jsonData = '[' . $jsonData . ']';
	}
	echo $jsonData;
}
function getAllAccessories(){
	$getAllItemQuery="SELECT item.IID as IID,item_name,item_cost,item_selling,com_quan,com_date_exp FROM item inner join component on item.IID = component.IID where component.com_type ='acc'";
	$getAllItemQuerySQL=mysqli_query(openConn(),$getAllItemQuery);
	$jsonData = "";
	if($getAllItemQuerySQL){
		while($row = mysqli_fetch_assoc($getAllItemQuerySQL)){	
			if($row != NULL){
				if($jsonData != ""){
					$jsonData = $jsonData . ",";
				}
				$jsonData = $jsonData . '{"id":"' . $row['IID'] . '",';
				$jsonData = $jsonData . '"name":"' . $row['item_name'] . '",';			
				$jsonData = $jsonData . '"quantity":"' . $row['com_quan'] . '",';
				$jsonData = $jsonData . '"cost":"' . $row['item_cost'] . '",';			
				$jsonData = $jsonData . '"selling":"' . $row['item_selling'] . '"}';
			}
		}
		$jsonData = '[' . $jsonData . ']';
	}
	echo $jsonData;
}
function getAllClient(){
	$getAllSupplierQuery="SELECT CID,client_fullName,client_phone FROM client";
	$getAllSupplierQuerySQL=mysqli_query(openConn(),$getAllSupplierQuery);
	$jsonData = "";
	if($getAllSupplierQuerySQL){
		while($row = mysqli_fetch_assoc($getAllSupplierQuerySQL)){	
			if($row != NULL){
				if($jsonData != ""){
					$jsonData = $jsonData . ",";
				}
				$jsonData = $jsonData . '{"id":"' . $row['CID'] . '",';
				$jsonData = $jsonData . '"name":"' . $row['client_fullName'] . '",';			
				$jsonData = $jsonData . '"phone":"' . $row['client_phone'] . '"}';			
			}
		}
		$jsonData = '[' . $jsonData . ']';
	}
	echo $jsonData;	
}
function getAllSupplier(){
	$getAllSupplierQuery="SELECT SRID,supplier_name,supplier_phone FROM supplier";
	$getAllSupplierQuerySQL=mysqli_query(openConn(),$getAllSupplierQuery);
	$jsonData = "";
	if($getAllSupplierQuerySQL){
		while($row = mysqli_fetch_assoc($getAllSupplierQuerySQL)){	
			if($row != NULL){
				if($jsonData != ""){
					$jsonData = $jsonData . ",";
				}
				$jsonData = $jsonData . '{"id":"' . $row['SRID'] . '",';
				$jsonData = $jsonData . '"name":"' . $row['supplier_name'] . '",';			
				$jsonData = $jsonData . '"phone":"' . $row['supplier_phone'] . '"}';			
			}
		}
		$jsonData = '[' . $jsonData . ']';
	}
	echo $jsonData;	
}
function getAllPerfume(){
	$getAllDefinitionPerfumeQuery="SELECT IID,item_name FROM item INNER JOIN definition_perfume on item.IID=definition_perfume.item_IID ";
	$getAllDefinitionPerfumeQuerySQL=mysqli_query(openConn(),$getAllDefinitionPerfumeQuery);
	$jsonData = "";
	if($getAllDefinitionPerfumeQuerySQL){
		while($row = mysqli_fetch_assoc($getAllDefinitionPerfumeQuerySQL)){	
			if($row != NULL){
				if($jsonData != ""){
					$jsonData = $jsonData . ",";
				}
				$jsonData = $jsonData . '{"id":"' . $row['IID'] . '",';
				$jsonData = $jsonData . '"name":"' . $row['item_name'] . '"}';			
			}
		}
		$jsonData = '[' . $jsonData . ']';
	}
	echo $jsonData;
}

?>
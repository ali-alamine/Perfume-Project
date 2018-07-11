<?php
function addEssence(){
	$essence = $_GET['essence'];
	$addEssenceQuery="INSERT INTO item (item_name,item_cost,item_selling) VALUES('".$essence."','0','0')";
	$addEssenceQuerySQL = mysqli_query(openConn(),$addEssenceQuery);
	$getIdEssenceQuery="SELECT IID FROM item ORDER BY IID DESC LIMIT 1";
	$getIdEssenceQuerySQL=mysqli_query(openConn(),$getIdEssenceQuery);
	if($getIdEssenceQuerySQL){
		while($row = mysqli_fetch_assoc($getIdEssenceQuerySQL)){	
			if($row != NULL){
				$idEssence=$row['IID'];
			}
		}
	}
	$addComponentQuery="INSERT INTO component (IID,com_type,com_quan) VALUES ('".$idEssence."','ess','0')";
	$addComponentQuerySQL = mysqli_query(openConn(),$addComponentQuery);
	// $idBottle =  mysqli_LAST_INSERT_ID(openConn());//($addBottleTypeQuerySQL);

	echo "{}";
}
function addBottleType(){
	$bottleType = $_GET['bottleType'];	
	$bottleCapacity = $_GET['bottleCapacity'];	
	// $zero=0;
	$addBottleTypeQuery="INSERT INTO item (item_name,item_cost,item_selling) VALUES('".$bottleType."','0','0')";
	$addBottleTypeQuerySQL = mysqli_query(openConn(),$addBottleTypeQuery);
	$getIdBottleQuery="SELECT IID FROM item ORDER BY IID DESC LIMIT 1";
	$getIdBottleQuerySQL=mysqli_query(openConn(),$getIdBottleQuery);
	if($getIdBottleQuerySQL){
		while($row = mysqli_fetch_assoc($getIdBottleQuerySQL)){	
			if($row != NULL){
				$idBottle=$row['IID'];
			}
		}
	}
	$addComponentQuery="INSERT INTO component (IID,com_type,com_quan,com_capacity) VALUES ('".$idBottle."','bot','0','".$bottleCapacity."')";
    // file_put_contents("www.txt",$addBottleCapacityQuery);
	$addComponentQuerySQL = mysqli_query(openConn(),$addComponentQuery);
	// $idBottle =  mysqli_LAST_INSERT_ID(openConn());//($addBottleTypeQuerySQL);

	echo "{}";
}
function addAccessories(){
	$accessories = $_GET['accessories'];	
	$addAccessoriesQuery="INSERT INTO item (item_name,item_cost,item_selling) VALUES('".$accessories."','0','0')";
	$addAccessoriesQuerySQL = mysqli_query(openConn(),$addAccessoriesQuery);
	$getIdAccessoriesQuery="SELECT IID FROM item ORDER BY IID DESC LIMIT 1";
	$getIdAccessoriesQuerySQL=mysqli_query(openConn(),$getIdAccessoriesQuery);
	if($getIdAccessoriesQuerySQL){
		while($row = mysqli_fetch_assoc($getIdAccessoriesQuerySQL)){	
			if($row != NULL){
				$idAccessories=$row['IID'];
			}
		}
	}
	$addComponentQuery="INSERT INTO component (IID,com_type,com_quan) VALUES ('".$idAccessories."','acc','0')";
    // file_put_contents("www.txt",$addBottleCapacityQuery);
	$addComponentQuery = mysqli_query(openConn(),$addComponentQuery);
	echo "{}";
}
function addSupplyItems(){
	$jsonSupplyEssenceData = $_GET['supplyEssenceData'];
	$supplyEssenceDetails = json_decode($jsonSupplyEssenceData, true);
	$jsonSupplyAlcoholData = $_GET['supplyAlcoholData'];
	$supplyAlcoholDetails = json_decode($jsonSupplyAlcoholData, true);
	$jsonSupplyBottleData = $_GET['supplyBottleData'];
	$supplyBottleDetails = json_decode($jsonSupplyBottleData, true); 
	$supplierId = $_GET['supplierId']; 
	$supplyCode = $_GET['supplyCode'];
	$supplyDate = $_GET['supplyDate'];
	$supplyTotalPrice = $_GET['supplyTotalPrice'];
	$supplyRestPrice = $_GET['supplyRestPrice'];
	$sizeSEssence=sizeof($supplyEssenceDetails);
	$sizeSAlcohol=sizeof($supplyAlcoholDetails);
	$sizeSBottle=sizeof($supplyBottleDetails);
	$addSupplyDetailQuery="INSERT INTO supply_detail(sup_det_SRID,sup_det_code,sup_det_total_price,sup_det_rem_amount,sup_det_date) VALUES('".$supplierId."','".$supplyCode."','".$supplyTotalPrice."','".$supplyRestPrice."','".$supplyDate."')";
	$addSupplyDetailQuerySQL = mysqli_query(openConn(),$addSupplyDetailQuery);
	$getIdSupplyDetailsQuery="SELECT SDID FROM supply_detail ORDER BY SDID DESC LIMIT 1";
	$getIdSupplyDetailsQuerySQL=mysqli_query(openConn(),$getIdSupplyDetailsQuery);
	if($getIdSupplyDetailsQuerySQL){
		while($row = mysqli_fetch_assoc($getIdSupplyDetailsQuerySQL)){	
			if($row != NULL){
				$SDID=$row['SDID'];
			}
		}
	}
	for($i=0;$i<$sizeSEssence;$i++){
		//add facture supply Essence
		$addSupplyEssenceQuery="INSERT INTO supply(sup_SDID,sup_IID,sup_quan,sup_cost,sup_selling_price,sup_total_cost) VALUES('".$SDID."','".$supplyEssenceDetails[$i]['id']. "','".$supplyEssenceDetails[$i]['quantity']. "','".$supplyEssenceDetails[$i]['cost']. "','".$supplyEssenceDetails[$i]['selling']. "','".$supplyEssenceDetails[$i]['price']. "')";
    	// file_put_contents("www2.txt",$addSupplyEssenceQuery);
		$addSupplyEssenceQuerySQL=mysqli_query(openConn(),$addSupplyEssenceQuery);
		//update items Essence
		$updateItemsEssenceQuery="UPDATE item JOIN component ON (component.IID=item.IID) SET item.item_cost = '".$supplyEssenceDetails[$i]['cost']. "',item.item_selling = '".$supplyEssenceDetails[$i]['selling']. "',component.com_quan=component.com_quan + '".$supplyEssenceDetails[$i]['quantity']. "' Where item.IID='".$supplyEssenceDetails[$i]['id']."'";
    	// file_put_contents("www3.txt",$updateItemsEssenceQuery);
		$updateItemsEssenceQuerySQL=mysqli_query(openConn(),$updateItemsEssenceQuery);
	}
	for($i=0;$i<$sizeSAlcohol;$i++){
		//serch type alcohol if exist
		if($supplyAlcoholDetails[0]['id']=='noId'){
				file_put_contents("www5.txt",$supplyAlcoholDetails[0]['id']);
			//insert item alcohol
			$addAlcoholQuery="INSERT INTO item (item_name,item_cost,item_selling) VALUES('alcohol','0','0')";
			$addAlcoholQuerySQL = mysqli_query(openConn(),$addAlcoholQuery);
			$getIdAlcoholQuery="SELECT IID FROM item ORDER BY IID DESC LIMIT 1";
			$getIdAlcoholQuerySQL=mysqli_query(openConn(),$getIdAlcoholQuery);
			if($getIdAlcoholQuerySQL){
				while($row = mysqli_fetch_assoc($getIdAlcoholQuerySQL)){	
					if($row != NULL){
						$IID=$row['IID'];
					}
				}
			}
			$addComponentQuery="INSERT INTO component (IID,com_type,com_quan) VALUES ('".$IID."','alc','0')";
			$addComponentQuerySQL = mysqli_query(openConn(),$addComponentQuery);
			$supplyAlcoholDetails[0]['id']=$IID;
		}
		//add facture supply Essence
		$addSupplyAlcoholQuery="INSERT INTO supply(sup_SDID,sup_IID,sup_quan,sup_cost,sup_selling_price,sup_total_cost) VALUES('".$SDID."','".$supplyAlcoholDetails[0]['id']. "','".$supplyAlcoholDetails[$i]['quantity']. "','".$supplyAlcoholDetails[$i]['cost']. "','".$supplyAlcoholDetails[$i]['selling']. "','".$supplyAlcoholDetails[$i]['price']. "')";
		$addSupplyAlcoholQuery=mysqli_query(openConn(),$addSupplyAlcoholQuery);
		//update items Essence
		$updateItemsAlcoholQuery="UPDATE item JOIN component ON (component.IID=item.IID) SET item.item_cost = '".$supplyAlcoholDetails[$i]['cost']. "',item.item_selling = '".$supplyAlcoholDetails[$i]['selling']. "',component.com_quan=component.com_quan + '".$supplyAlcoholDetails[$i]['quantity']. "' Where item.IID='".$supplyAlcoholDetails[0]['id']."'";
			// file_put_contents("www5.txt",$updateItemsAlcoholQuery);
		$updateItemsAlcoholQuerySQL=mysqli_query(openConn(),$updateItemsAlcoholQuery);
	}
	for($i=0;$i<$sizeSBottle;$i++){
		//add facture supply bottle
		$addSupplyBottleQuery="INSERT INTO supply(sup_SDID,sup_IID,sup_quan,sup_cost,sup_selling_price,sup_total_cost) VALUES('".$SDID."','".$supplyBottleDetails[$i]['id']. "','".$supplyBottleDetails[$i]['quantity']. "','".$supplyBottleDetails[$i]['cost']. "','".$supplyBottleDetails[$i]['selling']. "','".$supplyBottleDetails[$i]['price']. "')";
		$addSupplyBottleQuerySQL=mysqli_query(openConn(),$addSupplyBottleQuery);
		//update items Bottle
		$updateItemsBottleQuery="UPDATE item JOIN component ON (component.IID=item.IID) SET item.item_cost = '".$supplyBottleDetails[$i]['cost']. "',item.item_selling = '".$supplyBottleDetails[$i]['selling']. "',component.com_quan=component.com_quan + '".$supplyBottleDetails[$i]['quantity']. "' Where item.IID='".$supplyBottleDetails[$i]['id']."'";
		$updateItemsBottleQuerySQL=mysqli_query(openConn(),$updateItemsBottleQuery);
	}
	echo "{}";	
}
function addSupplyAccessories(){
	$jsonSupplyAccessoriesData = $_GET['supplyAccessoriesData'];
	$supplyAccessoriesDetails = json_decode($jsonSupplyAccessoriesData, true);
	$supplierId = $_GET['supplierId']; 
	$supplyCode = $_GET['supplyCode'];
	$supplyDate = $_GET['supplyDate'];
	$supplyTotalPrice = $_GET['supplyTotalPrice'];
	$supplyRestPrice = $_GET['supplyRestPrice'];
	$sizeSAccessories=sizeof($supplyAccessoriesDetails);
	$addSupplyDetailQuery="INSERT INTO supply_detail(sup_det_SRID,sup_det_code,sup_det_total_price,sup_det_rem_amount,sup_det_date) VALUES('".$supplierId."','".$supplyCode."','".$supplyTotalPrice."','".$supplyRestPrice."','".$supplyDate."')";
	$addSupplyDetailQuerySQL = mysqli_query(openConn(),$addSupplyDetailQuery);
	$getIdSupplyDetailsQuery="SELECT SDID FROM supply_detail ORDER BY SDID DESC LIMIT 1";
	$getIdSupplyDetailsQuerySQL=mysqli_query(openConn(),$getIdSupplyDetailsQuery);
	if($getIdSupplyDetailsQuerySQL){
		while($row = mysqli_fetch_assoc($getIdSupplyDetailsQuerySQL)){	
			if($row != NULL){
				$SDID=$row['SDID'];
			}
		}
	}
	for($i=0;$i<$sizeSAccessories;$i++){
		//add facture supply Accessories
		$addSupplyAccessoriesQuery="INSERT INTO supply(sup_SDID,sup_IID,sup_quan,sup_cost,sup_selling_price,sup_total_cost,sup_date_exp) VALUES('".$SDID."','".$supplyAccessoriesDetails[$i]['id']. "','".$supplyAccessoriesDetails[$i]['quantity']. "','".$supplyAccessoriesDetails[$i]['cost']. "','".$supplyAccessoriesDetails[$i]['selling']. "','".$supplyAccessoriesDetails[$i]['price']. "','".$supplyAccessoriesDetails[$i]['dateExp']. "')";
    	// file_put_contents("www2.txt",$addSupplyEssenceQuery);
		$addSupplyAccessoriesQuerySQL=mysqli_query(openConn(),$addSupplyAccessoriesQuery);
		//update items Accessories
		$updateItemsAccessoriesQuery="UPDATE item JOIN component ON (component.IID=item.IID) SET item.item_cost = '".$supplyAccessoriesDetails[$i]['cost']. "',item.item_selling = '".$supplyAccessoriesDetails[$i]['selling']. "',component.com_quan=component.com_quan + '".$supplyAccessoriesDetails[$i]['quantity']. "',com_date_exp='".$supplyAccessoriesDetails[$i]['dateExp']."' Where item.IID='".$supplyAccessoriesDetails[$i]['id']."'";
    	// file_put_contents("www3.txt",$updateItemsEssenceQuery);
		$updateItemsAccessoriesQuerySQL=mysqli_query(openConn(),$updateItemsAccessoriesQuery);
	}
	echo "{}";	
}
function displaySupplyCodeToBe(){
	$type=$_GET['type'];
	$counterCode=1;
	$facture_code=$type."-".$counterCode;
	$getFacture_gateCodeQuery="SELECT SDID,sup_det_code from supply_detail";
	$getFacture_gateCodeQuerySQL=mysqli_query(openConn(),$getFacture_gateCodeQuery);
	$jsonData = "";
	if($getFacture_gateCodeQuerySQL){
		while ($row=mysqli_fetch_assoc($getFacture_gateCodeQuerySQL)) {
			if($facture_code == $row['sup_det_code']){
				$number = explode("-", $facture_code);
				$counterCode = intval($number[1])+1;
				$facture_code=$type."-".$counterCode;
			}
		}
	}
	$jsonData = '{"BcodeToBe":"' . $facture_code . '"}';	
	 echo $jsonData;
}
?>
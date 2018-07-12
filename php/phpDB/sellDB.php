<?php
function getAllItem(){
	$nbRow=$_GET['nbRow'];
	$getAllItemQuery="SELECT id,name,belling_price,selling_price FROM item limit ".$nbRow."";
	$getAllItemQuerySQL=mysqli_query(openConn(),$getAllItemQuery);
	$jsonData = "";
	if($getAllItemQuerySQL){
		while($row = mysqli_fetch_assoc($getAllItemQuerySQL)){	
			if($row != NULL){
				if($jsonData != ""){
					$jsonData = $jsonData . ",";
				}
				$jsonData = $jsonData . '{"id":"' . $row['id'] . '",';
				$jsonData = $jsonData . '"itemName":"' . $row['name'] . '",';			
				$jsonData = $jsonData . '"itemBellingPrice":"' . ROUND($row['belling_price'],5) . '",';			
				$jsonData = $jsonData . '"itemSellingPrice":"' . ROUND($row['selling_price'],5) . '"}';			
			}
		}
		$jsonData = '[' . $jsonData . ']';
	}
	echo $jsonData;
}
function getSearchItem(){
	$searchKeyWord=$_GET['searchKeyWord'];
	$getSearchItemQuery="SELECT id,name,belling_price,selling_price FROM item WHERE name LIKE '%".$searchKeyWord."%'";
	$getSearchItemQuerySQL=mysqli_query(openConn(),$getSearchItemQuery);
	$jsonData = "";
	if($getSearchItemQuerySQL){
		while($row = mysqli_fetch_assoc($getSearchItemQuerySQL)){	
			if($row != NULL){
				if($jsonData != ""){
					$jsonData = $jsonData . ",";
				}
				$jsonData = $jsonData . '{"id":"' . $row['id'] . '",';
				$jsonData = $jsonData . '"itemName":"' . $row['name'] . '",';			
				$jsonData = $jsonData . '"itemBellingPrice":"' . ROUND($row['belling_price'],5) . '",';			
				$jsonData = $jsonData . '"itemSellingPrice":"' . ROUND($row['selling_price'],5) . '"}';			
			}
		}
		$jsonData = '[' . $jsonData . ']';
	}
	echo $jsonData;
}
function displayFactureCodeToBe(){
	$type=$_GET['type'];
	$counterCode=1;
	$facture_code=$type."-".$counterCode;
	$getFacture_gateCodeQuery="SELECT ODID,ord_det_code from order_details";
	$getFacture_gateCodeQuerySQL=mysqli_query(openConn(),$getFacture_gateCodeQuery);
	$jsonData = "";
	if($getFacture_gateCodeQuerySQL){
		while ($row=mysqli_fetch_assoc($getFacture_gateCodeQuerySQL)) {
			if($facture_code == $row['ord_det_code']){
				$number = explode("-", $facture_code);
				$counterCode = intval($number[1])+1;
				$facture_code=$type."-".$counterCode;
			}
		}
	}
	$jsonData = '{"FcodeToBe":"' . $facture_code . '"}';	
	 echo $jsonData;
}
function addOrderSell(){
	$jsonFactureData = $_GET['factureData'];
	$factureDetails = json_decode($jsonFactureData, true);
	$jsonClientData = $_GET['clientData'];
	$clientDetails = json_decode($jsonClientData, true); 
	$orderCode = $_GET['orderCode'];
	$orderDate = $_GET['orderDate'];
	$orderTotalPrice = $_GET['orderTotalPrice'];
	$orderRestPrice = $_GET['orderRestPrice'];
	$sizeFacture=sizeof($factureDetails);
	$sizeClient=sizeof($clientDetails);
	$totalProfit=0.0;
    // file_put_contents("www2.txt",$sizeClient);
	if($sizeClient>0){
		$clientId=$clientDetails[0]['id'];
		if($clientDetails[0]['id']!='noId' && $clientDetails[0]['name']!="" && $orderRestPrice!=0){
			$updateClientInfoQuery="UPDATE client SET client_debit = client_debit + '".$orderRestPrice."' WHERE CID='".$clientDetails[0]['id']."' ";
			$updateClientInfoQuerySQL=mysqli_query(openConn(),$updateClientInfoQuery);
		} else if($clientDetails[0]['id']=='noId' && $clientDetails[0]['name']!=""){
			$addClientQuery="INSERT INTO client (client_fullName,client_phone,client_debit)VALUES('".$clientDetails[0]['name']."','".$clientDetails[0]['phone']."','".$orderRestPrice."')";
			$addClientQuerySQL = mysqli_query(openConn(),$addClientQuery);
			$getClientQuery="SELECT CID FROM client ORDER BY CID DESC LIMIT 1";
    	// file_put_contents("www3.txt",$addClientQuery);
			$getClientQuerySQL=mysqli_query(openConn(),$getClientQuery);
	    	if($getClientQuerySQL){
				while($row = mysqli_fetch_assoc($getClientQuerySQL)){	
					if($row != NULL){
						$clientId=$row['CID'];
					}
				}
			}
		}
		$addOrderDetailQuery="INSERT INTO order_details(ord_det_CID,ord_det_code,ord_det_total_price,ord_det_rem_amount,ord_det_date,ord_det_profit) VALUES('".$clientId."','".$orderCode."','".$orderTotalPrice."','".$orderRestPrice."','".$orderDate."','0')";
		$addOrderDetailQuerySQL = mysqli_query(openConn(),$addOrderDetailQuery);
		$getIdOrderDetailsQuery="SELECT ODID FROM order_details ORDER BY ODID DESC LIMIT 1";
		$getIdOrderDetailsQuerySQL=mysqli_query(openConn(),$getIdOrderDetailsQuery);
		if($getIdOrderDetailsQuerySQL){
			while($row = mysqli_fetch_assoc($getIdOrderDetailsQuerySQL)){	
				if($row != NULL){
					$ODID=$row['ODID'];
				}
			}
		}	
	} else if($sizeClient==0){
		$addOrderDetailQuery="INSERT INTO order_details(ord_det_CID,ord_det_code,ord_det_total_price,ord_det_rem_amount,ord_det_date,ord_det_profit) VALUES(NULL,'".$orderCode."','".$orderTotalPrice."','".$orderRestPrice."','".$orderDate."','0')";
		$addOrderDetailQuerySQL = mysqli_query(openConn(),$addOrderDetailQuery);
		$getIdOrderDetailsQuery="SELECT ODID FROM order_details ORDER BY ODID DESC LIMIT 1";
		$getIdOrderDetailsQuerySQL=mysqli_query(openConn(),$getIdOrderDetailsQuery);
		if($getIdOrderDetailsQuerySQL){
			while($row = mysqli_fetch_assoc($getIdOrderDetailsQuerySQL)){	
				if($row != NULL){
					$ODID=$row['ODID'];
				}
			}
		}	
	}
	
	for($i=0;$i<$sizeFacture;$i++){
		if($factureDetails[$i]['type']=='perfume'){
			$updateItemPerfume1Query="UPDATE component SET com_quan=com_quan-('".$factureDetails[$i]['quan_e1']."'/1000)*'".$factureDetails[$i]['quantity']."' WHERE IID='".$factureDetails[$i]['id_e1']."'";
    	file_put_contents("www1.txt",$updateItemPerfume1Query);
			$updateItemPerfume1QuerySQL=mysqli_query(openConn(),$updateItemPerfume1Query);
			$updateItemPerfume2Query="UPDATE component SET com_quan=com_quan-('".$factureDetails[$i]['quan_a']."'/1000)*'".$factureDetails[$i]['quantity']."' WHERE IID='1'";
    	file_put_contents("www2.txt",$updateItemPerfume2Query);
			$updateItemPerfume2QuerySQL=mysqli_query(openConn(),$updateItemPerfume2Query);
			if($factureDetails[$i]['id_e2']!=null){
				$updateItemPerfume3Query="UPDATE component SET com_quan=com_quan-('".$factureDetails[$i]['quan_e2']."'/1000)*'".$factureDetails[$i]['quantity']."' WHERE IID='".$factureDetails[$i]['id_e2']."'";
    	file_put_contents("www3.txt",$updateItemPerfume3Query);
				$updateItemPerfume3QuerySQL=mysqli_query(openConn(),$updateItemPerfume3Query);
			}
			if($factureDetails[$i]['id_b']!=null){
				$updateItemPerfume4Query="UPDATE component SET com_quan=com_quan-'".$factureDetails[$i]['quantity']."' WHERE IID='".$factureDetails[$i]['id_b']."'";
    	file_put_contents("www4.txt",$updateItemPerfume4Query);
				$updateItemPerfume4QuerySQL=mysqli_query(openConn(),$updateItemPerfume4Query);
			}
			if($factureDetails[$i]['item_id']=='new'){
				//insert new def perf
				$addDefPerfumeSQL = "INSERT INTO item (item_name,item_cost,item_selling) VALUES ( '".$factureDetails[$i]['name']."',".doubleval($factureDetails[$i]['cost'])." , ".doubleval($factureDetails[$i]['price']).")";
				$addDefPerfumeSQL = mysqli_query(openConn(),$addDefPerfumeSQL);
				$getIdItemQuery="SELECT IID FROM item ORDER BY IID DESC LIMIT 1";
				$getIdItemQuerySQL=mysqli_query(openConn(),$getIdItemQuery);
				if($getIdItemQuerySQL){
					while($row = mysqli_fetch_assoc($getIdItemQuerySQL)){	
						if($row != NULL){
							$id=$row['IID'];
						}
					}
				}	
				if($factureDetails[$i]['id_e2']!=null){ // insert two essence
        			$addDefPerfumeDetailsSQL = "INSERT INTO definition_perfume (item_IID,item_b_IID,item_e1_IID,item_e2_IID,item_quan_e1,item_quan_e2,item_quan_a) VALUES(".$id.",".$factureDetails[$i]['id_b']." ,".$factureDetails[$i]['id_e1'].", ".$factureDetails[$i]['id_e2']." , ".$factureDetails[$i]['quan_e1'].", ".$factureDetails[$i]['quan_e2']." ,".$factureDetails[$i]['quan_a'].")";

				} else { // insert one essence 
					$addDefPerfumeDetailsSQL = "INSERT INTO definition_perfume (item_IID,item_b_IID,item_e1_IID,item_quan_e1,item_quan_a) VALUES (".$id.",".$factureDetails[$i]['id_b']." ,".$factureDetails[$i]['id_e1'].", ".$factureDetails[$i]['quan_e1'].",".$factureDetails[$i]['quan_a'].")";
				}
    			$addDefPerfumeDetailsSQL=mysqli_query(openConn(), $addDefPerfumeDetailsSQL);
			}
		} else if($factureDetails[$i]['type']=='accessories'){
			$updateAccessoriesQuery="UPDATE component SET com_quan=com_quan-'".$factureDetails[$i]['quantity']."' WHERE IID='".$factureDetails[$i]['item_id']."'";
			$updateAccessoriesQuerySQL=mysqli_query(openConn(),$updateAccessoriesQuery);
		}
		//add facture order 
		if($factureDetails[$i]['item_id']==null || $factureDetails[$i]['item_id']=='new'){
			$addOrderQuery="INSERT INTO order_s(ord_ODID,ord_k_name,ord_quantity,ord_price,ord_profit) VALUES('".$ODID."','".$factureDetails[$i]['name']. "','".$factureDetails[$i]['quantity']. "','".$factureDetails[$i]['price']. "','".$factureDetails[$i]['profit']. "')";
			$addOrderQuerySQL=mysqli_query(openConn(),$addOrderQuery);
		} else {
			$addOrderQuery="INSERT INTO order_s(ord_ODID,ord_IID,ord_k_name,ord_quantity,ord_price,ord_profit) VALUES('".$ODID."','".$factureDetails[$i]['item_id']. "','".$factureDetails[$i]['name']. "','".$factureDetails[$i]['quantity']. "','".$factureDetails[$i]['price']. "','".$factureDetails[$i]['profit']. "')";
    	// file_put_contents("www5.txt",$addOrderQuery);
			$addOrderQuerySQL=mysqli_query(openConn(),$addOrderQuery);
		}
		$totalProfit=$totalProfit+$factureDetails[$i]['profit'];
	}
	//update profit order_detail
	$updateOrderDetailsProfitQuery="UPDATE order_details  SET ord_det_profit='".$totalProfit."' Where ODID='".$ODID."'";
	$updateOrderDetailsProfitQuerySQL=mysqli_query(openConn(),$updateOrderDetailsProfitQuery);
	echo "{}";
}
function addOrderSells(){
	$jsonOrderEssenceData = $_GET['orderEssenceData'];
	$orderEssenceDetails = json_decode($jsonOrderEssenceData, true);
	$jsonOrderAlcoholData = $_GET['orderAlcoholData'];
	$orderAlcoholDetails = json_decode($jsonOrderAlcoholData, true);
	$jsonOrderBottleData = $_GET['orderBottleData'];
	$orderBottleDetails = json_decode($jsonOrderBottleData, true); 
	$jsonClientData = $_GET['clientData'];
	$clientDetails = json_decode($jsonClientData, true); 
	$orderCode = $_GET['orderCode'];
	$orderDate = $_GET['orderDate'];
	$orderTotalPrice = $_GET['orderTotalPrice'];
	$orderRestPrice = $_GET['orderRestPrice'];
	$sizeOEssence=sizeof($orderEssenceDetails);
	$sizeOAlcohol=sizeof($orderAlcoholDetails);
	$sizeOBottle=sizeof($orderBottleDetails);
	$sizeClient=sizeof($clientDetails);
	$totalProfit=0.0;
		// file_put_contents("xxxxxxqqxxxxx.txt",$clientDetails[0]['id'] );
	if($sizeClient>0){
		$clientId=$clientDetails[0]['id'];
		if($clientDetails[0]['id']!='noId' && $clientDetails[0]['name']!="" && $orderRestPrice!=0){
			$updateClientInfoQuery="UPDATE client SET client_debit = client_debit + '".$orderRestPrice."' WHERE CID='".$clientDetails[0]['id']."' ";
			$updateClientInfoQuerySQL=mysqli_query(openConn(),$updateClientInfoQuery);
		} else if($clientDetails[0]['id']=='noId' && $clientDetails[0]['name']!=""){
			$addClientQuery="INSERT INTO client (client_fullName,client_phone,client_debit)VALUES('".$clientDetails[0]['name']."','".$clientDetails[0]['phone']."','".$orderRestPrice."')";
			$addClientQuerySQL = mysqli_query(openConn(),$addClientQuery);
			$getClientQuery="SELECT CID FROM client ORDER BY CID DESC LIMIT 1";
			$getClientQuerySQL=mysqli_query(openConn(),$getClientQuery);
	    	if($getClientQuerySQL){
				while($row = mysqli_fetch_assoc($getClientQuerySQL)){	
					if($row != NULL){
						$clientId=$row['CID'];
					}
				}
			}
		}
		$addOrderDetailQuery="INSERT INTO order_details(ord_det_CID,ord_det_code,ord_det_total_price,ord_det_rem_amount,ord_det_date,ord_det_profit) VALUES('".$clientId."','".$orderCode."','".$orderTotalPrice."','".$orderRestPrice."','".$orderDate."','0')";
		$addOrderDetailQuerySQL = mysqli_query(openConn(),$addOrderDetailQuery);
		$getIdOrderDetailsQuery="SELECT ODID FROM order_details ORDER BY ODID DESC LIMIT 1";
		$getIdOrderDetailsQuerySQL=mysqli_query(openConn(),$getIdOrderDetailsQuery);
		if($getIdOrderDetailsQuerySQL){
			while($row = mysqli_fetch_assoc($getIdOrderDetailsQuerySQL)){	
				if($row != NULL){
					$ODID=$row['ODID'];
				}
			}
		}	
	} else {
		$addOrderDetailQuery="INSERT INTO order_details(ord_det_CID,ord_det_code,ord_det_total_price,ord_det_rem_amount,ord_det_date,ord_det_profit) VALUES(NULL,'".$orderCode."','".$orderTotalPrice."','".$orderRestPrice."','".$orderDate."','0')";
		$addOrderDetailQuerySQL = mysqli_query(openConn(),$addOrderDetailQuery);
		$getIdOrderDetailsQuery="SELECT ODID FROM order_details ORDER BY ODID DESC LIMIT 1";
		$getIdOrderDetailsQuerySQL=mysqli_query(openConn(),$getIdOrderDetailsQuery);
		if($getIdOrderDetailsQuerySQL){
			while($row = mysqli_fetch_assoc($getIdOrderDetailsQuerySQL)){	
				if($row != NULL){
					$ODID=$row['ODID'];
				}
			}
		}	
	}
	
	for($i=0;$i<$sizeOEssence;$i++){
		//add facture order Essence
		$addOrderEssenceQuery="INSERT INTO order_s(ord_ODID,ord_IID,ord_quantity,ord_price,ord_profit) VALUES('".$ODID."','".$orderEssenceDetails[$i]['id']. "','".$orderEssenceDetails[$i]['quantity']. "','".$orderEssenceDetails[$i]['price']. "','".$orderEssenceDetails[$i]['profit']. "')";
    	// file_put_contents("www2.txt",$addOrderEssenceQuery);
		$addOrderEssenceQuerySQL=mysqli_query(openConn(),$addOrderEssenceQuery);
		$totalProfit=$totalProfit+$orderEssenceDetails[$i]['profit'];
		//update items Essence
		$updateItemsEssenceQuery="UPDATE item JOIN component ON (component.IID=item.IID) SET component.com_quan=component.com_quan - '".$orderEssenceDetails[$i]['quantity']. "' Where item.IID='".$orderEssenceDetails[$i]['id']."'";
    	// file_put_contents("www3.txt",$updateItemsEssenceQuery);
		$updateItemsEssenceQuerySQL=mysqli_query(openConn(),$updateItemsEssenceQuery);
	}
	for($i=0;$i<$sizeOAlcohol;$i++){
		//add facture alcohol
		$addOrderAlcoholQuery="INSERT INTO order_s(ord_ODID,ord_IID,ord_quantity,ord_price,ord_profit) VALUES('".$ODID."','".$orderAlcoholDetails[$i]['id']. "','".$orderAlcoholDetails[$i]['quantity']. "','".$orderAlcoholDetails[$i]['price']. "','".$orderAlcoholDetails[$i]['profit']. "')";
    	// file_put_contents("www2.txt",$addOrderAlcoholQuery);
		$addOrderAlcoholQuerySQL=mysqli_query(openConn(),$addOrderAlcoholQuery);
		$totalProfit=$totalProfit+$orderAlcoholDetails[$i]['profit'];
		//update items Alcohol
		$updateItemsAlcoholQuery="UPDATE item JOIN component ON (component.IID=item.IID) SET component.com_quan=component.com_quan - '".$orderAlcoholDetails[$i]['quantity']. "' Where item.IID='".$orderAlcoholDetails[$i]['id']."'";
    	// file_put_contents("www3.txt",$updateItemsAlcoholQuery);
		$updateItemsAlcoholQuerySQL=mysqli_query(openConn(),$updateItemsAlcoholQuery);
	}
	for($i=0;$i<$sizeOBottle;$i++){
				//add facture bottle
		$addOrderBottleQuery="INSERT INTO order_s(ord_ODID,ord_IID,ord_quantity,ord_price,ord_profit) VALUES('".$ODID."','".$orderBottleDetails[$i]['id']. "','".$orderBottleDetails[$i]['quantity']. "','".$orderBottleDetails[$i]['price']. "','".$orderBottleDetails[$i]['profit']. "')";
    	// file_put_contents("www2.txt",$addOrderBottleQuery);
		$addOrderBottleQuerySQL=mysqli_query(openConn(),$addOrderBottleQuery);
		$totalProfit=$totalProfit+$orderBottleDetails[$i]['profit'];
		//update items Bottle
		$updateItemsBottleQuery="UPDATE item JOIN component ON (component.IID=item.IID) SET component.com_quan=component.com_quan - '".$orderBottleDetails[$i]['quantity']. "' Where item.IID='".$orderBottleDetails[$i]['id']."'";
    	// file_put_contents("www3.txt",$updateItemsBottleQuery);
		$updateItemsBottleQuerySQL=mysqli_query(openConn(),$updateItemsBottleQuery);
	}
	//update profit order_detail
	$updateOrderDetailsProfitQuery="UPDATE order_details  SET ord_det_profit='".$totalProfit."' Where ODID='".$ODID."'";
    	// file_put_contents("www3.txt",$updateItemsAlcoholQuery);
	$updateOrderDetailsProfitQuerySQL=mysqli_query(openConn(),$updateOrderDetailsProfitQuery);

	echo "{}";
}
function getSearchPerfume(){
	$searchPerfume=$_GET['searchPerfume'];
	$getPerfumeDefInfoSQL="SELECT d.* from (SELECT def.item_IID ,def.item_quan_a,def.item_e1_IID as item_id_ess1, itemEss1.item_name as item_name_ess1,def.item_e2_IID as item_id_ess2,itemEss2.item_name as item_name_ess2,def.item_quan_e1,def.item_quan_e2,def.item_b_IID as id_b, CONCAT(botNAME.item_name,' | ',botC.com_capacity) as bottleInfo,itemDet.item_name,itemDet.item_cost,itemDet.item_selling FROM definition_perfume AS def INNER JOIN item as itemDet on def.item_IID = itemDet.IID inner join item as itemEss1 on def.item_e1_IID =itemEss1.IID left  join item as itemEss2 on def.item_e2_IID =itemEss2.IID inner join item as botNAME on def.item_b_IID = botNAME.IID inner join component as botC on def.item_b_IID = botC.IID where itemDet.item_name LIKE '%".$searchPerfume."%' order by itemDet.item_name ) as d  LIMIT 20 ";
    $getPerfumeInfoSQLQuery = mysqli_query(openConn(), $getPerfumeDefInfoSQL);
    $jsonData = "";
    if($getPerfumeInfoSQLQuery){
        while($row=mysqli_fetch_assoc($getPerfumeInfoSQLQuery)){

	        if($row != NULL){
	            if($jsonData != ""){
	                $jsonData = $jsonData . ",";
	            }
	            $jsonData = $jsonData . '{"id":"' . $row['item_IID'] . '",';
	            $jsonData = $jsonData . '"name":"' . $row['item_name'] . '",';
	            $jsonData = $jsonData . '"quan_a":"' . $row['item_quan_a'] . '",';
	            $jsonData = $jsonData . '"id_e1":"' . $row['item_id_ess1'] . '",';
	            $jsonData = $jsonData . '"name_e1":"' . $row['item_name_ess1'] . '",';
	            $jsonData = $jsonData . '"quan_e1":"' . $row['item_quan_e1'] . '",';
	            $jsonData = $jsonData . '"id_e2":"' . $row['item_id_ess2'] . '",';
	            $jsonData = $jsonData . '"name_e2":"' . $row['item_name_ess2'] . '",';
	            $jsonData = $jsonData . '"quan_e2":"' . $row['item_quan_e2'] . '",';
	            $jsonData = $jsonData . '"id_b":"' . $row['id_b'] . '",';
	            $jsonData = $jsonData . '"bottle":"' . $row['bottleInfo'] . '",';
	            $jsonData = $jsonData . '"cost":"' . $row['item_cost'] . '",';  
	            $jsonData = $jsonData . '"selling":"' . $row['item_selling'] . '"}';  
	            
	        
	        }
    	}
	        $jsonData = '[' . $jsonData . ']';
    }
	// file_put_contents("wwxxqq.txt", $jsonData);

    echo $jsonData;
}
function getTopAccessories(){
	// $searchAccessories=$_GET['searchAccessories'];
	$getAccessoriesSQL="SELECT item_name,item_cost,item_selling,com_quan,item.IID from item  inner join component  on item.IID = component.IID INNER JOIN (SELECT Count(ord_IID) as exp,ord_IID FROM order_s INNER JOIN component on order_s.ord_IID=component.IId where com_type='acc' group by ord_IID  order by exp DESC  limit 20 ) as countTable on item.IID = countTable.ord_IID";
    $getAccessoriesSQLQuery = mysqli_query(openConn(), $getAccessoriesSQL);
    $jsonData = "";
    if($getAccessoriesSQLQuery){
        while($row=mysqli_fetch_assoc($getAccessoriesSQLQuery)){

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
function getSearchAccessories(){
	$searchAccessories=$_GET['searchAccessories'];
	$getSearchAccessoriesQuery="SELECT d.* from (SELECT item.IID,item_name,item_cost,item_selling,com_quan FROM item inner join component on component.IID = item.IID where com_type='acc' and item_name LIKE '%".$searchAccessories."%' order by item_name) as d  LIMIT 20 ";
	$getSearchAccessoriesQuerySQL=mysqli_query(openConn(),$getSearchAccessoriesQuery);
	$jsonData = "";
	if($getSearchAccessoriesQuerySQL){
		while($row = mysqli_fetch_assoc($getSearchAccessoriesQuerySQL)){	
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
	file_put_contents("qqxxqq.txt", $jsonData);
	echo $jsonData;
}
?>
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
function addFactureSell(){
	$type = $_GET['type'];
	$clientId = $_GET['clientId'];
	$clientName = $_GET['clientName'];
	$clientPhone = $_GET['clientPhone'];
	$factureCode = $_GET['factureCode'];
	$factureDate = $_GET['factureDate'];
	$sellTotalPrice = $_GET['sellTotalPrice'];
	$sellRestPrice = $_GET['sellRestPrice'];
	$name = $_GET['name'];
	$price = $_GET['price'];
	$quantity = $_GET['quantity'];
	$bellingPrice = $_GET['bellingPrice'];
	$totalPrice = $_GET['totalPrice'];
	$bottleId = $_GET['bottleId'];
	$essenceId1 = $_GET['essenceId1'];
	$essenceId2 = $_GET['essenceId2'];
	$essenceQuantity1 = $_GET['essenceQuantity1'];
	$essenceQuantity2 = $_GET['essenceQuantity2'];
	$alcoholQuantity = $_GET['alcoholQuantity'];
	$perfumeQuantity = $_GET['perfumeQuantity'];
	$itemId = $_GET['itemId'];
	$quantityItem = $_GET['quantityItem'];
	$lengthFacturePerfume = $_GET['lengthFacturePerfume'];
	$lengthFactureItem = $_GET['lengthFactureItem'];
	$lengthPerfume = $_GET['lengthPerfume'];
	$lengthItem = $_GET['lengthItem'];
	$todayDate = $_GET['todayDate'];
	$id_total_drawer = $_GET['id_total_drawer'];
	$totalAlcohol = 0;
	$totalBellingPrice=0.0;
	if($clientId == 'noId'){
		$addClientQuery="INSERT INTO client (full_name,phone,debit)VALUES('".$clientName."','".$clientPhone."','".$sellRestPrice."')";
		$addClientQuerySQL = mysqli_query(openConn(),$addClientQuery);
		$getClientQuery="SELECT id FROM client ORDER BY id DESC LIMIT 1";
		$getClientQuerySQL=mysqli_query(openConn(),$getClientQuery);
    	if($getClientQuerySQL){
			while($row = mysqli_fetch_assoc($getClientQuerySQL)){	
				if($row != NULL){
					$clientId=$row['id'];
				}
			}
		}
	} elseif(($clientId != 'noId' || $clientId != 'empty') && $sellRestPrice != 0){
		$updateClientInfoQuery="UPDATE client SET debit = debit + '".$sellRestPrice."' WHERE id='".$clientId."' ";
		$updateClientInfoQuerySQL=mysqli_query(openConn(),$updateClientInfoQuery);
	}
	if($clientId != 'empty'){
		$addFactureSellQuery="INSERT INTO sell (type,total,rest,dateS,code,id_client,name_client) VALUES('".$type."','".$sellTotalPrice."','".$sellRestPrice."','".$factureDate."','".$factureCode."','".$clientId."','".$clientName."')";
		$addFactureSellQuerySQL = mysqli_query(openConn(),$addFactureSellQuery);
		$getFactureSellQuery="SELECT id FROM sell ORDER BY id DESC LIMIT 1";
		$getFactureSellQuerySQL=mysqli_query(openConn(),$getFactureSellQuery);
		if($getFactureSellQuerySQL){
			while($row = mysqli_fetch_assoc($getFactureSellQuerySQL)){	
				if($row != NULL){
					$id_sell=$row['id'];
				}
			}
		}
	} elseif($clientId == 'empty'){
		$addFactureSellQuery="INSERT INTO sell (type,total,rest,dateS,code)VALUES('".$type."','".$sellTotalPrice."','".$sellRestPrice."','".$factureDate."','".$factureCode."')";
		$addFactureSellQuerySQL = mysqli_query(openConn(),$addFactureSellQuery);
		$getFactureSellQuery="SELECT id FROM sell ORDER BY id DESC LIMIT 1";
		$getFactureSellQuerySQL=mysqli_query(openConn(),$getFactureSellQuery);
		if($getFactureSellQuerySQL){
			while($row = mysqli_fetch_assoc($getFactureSellQuerySQL)){	
				if($row != NULL){
					$id_sell=$row['id'];
				}
			}
		}
	}
	$rowsFacture = $lengthFacturePerfume + $lengthFactureItem;
	if($rowsFacture != 0){
		 // file_put_contents("WWW.txt", $rowsFacture);
		for($i=0;$i<$rowsFacture;$i++){
			//if($name[$i] !='empty' && $quantity[$i]!='empty' && $price[$i]!='empty' && $totalPrice[$i]!='empty' && $bellingPrice[$i]!='empty'){
				$addFactureSellDetailQuery="INSERT INTO sell_detail(id_sell,name,quantity,price,totalPrice,bellingPrice)VALUES('".$id_sell."','".$name[$i]."','".$quantity[$i]."','".$price[$i]."','".$totalPrice[$i]."','".$bellingPrice[$i]."')";
				$addFactureSellDetailQuerySQL=mysqli_query(openConn(),$addFactureSellDetailQuery);
		 // file_put_contents("xxxx.txt", $addFactureSellDetailQuery);
				$totalBellingPrice=$totalBellingPrice+$bellingPrice[$i];
			//}
		}
		if($lengthFacturePerfume != 0){
			for($i=0;$i<$lengthFacturePerfume;$i++){
				if($bottleId[$i] != 'empty' || $bottleId[$i] != 'noId'){
					$updateBottleQuery="UPDATE bottle SET quantity = quantity - '".$perfumeQuantity[$i]."' Where id='".$bottleId[$i]."'";
					$updateBottleQuerySQL=mysqli_query(openConn(),$updateBottleQuery);
				}
				$updateEssenceQuery="UPDATE essence SET quantity = quantity - '".($essenceQuantity1[$i]/1000)*$perfumeQuantity[$i]."' Where id='".$essenceId1[$i]."'";
				$updateEssenceQuerySQL=mysqli_query(openConn(),$updateEssenceQuery);
				if($essenceId2[$i] != 'empty' && $essenceQuantity2[$i] != 'empty'){
					$updateEssenceQuery="UPDATE essence SET quantity = quantity - '".($essenceQuantity2[$i]/1000)*$perfumeQuantity[$i]."' Where id='".$essenceId2[$i]."'";
					$updateEssenceQuerySQL=mysqli_query(openConn(),$updateEssenceQuery);
				}
				$totalAlcohol = $totalAlcohol + ($alcoholQuantity[$i]/1000)*$perfumeQuantity[$i];
			}
			if($totalAlcohol != 0){
				$alcohol='alcohol';
				$updateEssenceQuery="UPDATE essence SET quantity = quantity - '".$totalAlcohol."' Where name= '".$alcohol."'";
				$updateEssenceQuerySQL=mysqli_query(openConn(),$updateEssenceQuery);
			}
		}
		if($lengthFactureItem != 0){
			for($i=0;$i<$lengthFactureItem;$i++){
				$updateItemQuery="UPDATE item SET quantity = quantity - '".$quantityItem[$i]."' Where id='".$itemId[$i]."'";
				$updateItemQuerySQL=mysqli_query(openConn(),$updateItemQuery);
			}
		}
	}
	$updateFactureSellQuery="UPDATE sell SET bellingPrice = '".$totalBellingPrice."' WHERE id='".$id_sell."' ";
	$updateFactureSellQuerySQL=mysqli_query(openConn(),$updateFactureSellQuery);
	$sellTotalPrice=$sellTotalPrice-$sellRestPrice;
	$addDrawerQuery="INSERT INTO drawer (dateD,amount,type,profit) VALUES('".$factureDate."','".$sellTotalPrice."','sell','".$totalBellingPrice."')";
	$addDrawerQuerySQL = mysqli_query(openConn(),$addDrawerQuery);	
	// if($todayDate == $factureDate){

	// } else 
	if($todayDate != $factureDate){
	// file_put_contents("wewewewew.txt", $factureDate );
		$updateTotalDrawerQuery="UPDATE drawer SET amount = amount + '".$sellTotalPrice."' WHERE dateD='".$factureDate."' AND type='total'";
		$updateTotalDrawerQuerySQL = mysqli_query(openConn(),$updateTotalDrawerQuery);	
	} else if($todayDate == $factureDate){
		$updateTotalDrawerQuery="UPDATE drawer SET amount = amount + '".$sellTotalPrice."' WHERE id='".$id_total_drawer."'";
		$updateTotalDrawerQuerySQL = mysqli_query(openConn(),$updateTotalDrawerQuery);	
	}
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
    	file_put_contents("www2.txt",$addOrderEssenceQuery);
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
	$getPerfumeDefInfoSQL="SELECT d.* from (SELECT def.item_IID ,def.item_quan_a, itemEss1.item_name as item_name_ess1,itemEss2.item_name as item_name_ess2,def.item_quan_e1,def.item_quan_e2, CONCAT(botNAME.item_name,' | ',botC.com_capacity) as bottleInfo,itemDet.item_name,itemDet.item_cost,itemDet.item_selling FROM definition_perfume AS def INNER JOIN item as itemDet on def.item_IID = itemDet.IID inner join item as itemEss1 on def.item_e1_IID =itemEss1.IID left  join item as itemEss2 on def.item_e2_IID =itemEss2.IID inner join item as botNAME on def.item_b_IID = botNAME.IID inner join component as botC on def.item_b_IID = botC.IID where itemDet.item_name LIKE '%".$searchPerfume."%' order by itemDet.item_name ) as d  LIMIT 20 ";
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
	            $jsonData = $jsonData . '"name_e1":"' . $row['item_name_ess1'] . '",';
	            $jsonData = $jsonData . '"quan_e1":"' . $row['item_quan_e1'] . '",';
	            $jsonData = $jsonData . '"name_e2":"' . $row['item_name_ess2'] . '",';
	            $jsonData = $jsonData . '"quan_e2":"' . $row['item_quan_e2'] . '",';
	            $jsonData = $jsonData . '"bottle":"' . $row['bottleInfo'] . '",';
	            $jsonData = $jsonData . '"cost":"' . $row['item_cost'] . '",';  
	            $jsonData = $jsonData . '"selling":"' . $row['item_selling'] . '"}';  
	            
	        
	        }
    	}
	        $jsonData = '[' . $jsonData . ']';
    }
    echo $jsonData;
}
function getAccessories(){
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

	file_put_contents("xxqq.txt", $jsonData);
    echo $jsonData;
}
?>
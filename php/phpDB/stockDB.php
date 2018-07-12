<?php
function essenceDataTable(){ //checked
	$requestData= $_REQUEST;
	$rowsReq = (isset($_GET['length'])) ? intval($_GET['length']) : 10;
	$start = (isset($_GET['start'])) ? intval($_GET['start']) : 0;
	$rowsCount=mysqli_fetch_assoc(mysqli_query(openConn(),"select COUNT(IID) as exp FROM component WHERE com_type='ess' OR com_type='alc'"))['exp'];
	$orderString="";
	if($rowsReq==-1)
	{
		$rowsReq=$rowsCount;
	}
	if(count($_GET['order']))
	{
		$orderBy = $_GET['columns'][$_GET['order'][0]['column']]['data'];
 		$orderDir = $_GET['order'][0]['dir'];
 		$orderString=" ORDER BY ".$orderBy." ".$orderDir;
	}
	if(isset($_GET["search"]["value"]) && !empty($_GET["search"]["value"]))
	{
 		$search = $_GET["search"]["value"];
 		$getAllEssenceQuery="SELECT DISTINCT(item.IID) as itemID, CONCAT(item.IID,'/',item.item_name)  as itemName,item.item_cost as itemCost,item.item_selling as itemPrice, component.com_quan as itemQuan, supplier.supplier_name as supplierName FROM ITEM INNER JOIN supply ON item.IID = supply.sup_IID INNER JOIN supply_detail ON supply.sup_SDID = supply_detail.SDID INNER JOIN supplier on supply_detail.sup_det_SRID = supplier.SRID inner join component on item.IID=component.IID WHERE (component.com_type='ess' OR component.com_type='alc') AND item.item_name like '%".$search."%' ".$orderString." LIMIT ".$rowsReq." OFFSET ".$start;
	}
	else
	{
		$getAllEssenceQuery=" SELECT DISTINCT(item.IID) as itemID, CONCAT(item.IID,'/',item.item_name)  as itemName,item.item_cost as itemCost,item.item_selling as itemPrice, component.com_quan as itemQuan, supplier.supplier_name as supplierName FROM ITEM INNER JOIN supply ON item.IID = supply.sup_IID INNER JOIN supply_detail ON supply.sup_SDID = supply_detail.SDID INNER JOIN supplier on supply_detail.sup_det_SRID = supplier.SRID inner join component on item.IID=component.IID WHERE (component.com_type= 'ess' OR component.com_type='alc') ".$orderString." LIMIT ".$rowsReq." OFFSET ".$start;
	}
	$getAllEssenceQuerySQL = mysqli_query(openConn(),$getAllEssenceQuery); 
	$rowsCountFilter = mysqli_num_rows($getAllEssenceQuerySQL);
	$jsonData="";
	if($getAllEssenceQuerySQL){
		while ($row=mysqli_fetch_assoc($getAllEssenceQuerySQL)){
			if($row != NULL){
				if($jsonData != ""){
					$jsonData = $jsonData . ",";
				}
				$jsonData = $jsonData . '{"IID":"' . $row['itemID'] . '",';
				$jsonData = $jsonData . '"item_name":"' . $row['itemName'] . '",';
				$jsonData = $jsonData . '"item_cost":"' . $row['itemCost'] . '",';
				$jsonData = $jsonData . '"item_selling":"' . $row['itemPrice'] . '",';
				$jsonData = $jsonData . '"com_quan":"' . $row['itemQuan'] . '",';
				$jsonData = $jsonData . '"supplier_name":"' . $row['supplierName'] . '"}';
			}
		}
	}
	$jsonData = '[' . $jsonData . ']';
	$jsonData2='{"draw":'.intval($requestData['draw']).',"recordsTotal":'.$rowsCount.', "recordsFiltered":'.$rowsCount.', "data":'.$jsonData.'}';
	echo ($jsonData2);
}
function bottleDataTable(){ //checked
	$requestData= $_REQUEST;
	$rowsReq = (isset($_GET['length'])) ? intval($_GET['length']) : 10;
	$start = (isset($_GET['start'])) ? intval($_GET['start']) : 0;
	$rowsCount=mysqli_fetch_assoc(mysqli_query(openConn(),"select COUNT(IID) as exp from component WHERE com_type='bot'"))['exp'];
	$orderString="";
	if($rowsReq==-1)
	{
		$rowsReq=$rowsCount;
	}
	if(count($_GET['order']))
	{
		$orderBy = $_GET['columns'][$_GET['order'][0]['column']]['data'];
 		$orderDir = $_GET['order'][0]['dir'];
 		$orderString=" ORDER BY ".$orderBy." ".$orderDir;
	}
	if(isset($_GET["search"]["value"]) && !empty($_GET["search"]["value"]))
	{
 		$search = $_GET["search"]["value"];
 		$getAllBottleQuery="SELECT DISTINCT(item.IID) as itemID, CONCAT(item.item_name,' | ',component.com_capacity,'/',item.IID)  as itemName,item.item_cost as itemCost,item.item_selling as itemPrice, component.com_quan as itemQuan, supplier.supplier_name as supplierName FROM ITEM INNER JOIN supply ON item.IID = supply.sup_IID INNER JOIN supply_detail ON supply.sup_SDID = supply_detail.SDID INNER JOIN supplier on supply_detail.sup_det_SRID = supplier.SRID inner join component on item.IID=component.IID WHERE component.com_type='bot' AND item.item_name like '%".$search."%' ".$orderString." LIMIT ".$rowsReq." OFFSET ".$start;
	}
	else
	{
		$getAllBottleQuery="SELECT DISTINCT(item.IID) as itemID, CONCAT(item.item_name,' | ',component.com_capacity,'/',item.IID)  as itemName,item.item_cost as itemCost,item.item_selling as itemPrice, component.com_quan as itemQuan, supplier.supplier_name as supplierName FROM ITEM INNER JOIN supply ON item.IID = supply.sup_IID INNER JOIN supply_detail ON supply.sup_SDID = supply_detail.SDID INNER JOIN supplier on supply_detail.sup_det_SRID = supplier.SRID inner join component on item.IID=component.IID WHERE component.com_type= 'bot' ".$orderString." LIMIT ".$rowsReq." OFFSET ".$start;
	}	
	$getAllBottleQuerySQL = mysqli_query(openConn(),$getAllBottleQuery); 
	$rowsCountFilter = mysqli_num_rows($getAllBottleQuerySQL);
	$jsonData="";	
	if($getAllBottleQuerySQL){
		while ($row=mysqli_fetch_assoc($getAllBottleQuerySQL)){
			if($row != NULL){
				if($jsonData != ""){
					$jsonData = $jsonData . ",";
				}
				$jsonData = $jsonData . '{"IID":"' . $row['itemID'] . '",';
				$jsonData = $jsonData . '"item_name":"' . $row['itemName'] . '",';
				$jsonData = $jsonData . '"item_cost":"' . $row['itemCost'] . '",';
				$jsonData = $jsonData . '"item_selling":"' . $row['itemPrice'] . '",';
				$jsonData = $jsonData . '"com_quan":"' . $row['itemQuan'] . '",';
				$jsonData = $jsonData . '"supplier_name":"' . $row['supplierName'] . '"}';
			}
		}
	}
	$jsonData = '[' . $jsonData . ']';
	$jsonData2='{"draw":'.intval($requestData['draw']).',"recordsTotal":'.$rowsCount.', "recordsFiltered":'.$rowsCount.', "data":'.$jsonData.'}';
	echo ($jsonData2);
}
function accDataTable(){ //checked
	$requestData= $_REQUEST;
	$rowsReq = (isset($_GET['length'])) ? intval($_GET['length']) : 10;
	$start = (isset($_GET['start'])) ? intval($_GET['start']) : 0;
	$rowsCount=mysqli_fetch_assoc(mysqli_query(openConn(),"select COUNT(IID) as exp FROM component WHERE component.com_type='acc'"))['exp'];
	$orderString="";
	if($rowsReq==-1)
	{
		$rowsReq=$rowsCount;
	}
	if(count($_GET['order']))
	{
		$orderBy = $_GET['columns'][$_GET['order'][0]['column']]['data'];
 		$orderDir = $_GET['order'][0]['dir'];
 		$orderString=" ORDER BY ".$orderBy." ".$orderDir;
	}
	if(isset($_GET["search"]["value"]) && !empty($_GET["search"]["value"]))
	{
 		$search = $_GET["search"]["value"];
 		$getAllAccQuery="SELECT DISTINCT(item.IID) as itemID, CONCAT(item.item_name,'/',item.IID)  as itemName,item.item_cost as itemCost,item.item_selling as itemPrice, component.com_quan as itemQuan,component.com_date_exp as itemDate , supplier.supplier_name as supplierName FROM ITEM INNER JOIN supply ON item.IID = supply.sup_IID INNER JOIN supply_detail ON supply.sup_SDID = supply_detail.SDID INNER JOIN supplier on supply_detail.sup_det_SRID = supplier.SRID inner join component on item.IID=component.IID WHERE component.com_type='acc' AND item.item_name like '%".$search."%' ".$orderString." LIMIT ".$rowsReq." OFFSET ".$start;
	}
	else
	{
		$getAllAccQuery="SELECT DISTINCT(item.IID) as itemID, CONCAT(item.item_name,'/',item.IID)  as itemName,item.item_cost as itemCost,item.item_selling as itemPrice, component.com_quan as itemQuan,component.com_date_exp as itemDate , supplier.supplier_name as supplierName FROM ITEM INNER JOIN supply ON item.IID = supply.sup_IID INNER JOIN supply_detail ON supply.sup_SDID = supply_detail.SDID INNER JOIN supplier on supply_detail.sup_det_SRID = supplier.SRID inner join component on item.IID=component.IID WHERE component.com_type= 'acc' ".$orderString." LIMIT ".$rowsReq." OFFSET ".$start;
	}
	$getAllAccQuerySQL = mysqli_query(openConn(),$getAllAccQuery); 
	$rowsCountFilter = mysqli_num_rows($getAllAccQuerySQL);
	$jsonData="";
	if($getAllAccQuerySQL){
		while ($row=mysqli_fetch_assoc($getAllAccQuerySQL)){
			if($row != NULL){
				if($jsonData != ""){
					$jsonData = $jsonData . ",";
				}
				$jsonData = $jsonData . '{"IID":"' . $row['itemID'] . '",';
				$jsonData = $jsonData . '"item_name":"' . $row['itemName'] . '",';
				$jsonData = $jsonData . '"item_cost":"' . $row['itemCost'] . '",';
				$jsonData = $jsonData . '"item_selling":"' . $row['itemPrice'] . '",';
				$jsonData = $jsonData . '"com_quan":"' . $row['itemQuan'] . '",';
				$jsonData = $jsonData . '"com_date_exp":"' . $row['itemDate'] . '",';
				$jsonData = $jsonData . '"supplier_name":"' . $row['supplierName'] . '"}';
			}
		}
	}
	$jsonData = '[' . $jsonData . ']';
	$jsonData2='{"draw":'.intval($requestData['draw']).',"recordsTotal":'.$rowsCount.', "recordsFiltered":'.$rowsCount.', "data":'.$jsonData.'}';
	echo ($jsonData2);
}
function editEssence(){//checked
	$essenceName = $_GET['essence'];
	$id = $_GET['id'];
	$updateEssenceQuery="UPDATE item SET item_name = '".$essenceName."' Where IID='".$id."'";
	mysqli_query(openConn(),$updateEssenceQuery);
	echo "{}";
}
function editBottle(){//cheked
	$type = $_GET['type'];	
	$capacity = $_GET['capacity'];	
	$id = $_GET['id'];
	$updateBottleQuery="UPDATE item SET item_name = '".$type."' Where IID=".$id;
	mysqli_query(openConn(),$updateBottleQuery);
	$updateBottleQuery="UPDATE component SET com_capacity = '".$capacity."' Where IID=".$id;
	mysqli_query(openConn(),$updateBottleQuery);
	echo "{}";
}
function editAcc(){//checked
	$item = $_GET['item'];	
	$id = $_GET['id'];
	$updateItemQuery="UPDATE item SET item_name = '".$item."' Where IID=".$id;
	mysqli_query(openConn(),$updateItemQuery);
	echo "{}";
}
?>
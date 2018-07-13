<?php
function supplyInvoicesDataTable(){ //checked
	$requestData= $_REQUEST;
	$rowsReq = (isset($_GET['length'])) ? intval($_GET['length']) : 10;
	$start = (isset($_GET['start'])) ? intval($_GET['start']) : 0;
	$rowsCount=mysqli_fetch_assoc(mysqli_query(openConn(),"select COUNT(SDID) as exp from supply_detail"))['exp'];
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
 		$getAllSupplyInvoicesQuery=" SELECT supply_detail.sup_det_code as code , supply_detail.sup_det_date as dateIn , supplier.supplier_name as name , supply_detail.sup_det_total_price as price, supply_detail.sup_det_rem_amount as remAmout, supply_detail.SDID as id  FROM supply_detail inner join supplier on supply_detail.sup_det_SRID=supplier.SRID where supply_detail.sup_det_code like '%".$search."%' OR supply_detail.sup_det_date like '%".$search."%' OR supplier.supplier_name like '%".$search."%'".$orderString." LIMIT ".$rowsReq." OFFSET ".$start;
	}
	else
	{
		$getAllSupplyInvoicesQuery="SELECT supply_detail.sup_det_code as code , supply_detail.sup_det_date as dateIn , supplier.supplier_name as name , supply_detail.sup_det_total_price as price, supply_detail.sup_det_rem_amount as remAmout, supply_detail.SDID as id FROM supply_detail inner join supplier on supply_detail.sup_det_SRID=supplier.SRID ".$orderString." LIMIT ".$rowsReq." OFFSET ".$start;
	}
	$getAllSupplyInvoicesQuerySQL = mysqli_query(openConn(),$getAllSupplyInvoicesQuery); 
	$rowsCountFilter = mysqli_num_rows($getAllSupplyInvoicesQuerySQL);
	$jsonData="";	
	if($getAllSupplyInvoicesQuerySQL){
		while ($row=mysqli_fetch_assoc($getAllSupplyInvoicesQuerySQL)){
			if($row != NULL){
				if($jsonData != ""){
					$jsonData = $jsonData . ",";
				}
				$jsonData = $jsonData . '{"sup_det_code":"' . $row['code'] . '",';
				$jsonData = $jsonData . '"sup_det_date":"' . $row['dateIn'] . '",';
				$jsonData = $jsonData . '"supplier_name":"' . $row['name'] . '",';
				$jsonData = $jsonData . '"sup_det_total_price":"' . $row['price'] . '",';
				$jsonData = $jsonData . '"SDID":"' . $row['id'] . '",';
				$jsonData = $jsonData . '"sup_det_rem_amount":"' . $row['remAmout'] . '"}';
			}
		}
	}
	$jsonData = '[' . $jsonData . ']';
	$jsonData2='{"draw":'.intval($requestData['draw']).',"recordsTotal":'.$rowsCount.', "recordsFiltered":'.$rowsCount.', "data":'.$jsonData.'}';
	echo ($jsonData2);
}
function supplyinvoiceHeader(){ // checked
	$id = $_GET['id'];
	$getSupplyInvoiceHeaderQuery="SELECT supply_detail.sup_det_code ,supply_detail.sup_det_date,supply_detail.sup_det_total_price,(supply_detail.sup_det_total_price - supply_detail.sup_det_rem_amount) as totalPaid, supplier.supplier_name,supplier.supplier_phone FROM supply_detail INNER JOIN supplier on supply_detail.sup_det_SRID = supplier.SRID WHERE supply_detail.SDID= ".$id;

	$getSupplyInvoiceHeaderQuerySQL=mysqli_query(openConn(),$getSupplyInvoiceHeaderQuery);
	$jsonData = "";
	if($getSupplyInvoiceHeaderQuerySQL){
		while($row = mysqli_fetch_assoc($getSupplyInvoiceHeaderQuerySQL)){	
			if($row != NULL){
				$jsonData = $jsonData . '{"sup_det_code":"' . $row['sup_det_code'] . '",';
				$jsonData = $jsonData . '"sup_det_date":"' . $row['sup_det_date'] . '",';
				$jsonData = $jsonData . '"sup_det_total_price":"' . $row['sup_det_total_price'] . '",';
				$jsonData = $jsonData . '"totalPaid":"' . $row['totalPaid'] . '",';
				$jsonData = $jsonData . '"supplier_name":"' . $row['supplier_name'] . '",';
				$jsonData = $jsonData . '"supplier_phone":"' . $row['supplier_phone'] . '"}';			
			}
		}
	}
	echo $jsonData;	
}
function accSupplyInvoiceDetails(){ //checked
	$id = $_GET['id'];
	$getAccSupplyInvoiceDetailsQuery="SELECT item.item_name, supply.sup_quan,supply.sup_selling_price,supply.sup_cost,supply.sup_total_cost,supply.sup_date_exp FROM supply INNER JOIN supply_detail ON supply.sup_SDID = supply_detail.SDID INNER JOIN item on supply.sup_IID=item.IID WHERE supply.sup_SDID= ".$id;
	$getAccSupplyInvoiceDetailsQuerySQL=mysqli_query(openConn(),$getAccSupplyInvoiceDetailsQuery);
	$jsonData = "";
	if($getAccSupplyInvoiceDetailsQuerySQL){
		while($row = mysqli_fetch_assoc($getAccSupplyInvoiceDetailsQuerySQL)){	
			if($row != NULL){
				if($jsonData != ""){
					$jsonData = $jsonData . ",";
				}
				$jsonData = $jsonData . '{"item_name":"' . $row['item_name'] . '",';
				$jsonData = $jsonData . '"sup_quan":"' . $row['sup_quan'] . '",';
				$jsonData = $jsonData . '"sup_selling_price":"' . $row['sup_selling_price'] . '",';
				$jsonData = $jsonData . '"sup_cost":"' . $row['sup_cost'] . '",';
				$jsonData = $jsonData . '"sup_total_cost":"' . $row['sup_total_cost'] . '",';
				$jsonData = $jsonData . '"sup_date_exp":"' . $row['sup_date_exp'] . '"}';			
			}
		}
	}
	$jsonData = '[' . $jsonData . ']';
	echo $jsonData;
}
function itemsSupplyInvoiceDetails(){ //checked
	$id = $_GET['id'];
	$getItemsSupplyInvoiceDetailsQuery=" SELECT item.item_name, supply.sup_quan,supply.sup_selling_price,supply.sup_cost,supply.sup_total_cost, component.com_capacity,component.com_type FROM supply INNER JOIN supply_detail ON supply.sup_SDID = supply_detail.SDID INNER JOIN item on supply.sup_IID=item.IID INNER JOIN component ON supply.sup_IID = component.IID WHERE supply.sup_SDID = ".$id;

	$getItemsSupplyInvoiceDetailsQuerySQL=mysqli_query(openConn(),$getItemsSupplyInvoiceDetailsQuery);
	$jsonData = "";
	if($getItemsSupplyInvoiceDetailsQuerySQL){
		while($row = mysqli_fetch_assoc($getItemsSupplyInvoiceDetailsQuerySQL)){	
			if($row != NULL){
				if($jsonData != ""){
					$jsonData = $jsonData . ",";
				}
				$jsonData = $jsonData . '{"item_name":"' . $row['item_name'] . '",';
				$jsonData = $jsonData . '"sup_quan":"' . $row['sup_quan'] . '",';
				$jsonData = $jsonData . '"sup_selling_price":"' . $row['sup_selling_price'] . '",';
				$jsonData = $jsonData . '"sup_cost":"' . $row['sup_cost'] . '",';
				$jsonData = $jsonData . '"com_type":"' . $row['com_type'] . '",';
				$jsonData = $jsonData . '"sup_total_cost":"' . $row['sup_total_cost'] . '",';
				$jsonData = $jsonData . '"com_capacity":"' . $row['com_capacity'] . '"}';			
			}
		}
	}
	$jsonData = '[' . $jsonData . ']';
	echo $jsonData;
}
function sellsInvoicesDataTable(){ //checked
	$requestData= $_REQUEST;
	$rowsReq = (isset($_GET['length'])) ? intval($_GET['length']) : 10;
	$start = (isset($_GET['start'])) ? intval($_GET['start']) : 0;
	$rowsCount=mysqli_fetch_assoc(mysqli_query(openConn(),"select COUNT(ODID) as exp from order_details where ord_det_code like 'SS%'"))['exp'];
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
 		$getAllSellsInvoicesQuery=" SELECT order_details.ODID ,order_details.ord_det_code ,order_details.ord_det_date ,client.client_fullName ,order_details.ord_det_total_price,order_details.ord_det_rem_amount FROM order_details  LEFT JOIN client ON order_details.ord_det_CID = client.CID WHERE ord_det_code LIKE 'SS%' AND order_details.ord_det_code like '%".$search."%' OR order_details.ord_det_date like '%".$search."%' OR client.client_fullName like '%".$search."%'".$orderString." LIMIT ".$rowsReq." OFFSET ".$start;
	}
	else
	{
		$getAllSellsInvoicesQuery=" SELECT order_details.ODID ,order_details.ord_det_code ,order_details.ord_det_date ,client.client_fullName ,order_details.ord_det_total_price,order_details.ord_det_rem_amount FROM order_details  LEFT JOIN client ON order_details.ord_det_CID = client.CID WHERE ord_det_code LIKE 'SS%' ".$orderString." LIMIT ".$rowsReq." OFFSET ".$start;
	}
	$getAllSellsInvoicesQuerySQL = mysqli_query(openConn(),$getAllSellsInvoicesQuery); 
	$rowsCountFilter = mysqli_num_rows($getAllSellsInvoicesQuerySQL);
	$jsonData="";
	if($getAllSellsInvoicesQuerySQL){
		while ($row=mysqli_fetch_assoc($getAllSellsInvoicesQuerySQL)){
			if($row != NULL){
				if($jsonData != ""){
					$jsonData = $jsonData . ",";
				}
				$jsonData = $jsonData . '{"ODID":"' . $row['ODID'] . '",';
				$jsonData = $jsonData . '"ord_det_code":"' . $row['ord_det_code'] . '",';
				$jsonData = $jsonData . '"ord_det_date":"' . $row['ord_det_date'] . '",';
				$jsonData = $jsonData . '"client_fullName":"' . $row['client_fullName'] . '",';
				$jsonData = $jsonData . '"ord_det_total_price":"' . $row['ord_det_total_price'] . '",';
				$jsonData = $jsonData . '"ord_det_rem_amount":"' . $row['ord_det_rem_amount'] . '"}';
			}
		}
	}
	$jsonData = '[' . $jsonData . ']';
	$jsonData2='{"draw":'.intval($requestData['draw']).',"recordsTotal":'.$rowsCount.', "recordsFiltered":'.$rowsCount.', "data":'.$jsonData.'}';
	echo ($jsonData2);
}
function sellsInvoiceHeader(){ // checked
	$id = $_GET['id'];
	$getSellsInvoiceHeaderQuery="SELECT order_details.ord_det_code ,order_details.ord_det_date ,order_details.ord_det_total_price,(order_details.ord_det_total_price - order_details.ord_det_rem_amount) as totalPaid, client.client_fullName,client.client_phone FROM order_details LEFT JOIN client on order_details.ord_det_CID = client.CID WHERE order_details.ODID = ".$id;
	$getSellsInvoiceHeaderQuerySQL=mysqli_query(openConn(),$getSellsInvoiceHeaderQuery);
	$jsonData = "";
	if($getSellsInvoiceHeaderQuerySQL){
		while($row = mysqli_fetch_assoc($getSellsInvoiceHeaderQuerySQL)){	
			if($row != NULL){
				$jsonData = $jsonData . '{"ord_det_code":"' . $row['ord_det_code'] . '",';
				$jsonData = $jsonData . '"ord_det_date":"' . $row['ord_det_date'] . '",';
				$jsonData = $jsonData . '"ord_det_total_price":"' . $row['ord_det_total_price'] . '",';
				$jsonData = $jsonData . '"totalPaid":"' . $row['totalPaid'] . '",';
				$jsonData = $jsonData . '"client_fullName":"' . $row['client_fullName'] . '",';
				$jsonData = $jsonData . '"client_phone":"' . $row['client_phone'] . '"}';			
			}
		}
	}
	echo $jsonData;	
}
function sellsInvoiceDetails(){ //checked
	$id = $_GET['id'];
	$getSellsInvoiceDetailsQuery=" SELECT  item.item_name, order_s.ord_quantity ,order_s.ord_price , (order_s.ord_quantity * order_s.ord_price) as QuanMbyPrice , component.com_capacity,component.com_type FROM order_s  INNER JOIN item on order_s.ord_IID=item.IID INNER JOIN component ON order_s.ord_IID = component.IID where order_s.ord_ODID= ".$id;

	$getSellsInvoiceDetailsQuerySQL=mysqli_query(openConn(),$getSellsInvoiceDetailsQuery);
	$jsonData = "";
	if($getSellsInvoiceDetailsQuerySQL){
		while($row = mysqli_fetch_assoc($getSellsInvoiceDetailsQuerySQL)){	
			if($row != NULL){
				if($jsonData != ""){
					$jsonData = $jsonData . ",";
				}
				$jsonData = $jsonData . '{"item_name":"' . $row['item_name'] . '",';
				$jsonData = $jsonData . '"ord_quantity":"' . $row['ord_quantity'] . '",';
				$jsonData = $jsonData . '"ord_price":"' . $row['ord_price'] . '",';
				$jsonData = $jsonData . '"QuanMbyPrice":"' . $row['QuanMbyPrice'] . '",';
				$jsonData = $jsonData . '"com_type":"' . $row['com_type'] . '",';
				$jsonData = $jsonData . '"com_capacity":"' . $row['com_capacity'] . '"}';			
			}
		}
	}
	$jsonData = '[' . $jsonData . ']';
	echo $jsonData;
}
function sellInvoicesDataTable(){ //checked
	$requestData= $_REQUEST;
	$rowsReq = (isset($_GET['length'])) ? intval($_GET['length']) : 10;
	$start = (isset($_GET['start'])) ? intval($_GET['start']) : 0;
	$rowsCount=mysqli_fetch_assoc(mysqli_query(openConn(),"select COUNT(ODID) as exp from order_details where ord_det_code like 'SL%'"))['exp'];
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
 		$getAllSellsInvoicesQuery=" SELECT order_details.ODID ,order_details.ord_det_code ,order_details.ord_det_date ,client.client_fullName ,order_details.ord_det_total_price,order_details.ord_det_rem_amount FROM order_details  LEFT JOIN client ON order_details.ord_det_CID = client.CID WHERE ord_det_code LIKE 'SL%' AND order_details.ord_det_code like '%".$search."%' OR order_details.ord_det_date like '%".$search."%' OR client.client_fullName like '%".$search."%'".$orderString." LIMIT ".$rowsReq." OFFSET ".$start;
	}
	else
	{
		$getAllSellsInvoicesQuery=" SELECT order_details.ODID ,order_details.ord_det_code ,order_details.ord_det_date ,client.client_fullName ,order_details.ord_det_total_price,order_details.ord_det_rem_amount FROM order_details  LEFT JOIN client ON order_details.ord_det_CID = client.CID WHERE ord_det_code LIKE 'SL%' ".$orderString." LIMIT ".$rowsReq." OFFSET ".$start;
	}
	$getAllSellsInvoicesQuerySQL = mysqli_query(openConn(),$getAllSellsInvoicesQuery); 
	$rowsCountFilter = mysqli_num_rows($getAllSellsInvoicesQuerySQL);
	$jsonData="";
	if($getAllSellsInvoicesQuerySQL){
		while ($row=mysqli_fetch_assoc($getAllSellsInvoicesQuerySQL)){
			if($row != NULL){
				if($jsonData != ""){
					$jsonData = $jsonData . ",";
				}
				$jsonData = $jsonData . '{"ODID":"' . $row['ODID'] . '",';
				$jsonData = $jsonData . '"ord_det_code":"' . $row['ord_det_code'] . '",';
				$jsonData = $jsonData . '"ord_det_date":"' . $row['ord_det_date'] . '",';
				$jsonData = $jsonData . '"client_fullName":"' . $row['client_fullName'] . '",';
				$jsonData = $jsonData . '"ord_det_total_price":"' . $row['ord_det_total_price'] . '",';
				$jsonData = $jsonData . '"ord_det_rem_amount":"' . $row['ord_det_rem_amount'] . '"}';
			}
		}
	}
	$jsonData = '[' . $jsonData . ']';
	$jsonData2='{"draw":'.intval($requestData['draw']).',"recordsTotal":'.$rowsCount.', "recordsFiltered":'.$rowsCount.', "data":'.$jsonData.'}';
	echo ($jsonData2);
}
function sellInvoiceDetails(){ //checked
	$id = $_GET['id'];
	$getSellsInvoiceDetailsQuery=" SELECT  order_s.ord_k_name, order_s.ord_quantity ,order_s.ord_price , (order_s.ord_quantity * order_s.ord_price) as QuanMbyPrice  FROM order_s where order_s.ord_ODID= ".$id;

	$getSellsInvoiceDetailsQuerySQL=mysqli_query(openConn(),$getSellsInvoiceDetailsQuery);
	$jsonData = "";
	if($getSellsInvoiceDetailsQuerySQL){
		while($row = mysqli_fetch_assoc($getSellsInvoiceDetailsQuerySQL)){	
			if($row != NULL){
				if($jsonData != ""){
					$jsonData = $jsonData . ",";
				}
				$jsonData = $jsonData . '{"name":"' . $row['ord_k_name'] . '",';
				$jsonData = $jsonData . '"quantity":"' . $row['ord_quantity'] . '",';
				$jsonData = $jsonData . '"price":"' . $row['ord_price'] . '",';
				$jsonData = $jsonData . '"totalPrice":"' . $row['QuanMbyPrice'] . '"}';			
			}
		}
	}
	$jsonData = '[' . $jsonData . ']';
	echo $jsonData;
}
function removeFacture(){
	$id=$_GET['id'];
	// $deleteOrderQuery="DELETE FROM order_s WHERE ord_ODID=".$id;
	// file_put_contents("text11.txt", $jsonData);
	// mysqli_query(openConn(),$deleteOrderQuery);
	$deleteOrderDetailsQuery="DELETE FROM order_details WHERE ODID=".$id;
	mysqli_query(openConn(),$deleteOrderDetailsQuery);
	$msg='إلغاء';
	echo '{"msg":"'.$msg.'"}';
}
function removeFactureSupply(){//checked
	$id=$_GET['id'];
	$getSupplyInvoiceItemsQuery=" select sup_IID,sup_quan from supply where sup_SDID = ".$id;
	$getSupplyInvoiceItemsQuery = mysqli_query(openConn(),$getSupplyInvoiceItemsQuery);
	$updateComponentQuan="";
	$con = openConn();
	if($getSupplyInvoiceItemsQuery){
		while($row = mysqli_fetch_assoc($getSupplyInvoiceItemsQuery)){	
			if($row != NULL){

				$updateComponentQuan="UPDATE component SET com_quan = com_quan - ".$row['sup_quan']." WHERE IID = ".$row['sup_IID'];
				mysqli_query($con,$updateComponentQuan);
						
			}
		}
	}
	$deleteQuery="DELETE FROM supply WHERE sup_SDID=".$id;
	mysqli_query(openConn(),$deleteQuery);
	$deleteQuery="DELETE FROM supply_detail WHERE SDID=".$id;
	mysqli_query(openConn(),$deleteQuery);
	echo "{}";
}
?>



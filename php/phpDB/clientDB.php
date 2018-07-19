<?php 
function addSupplier(){
    $jsonData = $_GET['supplierInfo'];
	$supplierInfo = json_decode($jsonData,true);
	$addSupplierSQL = "INSERT INTO supplier (`supplier_name`, `supplier_phone`, `supplier_address`, `supplier_debit`) VALUES ( '".$supplierInfo[0]['Name']."','".$supplierInfo[0]['Phone']."' , '".$supplierInfo[0]['Address']."',".intval($supplierInfo[0]['debit']).")";
	mysqli_query(openConn(), $addSupplierSQL);
	echo "{}";
}
function addClient(){
    $jsonData = $_GET['clientInfo'];
	$clientInfo = json_decode($jsonData,true);
	$addClientQuery = "INSERT INTO client (`client_fullName`, `client_phone`, `client_address`,`client_debit`) VALUES ( '".$clientInfo[0]['Name']."','".$clientInfo[0]['Phone']."' , '".$clientInfo[0]['Address']."',0)";
	mysqli_query(openConn(), $addClientQuery); 
	echo "{}";
}
function getAllClients(){
	$requestData= $_REQUEST;
	$rowsReq = (isset($_GET['length'])) ? intval($_GET['length']) : 10;
	$start = (isset($_GET['start'])) ? intval($_GET['start']) : 0;
	$rowsCount=mysqli_fetch_assoc(mysqli_query(openConn(),"select COUNT(CID) as exp from client"))['exp'];
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
 		$getAllClientsQuery=" SELECT * FROM client where client_fullName like '%".$search."%' OR client_phone like '%".$search."%'".$orderString." LIMIT ".$rowsReq." OFFSET ".$start;
	}
	else
	{
		$getAllClientsQuery=" SELECT * FROM client ".$orderString." LIMIT ".$rowsReq." OFFSET ".$start;
	}
	$getAllClientsQuerySQL = mysqli_query(openConn(),$getAllClientsQuery); 
	$rowsCountFilter = mysqli_num_rows($getAllClientsQuerySQL);
	$jsonData="";
	if($getAllClientsQuerySQL){
		while ($row=mysqli_fetch_assoc($getAllClientsQuerySQL)){
			if($row != NULL){
				if($jsonData != ""){
					$jsonData = $jsonData . ",";
				}
				$jsonData = $jsonData . '{"CID":"' . $row['CID'] . '",';
				$jsonData = $jsonData . '"client_fullName":"' . $row['client_fullName'] . '",';
				$jsonData = $jsonData . '"client_phone":"' . $row['client_phone'] . '",';
				$jsonData = $jsonData . '"client_address":"' . $row['client_address'] . '",';
				$jsonData = $jsonData . '"client_debit":"' . $row['client_debit'] . '"}';
			}
		}
	}
	$jsonData = '[' . $jsonData . ']';
	$jsonData2='{"draw":'.intval($requestData['draw']).',"recordsTotal":'.$rowsCount.', "recordsFiltered":'.$rowsCount.', "data":'.$jsonData.'}';
	echo ($jsonData2);
}
function removeClient(){
	$id=$_GET['id'];
	$checkClientInvoicesQuery="SELECT COUNT(ord_det_CID) as exp FROM order_details WHERE ord_det_CID =".$id." ";
	$result=mysqli_query(openConn(),$checkClientInvoicesQuery);
	$row=mysqli_fetch_assoc($result);
	$count = $row['exp'];
	$msg='';
	if($count>0) // >0 client has invoices
	{
		$msg='this client has invoices';
	}
	else
	{
		$deleteClientQuery="DELETE FROM client WHERE CID=".$id;
		mysqli_query(openConn(),$deleteClientQuery);
		$msg='deleted';
	}
	echo '{"msg":"'.$msg.'"}';
}
function getClientByID(){
	$id=$_GET['id'];
	$getClientInfoSQL="SELECT *  FROM client WHERE CID = ".$id."";
	$getClientInfoSQLQuery = mysqli_query(openConn(), $getClientInfoSQL);
	$jsonData = "";
	if($getClientInfoSQLQuery){
		$row=mysqli_fetch_assoc($getClientInfoSQLQuery);
		if($row != NULL){
			if($jsonData != ""){
				$jsonData = $jsonData . ",";
			}
			$jsonData = $jsonData . '{"id":"' . $row['CID'] . '",';
			$jsonData = $jsonData . '"name":"' . $row['client_fullName'] . '",';
			$jsonData = $jsonData . '"phone":"' . $row['client_phone'] . '",';
			$jsonData = $jsonData . '"address":"' . $row['client_address'] . '"}';	
			}
		
		$jsonData = '[' . $jsonData . ']';
	}
	echo $jsonData;
}
function updateClient(){
	$jsonData = $_GET['clientInfo'];
	$clientInfo = json_decode($jsonData,true);
	$updateClientInfoQuery=" UPDATE client SET client_fullName='".$clientInfo[0]['name']."',client_phone='".$clientInfo[0]['phone']."',client_address='".$clientInfo[0]['address']."' WHERE CID=".$clientInfo[0]['id'];
	mysqli_query(openConn(),$updateClientInfoQuery);
	echo "{}";
}
function updateSupplier(){
	$jsonData = $_GET['supplierInfo'];
	$supplierInfoEdit = json_decode($jsonData,true);
	$updateSupplierInfoQuery=" UPDATE supplier SET supplier_name='".$supplierInfoEdit[0]['name']."',supplier_phone='".$supplierInfoEdit[0]['phone']."',supplier_address='".$supplierInfoEdit[0]['address']."',supplier_debit = ".floatval($supplierInfoEdit[0]['debit']) ." WHERE SRID=".$supplierInfoEdit[0]['id'];
	mysqli_query(openConn(),$updateSupplierInfoQuery);
	echo "{}";
}
function getAllSuppliers(){
	$requestData= $_REQUEST;
	$rowsReq = (isset($_GET['length'])) ? intval($_GET['length']) : 10;
	$start = (isset($_GET['start'])) ? intval($_GET['start']) : 0;
	$rowsCount=mysqli_fetch_assoc(mysqli_query(openConn(),"select COUNT(SRID) as exp from supplier"))['exp'];
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
 		$getAllClientsQuery=" SELECT * FROM supplier where supplier_name like '%".$search."%' OR supplier_phone like '%".$search."%'".$orderString." LIMIT ".$rowsReq." OFFSET ".$start;
	}
	else
	{
		$getAllClientsQuery=" SELECT * FROM supplier ".$orderString." LIMIT ".$rowsReq." OFFSET ".$start;
	}
	$getAllClientsQuerySQL = mysqli_query(openConn(),$getAllClientsQuery); 
	$rowsCountFilter = mysqli_num_rows($getAllClientsQuerySQL);
	$jsonData="";
	if($getAllClientsQuerySQL){
		while ($row=mysqli_fetch_assoc($getAllClientsQuerySQL)){
			if($row != NULL){
				if($jsonData != ""){
					$jsonData = $jsonData . ",";
				}
				$jsonData = $jsonData . '{"SRID":"' . $row['SRID'] . '",';
				$jsonData = $jsonData . '"supplier_name":"' . $row['supplier_name'] . '",';
				$jsonData = $jsonData . '"supplier_phone":"' . $row['supplier_phone'] . '",';
				$jsonData = $jsonData . '"supplier_address":"' . $row['supplier_address'] . '",';
				$jsonData = $jsonData . '"supplier_debit":"' . $row['supplier_debit'] . '"}';
			}
		}
	}
	$jsonData = '[' . $jsonData . ']';
	$jsonData2='{"draw":'.intval($requestData['draw']).',"recordsTotal":'.$rowsCount.', "recordsFiltered":'.$rowsCount.', "data":'.$jsonData.'}';
	echo ($jsonData2);
}
function removeSupplier(){
	$id=$_GET['id'];
	$count = mysqli_fetch_assoc(mysqli_query(openConn(),"SELECT COUNT(sup_det_SRID) as exp FROM supply_detail WHERE sup_det_SRID =".$id))['exp'];
	$msg='';
	if($count>0) // >0 supplier has invoices
	{
		$msg='this supplier has invoices';
	}
	else
	{
		$deleteSupplierQuery="DELETE FROM supplier WHERE SRID=".$id;
		mysqli_query(openConn(),$deleteSupplierQuery);
		$msg='deleted';
	}
	echo '{"msg":"'.$msg.'"}';
}
function getSupplierByID(){
	$id=$_GET['id'];
	$getSupplierInfoQuery="SELECT *  FROM supplier WHERE SRID = ".$id;
	$getSupplierInfoQuerySQL = mysqli_query(openConn(), $getSupplierInfoQuery);
	$jsonData = "";
	if($getSupplierInfoQuerySQL){
		$row=mysqli_fetch_assoc($getSupplierInfoQuerySQL);
		if($row != NULL){
			if($jsonData != ""){
				$jsonData = $jsonData . ",";
			}
			$jsonData = $jsonData . '{"id":"' . $row['SRID'] . '",';
			$jsonData = $jsonData . '"name":"' . $row['supplier_name'] . '",';
			$jsonData = $jsonData . '"phone":"' . $row['supplier_phone'] . '",';
			$jsonData = $jsonData . '"address":"' . $row['supplier_address'] . '",';
			$jsonData = $jsonData . '"debit":"' . $row['supplier_debit'] . '"}';	
			}
		
		$jsonData = '[' . $jsonData . ']';
	}
	echo $jsonData;
}

function getSearchClient(){
	$clientName=$_GET['clientName'];

	$getSearchClientQuery="SELECT CID,client_fullName,client_phone FROM client WHERE client_fullName LIKE  '".$clientName."%' OR client_fullName LIKE '% ".$clientName."%'";

	$getSearchClientQuerySQL=mysqli_query(openConn(),$getSearchClientQuery);
	$jsonData = "";
	if($getSearchClientQuerySQL){
		while($row = mysqli_fetch_assoc($getSearchClientQuerySQL)){	
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
function getSearchSupplier(){
	$supplierName=$_GET['supplierName'];

	$getSearchsupplierQuery="SELECT SRID,supplier_name FROM supplier WHERE supplier_name LIKE  '".$supplierName."%' OR supplier_name LIKE '% ".$supplierName."%'";

	$getSearchsupplierQuerySQL=mysqli_query(openConn(),$getSearchsupplierQuery);
	$jsonData = "";
	if($getSearchsupplierQuerySQL){
		while($row = mysqli_fetch_assoc($getSearchsupplierQuerySQL)){	
			if($row != NULL){
				if($jsonData != ""){
					$jsonData = $jsonData . ",";
				}
				$jsonData = $jsonData . '{"id":"' . $row['SRID'] . '",';
				$jsonData = $jsonData . '"name":"' . $row['supplier_name'] . '"}';			
			}
		}
		$jsonData = '[' . $jsonData . ']';
	}
			// file_put_contents("wwwSupplier.txt",$jsonData);
	echo $jsonData;
}
?>
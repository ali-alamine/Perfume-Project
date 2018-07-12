<?php
function drawerDataTable(){
	$requestData= $_REQUEST;
	$rowsReq = (isset($_GET['length'])) ? intval($_GET['length']) : 10;
	$start = (isset($_GET['start'])) ? intval($_GET['start']) : 0;
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
 		$getAllClientsQuery=" select * from drawer where drawer_Date like '%".$search."%' ".$orderString." LIMIT ".$rowsReq." OFFSET ".$start;
	}
	else
	{
		$getAllClientsQuery=" select * from drawer ".$orderString." LIMIT ".$rowsReq." OFFSET ".$start;
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
				$jsonData = $jsonData . '{"drawer_Date":"' . $row['drawer_Date'] . '",';
				$jsonData = $jsonData . '"drawer_total_withdraw":"' . $row['drawer_total_withdraw'] . '",';
				$jsonData = $jsonData . '"drawer_total_return":"' . $row['drawer_total_return'] . '",';
				$jsonData = $jsonData . '"drawer_profit_total":"' . $row['drawer_profit_total'] . '",';
				$jsonData = $jsonData . '"drawer_sell_total":"' . $row['drawer_sell_total'] . '"}';
			}
		}
	}
	$jsonData = '[' . $jsonData . ']';
	$jsonData2='{"draw":'.intval($requestData['draw']).',"recordsTotal":'.$rowsCountFilter.', "recordsFiltered":'.$rowsCountFilter.', "data":'.$jsonData.'}';
	echo ($jsonData2);
} 
function returnAmount(){
	$clientId=$_GET['clientId'];
	$amount=$_GET['amount'];
    $reason=$_GET['reason'];

	$addReturnAmountQuery="INSERT INTO drawer_operation ( drawer_op_day, drawer_op_type, drawer_op_amount, drawer_op_reason) VALUES ( CURDATE(), 'return',".$amount.",'".$reason."')";

    $addReturnAmountQuerySQL = mysqli_query(openConn(),$addReturnAmountQuery);

    $updateTotalDrawerQuery="UPDATE drawer SET drawer_total_return = drawer_total_return + ".$amount.", drawer_total=drawer_total + ".$amount." WHERE drawer_Date= CURDATE() ";

    $updateTotalDrawerQuerySQL = mysqli_query(openConn(),$updateTotalDrawerQuery);
    
    $updateClientDebitQuery="UPDATE client SET client_debit = client_debit - '".$amount."' WHERE CID =".$clientId;

	mysqli_query(openConn(),$updateClientDebitQuery);
	
	echo "{}";
}
function withdrawalAmount(){
	$amount=$_GET['amount'];
    $reason=$_GET['reason'];

	$addWithdrawalAmountQuery="INSERT INTO drawer_operation ( drawer_op_day,drawer_op_amount, drawer_op_type, drawer_op_reason) VALUES( CURDATE() ,".$amount.",'withdrawal','".$reason."')";

    mysqli_query(openConn(),$addWithdrawalAmountQuery);

    $updateTotalDrawerQuery="UPDATE drawer SET drawer_total_withdraw = drawer_total_withdraw + ".$amount.", drawer_total=drawer_total - ".$amount." WHERE drawer_Date= CURDATE() ";

    mysqli_query(openConn(),$updateTotalDrawerQuery);
	echo "{}";
}
function getDrawerDetailsByDate(){

	$dateD=$_GET['dateD'];

	$getDetailDayAmountQuery="select * from drawer_operation where drawer_operation.drawer_op_day = '".$dateD."' ";
	$getDetailDayAmountQuerySQL=mysqli_query(openConn(),$getDetailDayAmountQuery);
	$jsonData = "";
	if($getDetailDayAmountQuerySQL){
		while($row = mysqli_fetch_assoc($getDetailDayAmountQuerySQL)){	
			if($row != NULL){
				if($jsonData != ""){
					$jsonData = $jsonData . ",";
				}
				$jsonData = $jsonData . '{"type":"' . $row['drawer_op_type'] . '",';			
				$jsonData = $jsonData . '"amount":"' . ROUND($row['drawer_op_amount'],2) . '",';				
				$jsonData = $jsonData . '"reason":"' . $row['drawer_op_reason'] . '"}';			
			}
		}
	}

	$getDetailDayAmountQuery="select (ord_det_total_price - ord_det_rem_amount) as amount from order_details where ord_det_date = '".$dateD."' ";
	$getDetailDayAmountQuerySQL=mysqli_query(openConn(),$getDetailDayAmountQuery);

	if($getDetailDayAmountQuerySQL){
		while($row = mysqli_fetch_assoc($getDetailDayAmountQuerySQL)){	
			if($row != NULL){
				if($jsonData != ""){
					$jsonData = $jsonData . ",";
				}
				$jsonData = $jsonData . '{"type":"sell",';			
				$jsonData = $jsonData . '"amount":"' . ROUND($row['amount'],2) . '",';				
				$jsonData = $jsonData . '"reason":""}';			
			}
		}
	}

	$jsonData = '[' . $jsonData . ']';
	echo $jsonData;
}
function getDrawerHeaderByDate(){

	$dateD=$_GET['dateD'];

	$getDrawerHeaderByDateQuery="select * from drawer where drawer_Date = '".$dateD."' ";

	$getDrawerHeaderByDateQuerySQL=mysqli_query(openConn(),$getDrawerHeaderByDateQuery);
	$jsonData = "";
	if($getDrawerHeaderByDateQuerySQL){
		while($row = mysqli_fetch_assoc($getDrawerHeaderByDateQuerySQL)){	
			if($row != NULL){
				if($jsonData != ""){
					$jsonData = $jsonData . ",";
				}

				if($row['drawer_isWD']==0)
					$row['drawer_isWD']="غير مسحوب";
				else
					$row['drawer_isWD']='مسحوب';
				$jsonData = $jsonData . '{"totalSell":"' . $row['drawer_sell_total'] . '",';	
				$jsonData = $jsonData . '"totalProfit":"' . $row['drawer_profit_total'] . '",';
				$jsonData = $jsonData . '"totalWD":"' . $row['drawer_total_withdraw'] . '",';
				$jsonData = $jsonData . '"totalReturn":"' . $row['drawer_total_return'] . '",';
				$jsonData = $jsonData . '"isWD":"' . $row['drawer_isWD'] . '",';
				$jsonData = $jsonData . '"totalDrawer":"' . $row['drawer_total'] . '"}';
			}
		}
		$jsonData = '[' . $jsonData . ']';
	}

	echo $jsonData;
}

function withdrawalTotalDrawer(){
	$updateWithdrawalTotalDrawerQuery="UPDATE drawer SET drawer_isWD = 1 WHERE drawer_Date= CURDATE() ";
    mysqli_query(openConn(),$updateWithdrawalTotalDrawerQuery);
	echo "{}";
}

function getTodayTotalDrawer(){

	$getTodayTotalDrawerQuery="SELECT drawer_total , drawer_isWD FROM drawer WHERE drawer_Date = CURDATE()";

    $getTodayTotalDrawerQuerySQL=mysqli_query(openConn(),$getTodayTotalDrawerQuery);
    $jsonData = "";

    if($getTodayTotalDrawerQuerySQL){

    	$row = mysqli_fetch_assoc($getTodayTotalDrawerQuerySQL);
    	if($row['drawer_isWD']==1)
    		$row['drawer_total']=0;
    	$jsonData = $jsonData . '{"total":"' . $row['drawer_total'] . '"}';

    }
	echo $jsonData;	
}

function todayCheck(){
	$count = mysqli_fetch_assoc(mysqli_query(openConn(),"SELECT count(`drawer_Date`) as exp from drawer WHERE drawer_Date=CURDATE()"))['exp'];

	if($count==0)
	{
		$checkIfWDQuery = "SELECT drawer_isWD,drawer_total from drawer where drawer_Date = (SELECT MAX(drawer_Date) from drawer)";

		$checkIfWDQuerySQL=mysqli_query(openConn(),$checkIfWDQuery);

		$row = mysqli_fetch_assoc($checkIfWDQuerySQL);

		if($row['drawer_isWD']==1)
			$row['drawer_total']=0;

		$total = $row['drawer_total'];

		$insertNewDateQuery="INSERT into drawer(drawer_Date,drawer_total) VALUES(CURDATE(),".$total.")";

    	$insertNewDateQuerySQL=mysqli_query(openConn(),$insertNewDateQuery);
	}
	echo "{}";
}
?>
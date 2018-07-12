<?php
include('phpDB/connection.php');
include('phpDB/stockDB.php');
$function = $_GET['function'];
switch($function){
	case 'essenceDataTable' :
        openConn();
        essenceDataTable();
        closeConn();
    break;
    case 'bottleDataTable' :
        openConn();
        bottleDataTable();
        closeConn();
    break;
    case 'accDataTable' :
        openConn();
        accDataTable();
        closeConn();
    break;
    case 'editEssence' :
        openConn();
        editEssence();
        closeConn();
    break;
    case 'editBottle' :
        openConn();
        editBottle();
        closeConn();
    break;
    case 'editAcc' :
        openConn();
        editAcc();
        closeConn();
    break;
    
};
?>
<?php
include('phpDB/connection.php');
include('phpDB/supplyDB.php');
$function = $_GET['function'];
switch($function){
    case 'addEssence' :
		openConn();
        addEssence();
        closeConn();
        break;
	case 'addBottleType' :
		openConn();
        addBottleType();
        closeConn();
        break;
	case 'addAccessories' :
		openConn();
        addAccessories();
        closeConn();
        break;
    case 'addSupplyItems' :
        openConn();
        addSupplyItems();
        closeConn();
        break;
    case 'addSupplyAccessories' :
        openConn();
        addSupplyAccessories();
        closeConn();
        break;
    case 'displaySupplyCodeToBe' :
        openConn();
        displaySupplyCodeToBe();
        closeConn();
        break;
};
?>
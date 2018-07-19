<?php

include('phpDB/connection.php');
include('phpDB/damageDB.php');

$function = $_GET['function'];

switch($function){
    case 'searchBottle' :
        openConn();
        searchBottle();
        closeConn();
        break;
    case 'searchAccessory' :
        openConn();
        searchAccessory();
        closeConn();
        break;
    case 'getQuantityAlcohol' :
        openConn();
        getQuantityAlcohol();
        closeConn();
        break;
    case 'damageEssence' :
        openConn();
        damageEssence();
        closeConn();
        break;
    case 'damageAlcohol' :
		openConn();
        damageAlcohol();
        closeConn();
        break;
    case 'damageBottle' :
		openConn();
        damageBottle();
        closeConn();
        break;
    case 'damageItem' :
        openConn();
        damageItem();
        closeConn();
        break;
    case 'searchEssence' :
        openConn();
        searchEssence();
        closeConn();
    break;
        
};
?>
<?php

include('phpDB/connection.php');
include('phpDB/damageDB.php');

$function = $_GET['function'];

switch($function){
    case 'getAllEssence' :
		openConn();
        getAllEssence();
        closeConn();
        break;
    case 'getAllBottle' :
        openConn();
        getAllBottle();
        closeConn();
        break;
    case 'getAllAcc' :
        openConn();
        getAllAcc();
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
        
};
?>
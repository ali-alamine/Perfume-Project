<?php
include('phpDB/connection.php');
include('phpDB/getAllDB.php');
$function = $_GET['function'];
switch($function){
    case 'getAllEssence' :
        openConn();
        getAllEssence();
        closeConn();
    break;
    case 'getAlcohol' :
        openConn();
        getAlcohol();
        closeConn();
    break;
    case 'getAllBottle' :
        openConn();
        getAllBottle();
        closeConn();
    break;
    case 'getAllAccessories' :
        openConn();
        getAllAccessories();
        closeConn();
    break;
    case 'getAllClient' :
        openConn();
        getAllClient();
        closeConn();
    break;
    case 'getAllSupplier' :
        openConn();
        getAllSupplier();
        closeConn();
    break;
    case 'getAllPerfume' :
        openConn();
        getAllPerfume();
        closeConn();
    break;
};
?>
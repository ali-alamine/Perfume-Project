<?php
include('phpDB/connection.php');
include('phpDB/sellDB.php');
$function = $_GET['function'];
switch($function){
    case 'getAllItem' :
        openConn();
        getAllItem();
        closeConn();
    break;
    case 'getAllSupplier' :
        openConn();
        getAllSupplier();
        closeConn();
    break;
    case 'addFactureSell' :
        openConn();
        addFactureSell();
        closeConn();
    break;
    case 'addOrderSells' :
        openConn();
        addOrderSells();
        closeConn();
    break;
    case 'displayFactureCodeToBe' :
        openConn();
        displayFactureCodeToBe();
        closeConn();
    break;
    case 'getSearchPerfume':
        openConn();
        getSearchPerfume();
        closeConn();
    break;
    case 'getAccessories':
        openConn();
        getAccessories();
        closeConn();
    break;
};
?>
<?php
include('phpDB/connection.php');
include('phpDB/historyDB.php');
$function = $_GET['function'];
switch($function){
    case 'supplyInvoicesDataTable' :
        openConn();
        supplyInvoicesDataTable();
        closeConn();
    break;
    case 'supplyinvoiceHeader' :
        openConn();
        supplyinvoiceHeader();
        closeConn();
    break;
    case 'accSupplyInvoiceDetails' :
        openConn();
        accSupplyInvoiceDetails();
        closeConn();
    break;
    case 'itemsSupplyInvoiceDetails' :
        openConn();
        itemsSupplyInvoiceDetails();
        closeConn();
    break;
    case 'sellsInvoicesDataTable' :
        openConn();
        sellsInvoicesDataTable();
        closeConn();
    break;
    case 'sellsInvoiceHeader' :
        openConn();
        sellsInvoiceHeader();
        closeConn();
    break;
    case 'sellsInvoiceDetails' :
        openConn();
        sellsInvoiceDetails();
        closeConn();
    break;
     case 'sellInvoicesDataTable' :
        openConn();
        sellInvoicesDataTable();
        closeConn();
    break;
    case 'sellInvoiceDetails' :
        openConn();
        sellInvoiceDetails();
        closeConn();
    break;
    case 'removeFacture' :
        openConn();
        removeFacture();
        closeConn();
    break;
};
?>
<?php
include('phpDB/connection.php');
include('phpDB/clientDB.php');
$function = $_GET['function'];
switch($function){
    case 'addClient' :
		openConn();
        addClient();
        closeConn();
    break;
    case 'addSupplier' :
        openConn();
        addSupplier();
        closeConn();
    break;
    case 'getAllClients':
        openConn();
        getAllClients();
        closeConn();
    break;
    case 'getAllSuppliers':
        openConn();
        getAllSuppliers();
        closeConn();
    break;
	case 'getClient' :
		openConn();
        getClient();
        closeConn();
    break;
	case 'updateClient' :
		openConn();
        updateClient();
        closeConn();
    break;
	case 'removeClient' :
		openConn();
        removeClient();
        closeConn();
    break;
    case 'removeSupplier' :
        openConn();
        removeSupplier();
        closeConn();
    break;
    case 'getClientByID' :
        openConn();
        getClientByID();
        closeConn();
    break;
    case 'getSupplierByID' :
        openConn();
        getSupplierByID();
        closeConn();
    break;
    case 'updateSupplier' :
        openConn();
        updateSupplier();
        closeConn();
    break;
    case 'getSearchClient' :
        openConn();
        getSearchClient();
        closeConn();
    break;


	
    
};
?>


<?php
include('phpDB/connection.php');
include('phpDB/drawerDB.php');
$function = $_GET['function'];
switch($function){
     case 'drawerDataTable' :
        openConn();
        drawerDataTable();
        closeConn();
    break;
    case 'getAllAmount' :
        openConn();
        getAllAmount();
        closeConn();
    break;
    case 'returnAmount' :
        openConn();
        returnAmount();
        closeConn();
    break;
    case 'withdrawalAmount' :
        openConn();
        withdrawalAmount();
        closeConn();
    break;
    case 'getTotalDrawer' :
        openConn();
        getTotalDrawer();
        closeConn();
    break;
    case 'getDetailDayAmount' :
        openConn();
        getDetailDayAmount();
        closeConn();
    break;
    case 'withdrawalTotalDrawer' :
        openConn();
        withdrawalTotalDrawer();
        closeConn();
    break;
    case 'checkTotalDrawer':
        openConn();
        checkTotalDrawer();
        closeConn();
    break;
    case 'addTotalDrawer':
        openConn();
        addTotalDrawer();
        closeConn();
    break;
    case 'getSearchDate':
        openConn();
        getSearchDate();
        closeConn();
    break;
    case 'getDrawerHeaderByDate' :
        openConn();
        getDrawerHeaderByDate();
        closeConn();
    break;
    case 'getDrawerDetailsByDate' :
        openConn();
        getDrawerDetailsByDate();
        closeConn();
    break;
    case 'getTodayTotalDrawer' :
        openConn();
        getTodayTotalDrawer();
        closeConn();
    break;
    case 'todayCheck' :
        openConn();
        todayCheck();
        closeConn();
    break;
};
?>
<?php
include('phpDB/connection.php');
include('phpDB/definitionPerfumeDB.php');
$function = $_GET['function'];
switch($function){
    case 'addDefPer' :
        openConn();
        addDefPer();
        closeConn();
        break;
    case 'perfumeDefintionDataTable' :
        openConn();
        perfumeDefintionDataTable();
        closeConn();
        break;
    case 'updateDefPer' :
        openConn();
        updateDefPer();
        closeConn();
        break;
    case 'getAlcInfo' :
        openConn();
        getAlcInfo();
        closeConn();
        break;
    case 'disableDefPerfume' :
        openConn();
        disableDefPerfume();
        closeConn();
        break;
    case 'getPerfumeForEdit' :
        openConn();
        getPerfumeForEdit();
        closeConn();
        break;
};
?>
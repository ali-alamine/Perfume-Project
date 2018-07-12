<?php
include('phpDB/connection.php');
include('phpDB/totalDrawerDB.php');
$function = $_GET['function'];
    // file_put_contents("WWWWttttyyyyxxx.txt",$function);
switch($function){
    case 'addTotalDrawer' :
        openConn();
        addTotalDrawer();
        closeConn();
        break;
    case 'checkNewDate' :
        openConn();
        checkNewDate();
        closeConn();
        break;
};
?>
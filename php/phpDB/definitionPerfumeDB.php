<?php
function addDefPer(){

    $jsonData = $_GET['defPerfumeInfo'];

    $defPefumeInfo = json_decode($jsonData,true);

    $addDefPerfumeSQL = "INSERT INTO item (`item_name`, `item_cost`, `item_selling`) VALUES ( '".$defPefumeInfo[0]['item_name']."',".doubleval($defPefumeInfo[0]['item_cost'])." , ".doubleval($defPefumeInfo[0]['item_selling']).")";

    $openConn=openConn();
    mysqli_query($openConn, $addDefPerfumeSQL);
    $id=mysqli_insert_id($openConn);
    if($defPefumeInfo[0]['item_e2_IID'] == ' ')  // insert one essence 
    {
        $addDefPerfumeDetailsSQL = "INSERT INTO `definition_perfume` (`item_IID`, `item_b_IID`, `item_e1_IID`, `item_quan_e1`, `item_quan_a`) VALUES (".$id.",".$defPefumeInfo[0]['item_b_IID']." ,".$defPefumeInfo[0]['item_e1_IID'].", ".$defPefumeInfo[0]['item_quan_e1'].",".$defPefumeInfo[0]['item_quan_a'].")";
    }

    else   // insert two essence 
    {
        $addDefPerfumeDetailsSQL = "INSERT INTO `definition_perfume` (`item_IID`, `item_b_IID`, `item_e1_IID`, `item_e2_IID`, `item_quan_e1`, `item_quan_e2`, `item_quan_a`) VALUES(".$id.",".$defPefumeInfo[0]['item_b_IID']." ,".$defPefumeInfo[0]['item_e1_IID'].", ".$defPefumeInfo[0]['item_e2_IID']." , ".$defPefumeInfo[0]['item_quan_e1'].", ".$defPefumeInfo[0]['item_quan_e2']." ,".$defPefumeInfo[0]['item_quan_a'].")";
    }


    mysqli_query($openConn, $addDefPerfumeDetailsSQL);
    echo "{}";
}
function disableDefPerfume(){
    $id=$_GET['id'];
    $removePerfumeQuery="UPDATE definition_perfume SET item_isDeleted = 1 where item_IID= ".$id;
    mysqli_query(openConn(),$removePerfumeQuery);
    echo "{}";
}
function perfumeDefintionDataTable(){
    file_put_contents('queDef.txt', "dddd");
    $requestData= $_REQUEST;
    $rowsReq = (isset($_GET['length'])) ? intval($_GET['length']) : 10;
    $start = (isset($_GET['start'])) ? intval($_GET['start']) : 0;
    $rowsCount=mysqli_fetch_assoc(mysqli_query(openConn(),"select COUNT(item_IID) as exp from definition_perfume where item_isDeleted=0"))['exp'];
    $orderString="";

    if($rowsReq==-1)
    {
        $rowsReq=$rowsCount;
    }
    if(count($_GET['order']))
    {
        $orderBy = $_GET['columns'][$_GET['order'][0]['column']]['data'];
        $orderDir = $_GET['order'][0]['dir'];
        $orderString=" ORDER BY ".$orderBy." ".$orderDir;
    }

    if(isset($_GET["search"]["value"]) && !empty($_GET["search"]["value"]))
    {
        $search = $_GET["search"]["value"];
        $getAllClientsQuery=" SELECT def.item_IID,itemN.item_name,CONCAT( botN.item_name,' | ',botCap.com_capacity ) as bottleName,itemN.item_cost,itemN.item_selling
        FROM definition_perfume AS def INNER JOIN item AS itemN on def.item_IID = itemN.IID INNER JOIN component as botCap on def.item_b_IID = botCap.IID INNER JOIN item as botN on def.item_b_IID = botN.IID where def.item_isDeleted=0  AND itemN.item_name like '%".$search."%'".$orderString." LIMIT ".$rowsReq." OFFSET ".$start;
    }
    else
    {
        $getAllClientsQuery=" SELECT def.item_IID,itemN.item_name,CONCAT( botN.item_name,' | ',botCap.com_capacity ) as bottleName,itemN.item_cost,itemN.item_selling FROM definition_perfume AS def INNER JOIN item AS itemN on def.item_IID = itemN.IID INNER JOIN component as botCap on def.item_b_IID = botCap.IID INNER JOIN item as botN on def.item_b_IID = botN.IID where def.item_isDeleted=0 ".$orderString." LIMIT ".$rowsReq." OFFSET ".$start;
    }

    


    $getAllClientsQuerySQL = mysqli_query(openConn(),$getAllClientsQuery); 
    $rowsCountFilter = mysqli_num_rows($getAllClientsQuerySQL);
    $jsonData="";

    
    if($getAllClientsQuerySQL){
        while ($row=mysqli_fetch_assoc($getAllClientsQuerySQL)){
            if($row != NULL){
                if($jsonData != ""){
                    $jsonData = $jsonData . ",";
                }
                $jsonData = $jsonData . '{"item_IID":"' . $row['item_IID'] . '",';
                $jsonData = $jsonData . '"item_name":"' . $row['item_name'] . '",';
                $jsonData = $jsonData . '"bottleName":"' . $row['bottleName'] . '",';
                $jsonData = $jsonData . '"item_cost":"' . $row['item_cost'] . '",';
                $jsonData = $jsonData . '"item_selling":"' . $row['item_selling'] . '"}';
            }
        }
    }
    $jsonData = '[' . $jsonData . ']';

    $jsonData2='{"draw":'.intval($requestData['draw']).',"recordsTotal":'.$rowsCount.', "recordsFiltered":'.$rowsCount.', "data":'.$jsonData.'}';
    echo ($jsonData2);
}
function getPerfumeForEdit(){
    $id=$_GET['id'];
    $getPerfumeDefInfoSQL="SELECT def.item_IID ,def.item_quan_a, itemEss1.item_name as item_name_ess1,itemEss2.item_name as item_name_ess2,def.item_quan_e1,def.item_quan_e2, CONCAT(botNAME.item_name,' | ',botC.com_capacity) as bottleInfo,itemDet.item_selling , itemDet.item_name,itemDet.item_cost FROM definition_perfume AS def INNER JOIN item as itemDet on def.item_IID = itemDet.IID inner join item as itemEss1 on def.item_e1_IID =itemEss1.IID left  join item as itemEss2 on def.item_e2_IID =itemEss2.IID inner join item as botNAME on def.item_b_IID = botNAME.IID inner join component as botC on def.item_b_IID = botC.IID where def.item_IID = ".$id;
    $getPerfumeInfoSQLQuery = mysqli_query(openConn(), $getPerfumeDefInfoSQL);
    $jsonData = "";
    if($getPerfumeInfoSQLQuery){
        $row=mysqli_fetch_assoc($getPerfumeInfoSQLQuery);
        if($row != NULL){
            if($jsonData != ""){
                $jsonData = $jsonData . ",";
            }
            $jsonData = $jsonData . '{"item_IID":"' . $row['item_IID'] . '",';
            $jsonData = $jsonData . '"item_quan_a":"' . $row['item_quan_a'] . '",';
            $jsonData = $jsonData . '"item_name_ess1":"' . $row['item_name_ess1'] . '",';
            $jsonData = $jsonData . '"item_quan_e1":"' . $row['item_quan_e1'] . '",';
            $jsonData = $jsonData . '"item_name_ess2":"' . $row['item_name_ess2'] . '",';
            $jsonData = $jsonData . '"item_quan_e2":"' . $row['item_quan_e2'] . '",';
            $jsonData = $jsonData . '"item_cost":"' . $row['item_cost'] . '",';
            $jsonData = $jsonData . '"item_name":"' . $row['item_name'] . '",';
            $jsonData = $jsonData . '"bottleInfo":"' . $row['bottleInfo'] . '",';
            $jsonData = $jsonData . '"item_selling":"' . $row['item_selling'] . '"}';  
            }
        
        $jsonData = '[' . $jsonData . ']';
    }

    echo $jsonData;
}

function getAlcInfo(){
    $getAlcQuery="SELECT item.item_cost as item_cost FROM item inner join component on item.IID = component.IID where component.com_type ='alc'";
    $getAlcQuerySQL=mysqli_query(openConn(),$getAlcQuery);
    $jsonData = "";
    if($getAlcQuerySQL){
        while($row = mysqli_fetch_assoc($getAlcQuerySQL)){   
            if($row != NULL){
                if($jsonData != ""){
                    $jsonData = $jsonData . ",";
                }
                $jsonData = $jsonData . '{"alc_cost":"' . $row['item_cost'] . '"}';       
            }
        }
        $jsonData = '[' . $jsonData . ']';
    }
    echo $jsonData;
}



function updateDefPer(){

    $jsonData = $_GET['defPerfumeInfo'];

    $defPefumeInfo = json_decode($jsonData,true);

    $addDefPerfumeSQL = "UPDATE item SET item_name = '".$defPefumeInfo[0]['item_name']."', item_cost= ".doubleval($defPefumeInfo[0]['item_cost'])." , item_selling= ".doubleval($defPefumeInfo[0]['item_selling'])." WHERE IID = ".$defPefumeInfo[0]['item_iid'];

    $openConn=openConn();
    mysqli_query($openConn, $addDefPerfumeSQL);
    
    if($defPefumeInfo[0]['item_e2_IID'] == ' ')  // insert one essence 
    {
        $addDefPerfumeDetailsSQL = "UPDATE definition_perfume SET item_b_IID = ".$defPefumeInfo[0]['item_b_IID'].", item_e1_IID = ".$defPefumeInfo[0]['item_e1_IID']." , item_e2_IID = NULL, item_quan_e1 = ".$defPefumeInfo[0]['item_quan_e1'].", item_quan_e2 = 0, item_quan_a= ".$defPefumeInfo[0]['item_quan_a']." WHERE item_IID = ".$defPefumeInfo[0]['item_iid'];
    }

    else   // insert two essence 
    {
        $addDefPerfumeDetailsSQL = "UPDATE definition_perfume SET item_b_IID = ".$defPefumeInfo[0]['item_b_IID'].", item_e1_IID = ".$defPefumeInfo[0]['item_e1_IID']." , item_e2_IID = ".$defPefumeInfo[0]['item_e2_IID'].", item_quan_e1 = ".$defPefumeInfo[0]['item_quan_e1'].", item_quan_e2 =".$defPefumeInfo[0]['item_quan_e2']." , item_quan_a= ".$defPefumeInfo[0]['item_quan_a']." WHERE item_IID = ".$defPefumeInfo[0]['item_iid'];
    }


    mysqli_query($openConn, $addDefPerfumeDetailsSQL);
    echo "{}";
}
?>
   


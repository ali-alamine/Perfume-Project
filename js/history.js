$(document).ready(function(){
    $("#factureSellTabel").show();
    $(".factureSell").addClass("btn-info");
    $("#factureSellsTabel").hide();
    $("#factureSupplyTabel").hide();
    $("#searchSell").focus();
    $(".factureSell").click(function(){
        $("#factureSellTabel").show(250);
        $("#factureSellsTabel").hide(250);
        $("#factureSupplyTabel").hide(250);
        $(".factureSell").addClass("btn-info");
        $(".factureSells").removeClass("btn-info");
        $(".factureSells").addClass("btn-default");
        $(".factureSupply").removeClass("btn-info");
        $(".factureSupply").addClass("btn-default");
        $("#searchSell").focus(); 
    });
    $(".factureSells").click(function(){
        $("#factureSellsTabel").show(250);
        $("#factureSellTabel").hide(250);
        $("#factureSupplyTabel").hide(250);
        $(".factureSells").addClass("btn-info");
        $(".factureSell").removeClass("btn-info");
        $(".factureSell").addClass("btn-default");
        $(".factureSupply").removeClass("btn-info");
        $(".factureSupply").addClass("btn-default");
        $("#searchSells").focus();
    });
    $(".factureSupply").click(function(){
        $("#factureSellsTabel").hide(250);
        $("#factureSellTabel").hide(250);
        $("#factureSupplyTabel").show(250);
        $(".factureSupply").addClass("btn-info");
        $(".factureSell").removeClass("btn-info");
        $(".factureSell").addClass("btn-default");
        $(".factureSells").removeClass("btn-info");
        $(".factureSells").addClass("btn-default");
        $("#searchSupply").focus();
    });
});
$(function() {
    $("#dialog-factureSell").dialog({
        autoOpen: false,
        maxWidth:1000,
        maxHeight: 1000,
        width: 1000,
        height: 600,
        modal: true,
        buttons: {
            close: function() {
                    $(this).dialog("close");
                }
        },
        close: function() {}
    });
    $("#dialog-factureSells").dialog({
        autoOpen: false,
        maxWidth:1000,
        maxHeight: 1000,
        width: 1000,
        height: 600,
        modal: true,
        buttons: {
            close: function() {
                    $(this).dialog("close");
                }
        },
        close: function() {}
    });
    $("#dialog-factureSupply").dialog({
        autoOpen: false,
        maxWidth:1000,
        maxHeight: 1000,
        width: 1000,
        height: 600,
        modal: true,
        buttons: {
            close: function() {
                    $(this).dialog("close");
                }
        },
        close: function() {}
    });
    // $scope.openDialogFactureSell=function(){
    //     $('#dialog-factureSell').dialog('open');
    // };
    // $scope.openDialogFactureSells=function(){
    //     $('#dialog-factureSells').dialog('open'); 
    // };
    // $scope.openDialogFactureSupply=function(id){
    //     $('#dialog-factureSupply').dialog('open'); 
    // };
});

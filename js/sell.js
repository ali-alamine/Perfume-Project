$(document).ready(function(){
    var v= localStorage.getItem("LoginKey");
    if(v=="employee"){
        $(".bar").hide();
    } else if(v=="admin"){
        $(".bar").show();
    }
    var viewFacture='';
    $("#delDateSell").datepicker({ dateFormat: 'yy-mm-dd' }).val();
    $("#delDateSells").datepicker({ dateFormat: 'yy-mm-dd' }).val();
    var cDate=getDate();
    $("#delDateSell").val(cDate);
    $("#delDateSells").val(cDate);
    $(".factureSelltable").hide();
    $(".factureSellsTable").hide();
    $(".kabbes").hide();
    $(".sellPerfumeTable").hide();
    $(".sellItemTable").hide();
    $(".tableButton").click(function(){
        if($(this).hasClass("sellPerfumeButton")){
            $(".sellItemTable").hide();    
            $(".factureSellsTable").hide();    
            $(".factureSelltable").show();
            $(".sellPerfumeTable").fadeToggle();
            $(".sellPerfumeButton").css("background-color","#00BFFF");  
            $(".sellItemButton").css("background-color","lightblue");
            $(".sellsButton").css("background-color","lightblue");
            $('#searchPerfume').animatescroll();
            $("#searchPerfume").focus();
            viewFacture='SL';
            displayFactureCodeType(viewFacture);
        } 
        else if($(this).hasClass("sellItemButton")){
            $(".sellPerfumeTable").hide();
            $(".factureSellsTable").hide();    
            $(".factureSelltable").show();
            $(".sellItemTable").fadeToggle();
            $(".sellItemButton").css("background-color","#00BFFF");  
            $(".sellPerfumeButton").css("background-color","lightblue");
            $(".sellsButton").css("background-color","lightblue");
            $('#searchAccessories').animatescroll();
            $("#searchAccessories").focus(); 
            viewFacture='SL';
            displayFactureCodeType(viewFacture);  
        }
        else if($(this).hasClass("sellsButton")){
            $(".sellPerfumeTable").hide();    
            $(".sellItemTable").hide();
            $(".factureSelltable").hide();
            $(".factureSellsTable").fadeToggle(); 
            $(".sellsButton").css("background-color","#00BFFF");
            $(".sellPerfumeButton").css("background-color","lightblue");
            $(".sellItemButton").css("background-color","lightblue");
            $(".factureSellsTable").animatescroll();   
            viewFacture='SS';
            displayFactureCodeType(viewFacture);    
        }
    });
});
function getDate(){
    var d = new Date();
    minutes = d.getMinutes().toString().length == 1 ? '0'+d.getMinutes() : d.getMinutes(),
    hours = d.getHours().toString().length == 1 ? '0'+d.getHours() : d.getHours(),
    ampm = d.getHours() >= 12 ? 'pm' : 'am',
    months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
    // days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    return d.getFullYear()+'-'+months[d.getMonth()]+'-'+d.getDate();
}
function displayFactureCodeType(viewFacture){
    if(viewFacture != undefined){
        var url="../php/sell.php";
        var func="displayFactureCodeToBe";
        var data={"function":func,'type':viewFacture};
        var options = {
            type : "get",
            url : url,
            data: data,
            dataType: 'json',
            async : false,
            cache : false,
            success : function(response,status) {
                var facture_code_toBe=response;
                //console.log(facture_code_toBe);
                if(viewFacture=="SL"){
                    var idType="SLToBe";
                }else if(viewFacture=="SS"){
                    var idType="SSToBe";
                }
                document.getElementById(idType).innerHTML=facture_code_toBe.FcodeToBe;
            },
            error : function(request,response,error){
                swal({
                  title: "Please contact your software developermmmmmm",
                  text: "ERROR: " + error,
                  type: "warning",
                  showCancelButton: false,
                  confirmButtonClass: "btn-info",
                  confirmButtonText: "Ok",
                  closeOnConfirm: true
                });
            }
        };
        $.ajax(options);
    }
}

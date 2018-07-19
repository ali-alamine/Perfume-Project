$(document).ready(function(){
    var cDate=getDate();
    for(var i=0;i<4;i++){
        var expD="#expirationDate"+i;
        $(expD).datepicker({ dateFormat: 'yy-mm-dd' }).val();
    }
    $("#supplyDate_items").datepicker({ dateFormat: 'yy-mm-dd' }).val(cDate);
    $("#supplyDate_accessories").datepicker({ dateFormat: 'yy-mm-dd' }).val(cDate);
    $("#supplyItemsInput").show();
    $(".supplyItems").addClass("btn-info");
    $("#supplyAccessoriesInput").hide();
    var viewSupply="BI";
    displaySupplyCodeType(viewSupply);
    $(".supplyItems").click(function(){
        $("#supplyItemsInput").show(250);
        $("#supplyAccessoriesInput").hide(250);
        $(".supplyItems").addClass("btn-info");
        $(".supplyAccessories").removeClass("btn-info");
        $(".supplyAccessories").addClass("btn-default");
        viewSupply="BI";
        displaySupplyCodeType(viewSupply);
    });
    $(".supplyAccessories").click(function(){
        $("#supplyItemsInput").hide(250);
        $("#supplyAccessoriesInput").show(250);
        $(".supplyAccessories").addClass("btn-info");
        $(".supplyItems").removeClass("btn-info");
        $(".supplyItems").addClass("btn-default");
        viewSupply="BA";
        displaySupplyCodeType(viewSupply);
    });
});
function getDate(){
    var d = new Date();
    minutes = d.getMinutes().toString().length == 1 ? '0'+d.getMinutes() : d.getMinutes(),
    hours = d.getHours().toString().length == 1 ? '0'+d.getHours() : d.getHours(),
    ampm = d.getHours() >= 12 ? 'pm' : 'am',
    months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
    return d.getFullYear()+'-'+months[d.getMonth()]+'-'+d.getDate();
}
function displaySupplyCodeType(viewSupply){
    if(viewSupply != undefined){
        var url="../php/supply.php";
        var func="displaySupplyCodeToBe";
        var data={"function":func,'type':viewSupply};
        var options = {
            type : "get",
            url : url,
            data: data,
            dataType: 'json',
            async : false,
            cache : false,
            success : function(response,status) {
                var supply_code_toBe=response;
                if(viewSupply=="BI"){
                    var idType="BIToBe";
                }else if(viewSupply=="BA"){
                    var idType="BAToBe";
                }
                document.getElementById(idType).innerHTML=supply_code_toBe.BcodeToBe;
            },
            error : function(request,response,error){
                swal({
                  title: "Please contact your software developer",
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
function inputNull(type,bool){
    if(type=='#add' || type=='#capacity'){
        if(bool=="true"){
            $(type).css("border","solid red 1px");
            $(type).attr("placeholder", "يجب التعبئة");
        } else if(bool=="false"){
            $(type).css("border","");
            $(type).attr("placeholder", "");
        }
    } 
}
function check_number(val){
    var num = new RegExp("[0-9]");
    var verif;
    var points = 0;
    for(x = 0; x < val.value.length; x++)
    {
        verif = num.test(val.value.charAt(x));
        if(val.value.charAt(x) == "."){
            points++;
        }
        if(points > 1){
            verif = false; 
            points = 1;
        }
        if(verif == false){
            val.value = val.value.substr(0,x) + val.value.substr(x+1,val.value.length-x+1); 
            x--;
        }
    }
} 

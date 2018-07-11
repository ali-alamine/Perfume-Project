$(document).ready(function(){

    $(".supplierTable").hide();    
    $(".clientTable").show();
    $(".client").addClass("btn-info");
    $(".supplierTable").hide();
    $("#searchClient").focus();
    $(".client").click(function(){
        $(".clientTable").show(250);
        $(".supplierTable").hide(250);
        $(".client").addClass("btn-info");
        $(".supplier").removeClass("btn-info");
        $(".supplier").addClass("btn-default");
        $("#searchClient").focus();

    });

    $(".supplier").click(function(){
        $(".supplierTable").show(250);
        $(".clientTable").hide(250);
        $(".supplier").addClass("btn-info");
        $(".client").removeClass("btn-info");
        $(".client").addClass("btn-default");
        $("#searchSupplier").focus();
    });
});

function inputNull(type,bool){
    
    if(bool==true){
        $(type).css("border","solid red 1px");
        $(type).attr("placeholder", "حقل مطلوب");
    } else if(bool==false){
        $(type).css("border","");
        $(type).attr("placeholder", "الاسم");
    }
}  

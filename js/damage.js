$(document).ready(function(){

    $(".damageEssence").show();
    $(".damageEssenceButton").css("background-color","#00BFFF"); 
    $("#essenceName").focus();
    $(".damageAlcohol").hide();
    $(".damageBottle").hide();
    $(".damageItem").hide();
    $(".tableButton").click(function(){
        if($(this).hasClass("damageEssenceButton")){
            $(".damageAlcohol").hide();
            $(".damageBottle").hide();
            $(".damageItem").hide();
            $(".damageStockPerfume").hide();    
            $(".damageEssence").show(250);
            $(".damageEssenceButton").css("background-color","#00BFFF");  
            $(".damageAlcoholButton").css("background-color","lightblue");
            $(".damageBottleButton").css("background-color","lightblue");
            $(".damageItemButton").css("background-color","lightblue");
            $("#essenceName").animatescroll();
            $("#essenceName").focus();
        } else if($(this).hasClass("damageAlcoholButton")){
            $(".damageEssence").hide();
            $(".damageBottle").hide();
            $(".damageItem").hide();
            $(".damageStockPerfume").hide();
            $(".damageAlcohol").show(250);
            $(".damageAlcoholButton").css("background-color","#00BFFF");
            $(".damageEssenceButton").css("background-color","lightblue");
            $(".damageBottleButton").css("background-color","lightblue");
            $(".damageItemButton").css("background-color","lightblue");
            $('#alcoholQuantity').animatescroll();
            $("#alcoholQuantity").focus();
        } else if($(this).hasClass("damageBottleButton")){
            $(".damageEssence").hide();
            $(".damageAlcohol").hide();
            $(".damageItem").hide();
            $(".damageStockPerfume").hide();
            $(".damageBottle").show(250);
            $(".damageBottleButton").css("background-color","#00BFFF");
            $(".damageEssenceButton").css("background-color","lightblue");
            $(".damageAlcoholButton").css("background-color","lightblue");
            $(".damageItemButton").css("background-color","lightblue");
            $('#bottleType').animatescroll();
            $("#bottleType").focus();
        } else if($(this).hasClass("damageItemButton")){
            $(".damageEssence").hide();
            $(".damageBottle").hide();
            $(".damageAlcohol").hide();
            $(".damageStockPerfume").hide();
            $(".damageItem").show(250);
            $(".damageItemButton").css("background-color","#00BFFF");
            $(".damageEssenceButton").css("background-color","lightblue");
            $(".damageBottleButton").css("background-color","lightblue");
            $(".damageAlcoholButton").css("background-color","lightblue");
            $('#itemName').animatescroll();
            $("#itemName").focus();
        }
    });
});
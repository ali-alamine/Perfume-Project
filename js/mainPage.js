$(function()
{
    $('.sellFullCart').click( function(){
        $("#sellFullCartModel").show();
        $("#sellDayCartModel").hide();
        $("#sellDollarCartModel").hide();
        $("#sellItemModel").hide();
        $("#sellCentralModel").hide();
        $(".sellFullCart").addClass("btn-info");
        $(".sellDayCart").removeClass("btn-info");
        $(".sellDayCart").addClass("btn-default");
        $(".sellDollarCart").removeClass("btn-info");
        $(".sellDollarCart").addClass("btn-default");
        $(".sellItem").removeClass("btn-info");
        $(".sellItem").addClass("btn-default");
        $(".sellCentral").removeClass("btn-info");
        $(".sellCentral").addClass("btn-default");
    });
    $('.sellDayCart').click( function(){
        $("#sellFullCartModel").hide();
        $("#sellDayCartModel").show();
        $("#sellDollarCartModel").hide();
        $("#sellItemModel").hide();
        $("#sellCentralModel").hide();
        $(".sellDayCart").addClass("btn-info");
        $(".sellFullCart").removeClass("btn-info");
        $(".sellFullCart").addClass("btn-default");
        $(".sellDollarCart").removeClass("btn-info");
        $(".sellDollarCart").addClass("btn-default");
        $(".sellItem").removeClass("btn-info");
        $(".sellItem").addClass("btn-default");
        $(".sellCentral").removeClass("btn-info");
        $(".sellCentral").addClass("btn-default");
    });
    $('.sellDollarCart').click( function(){
        $("#sellFullCartModel").hide();
        $("#sellDayCartModel").hide();
        $("#sellDollarCartModel").show();
        $("#sellItemModel").hide();
        $("#sellCentralModel").hide();
        $(".sellDollarCart").addClass("btn-info");
        $(".sellDayCart").removeClass("btn-info");
        $(".sellDayCart").addClass("btn-default");
        $(".sellFullCart").removeClass("btn-info");
        $(".sellFullCart").addClass("btn-default");
        $(".sellItem").removeClass("btn-info");
        $(".sellItem").addClass("btn-default");
        $(".sellCentral").removeClass("btn-info");
        $(".sellCentral").addClass("btn-default");
    });
    $('.sellItem').click( function(){
        $("#sellFullCartModel").hide();
        $("#sellDayCartModel").hide();
        $("#sellDollarCartModel").hide();
        $("#sellItemModel").show();
        $("#sellCentralModel").hide();
        $(".sellItem").addClass("btn-info");
        $(".sellDayCart").removeClass("btn-info");
        $(".sellDayCart").addClass("btn-default");
        $(".sellDollarCart").removeClass("btn-info");
        $(".sellDollarCart").addClass("btn-default");
        $(".sellFullCart").removeClass("btn-info");
        $(".sellFullCart").addClass("btn-default");
        $(".sellCentral").removeClass("btn-info");
        $(".sellCentral").addClass("btn-default");
    });
    $('.sellCentral').click( function(){
        $("#sellFullCartModel").hide();
        $("#sellDayCartModel").hide();
        $("#sellDollarCartModel").hide();
        $("#sellItemModel").hide();
        $("#sellCentralModel").show();
        $(".sellCentral").addClass("btn-info");
        $(".sellDayCart").removeClass("btn-info");
        $(".sellDayCart").addClass("btn-default");
        $(".sellDollarCart").removeClass("btn-info");
        $(".sellDollarCart").addClass("btn-default");
        $(".sellItem").removeClass("btn-info");
        $(".sellItem").addClass("btn-default");
        $(".sellFullCart").removeClass("btn-info");
        $(".sellFullCart").addClass("btn-default");
    });
    $('.addCart').click( function(){
        $("#addCartModel").show();
        $("#addItemModel").hide();
        $("#addInternetBudgetModel").hide();
        $("#addClientModel").hide();
        $("#addEmployeeModel").hide();
        $(".addCart").addClass("btn-info");
        $(".addItem").removeClass("btn-info");
        $(".addItem").addClass("btn-default");
        $(".addInternetBudget").removeClass("btn-info");
        $(".addInternetBudget").addClass("btn-default");
        $(".addClient").removeClass("btn-info");
        $(".addClient").addClass("btn-default");
        $(".addEmployee").removeClass("btn-info");
        $(".addEmployee").addClass("btn-default");
    });
    $('.addItem').click( function(){
        $("#addCartModel").hide();
        $("#addItemModel").show();
        $("#addInternetBudgetModel").hide();
        $("#addClientModel").hide();
        $("#addEmployeeModel").hide();
        $(".addItem").addClass("btn-info");
        $(".addCart").removeClass("btn-info");
        $(".addCart").addClass("btn-default");
        $(".addInternetBudget").removeClass("btn-info");
        $(".addInternetBudget").addClass("btn-default");
        $(".addClient").removeClass("btn-info");
        $(".addClient").addClass("btn-default");
        $(".addEmployee").removeClass("btn-info");
        $(".addEmployee").addClass("btn-default");
    });
    $('.addInternetBudget').click( function(){
        $("#addCartModel").hide();
        $("#addItemModel").hide();
        $("#addInternetBudgetModel").show();
        $("#addClientModel").hide();
        $("#addEmployeeModel").hide();
        $(".addInternetBudget").addClass("btn-info");
        $(".addItem").removeClass("btn-info");
        $(".addItem").addClass("btn-default");
        $(".addCart").removeClass("btn-info");
        $(".addCart").addClass("btn-default");
        $(".addClient").removeClass("btn-info");
        $(".addClient").addClass("btn-default");
        $(".addEmployee").removeClass("btn-info");
        $(".addEmployee").addClass("btn-default");
    });
    $('.addClient').click( function(){
        $("#addCartModel").hide();
        $("#addItemModel").hide();
        $("#addInternetBudgetModel").hide();
        $("#addClientModel").show();
        $("#addEmployeeModel").hide();
        $(".addClient").addClass("btn-info");
        $(".addItem").removeClass("btn-info");
        $(".addItem").addClass("btn-default");
        $(".addInternetBudget").removeClass("btn-info");
        $(".addInternetBudget").addClass("btn-default");
        $(".addCart").removeClass("btn-info");
        $(".addCart").addClass("btn-default");
        $(".addEmployee").removeClass("btn-info");
        $(".addEmployee").addClass("btn-default");
    });
    $('.addEmployee').click( function(){
        $("#addCartModel").hide();
        $("#addItemModel").hide();
        $("#addInternetBudgetModel").hide();
        $("#addClientModel").hide();
        $("#addEmployeeModel").show();
        $(".addEmployee").addClass("btn-info");
        $(".addItem").removeClass("btn-info");
        $(".addItem").addClass("btn-default");
        $(".addInternetBudget").removeClass("btn-info");
        $(".addInternetBudget").addClass("btn-default");
        $(".addClient").removeClass("btn-info");
        $(".addClient").addClass("btn-default");
        $(".addCart").removeClass("btn-info");
        $(".addCart").addClass("btn-default");
    });
});  
$(function () {
    var isClosed = false;
    $('.buttonClass').click(function () {
        if (isClosed == true) {  
            $('.buttonClass').removeClass('is-open');
            $('.buttonClass').addClass('is-closed');
            $("#mySidenav").css({"width" :"0"});
            $("#main").css({"marginLeft" : "0"});
            isClosed = false;
        } else {   
            $('.buttonClass').removeClass('is-closed');
            $('.buttonClass').addClass('is-open');
            $("#mySidenav").css({"width" : "225px"});
            $("#main").css({"marginLeft" : "225px"});
            isClosed = true;
        }     
    }); 
});/*
function getLogoutKeys(){
    window.location.replace("index.html")
}
$(document).ready(function(){
});*/
$(document).ready(function(){

    for(var i=0;i<10;i++){
        var idd="#itemEntryDate"+i;
        $(idd).datepicker({ dateFormat: 'dd-mm-yy' }).val();
    // $('#itemExpirationDate').datepicker({ dateFormat: 'd-mm-yy' }).val();
    }

    $("#supplyEssenceInput").show();
    $(".supplyEessence").addClass("btn-info");
    $("#supplyAlcoholInput").hide();
    $("#supplyBottleInput").hide();
    $("#supplyItemInput").hide();
    $("#supplySupplierInput").hide();
    $(".supplyEessence").click(function(){
        $("#supplyEssenceInput").show(250);
        $("#supplyAlcoholInput").hide(250);
        $("#supplyBottleInput").hide(250);
        $("#supplyItemInput").hide(250);
        $("#supplySupplierInput").hide(250);
        $(".supplyEessence").addClass("btn-info");
        $(".supplyAlcohol").removeClass("btn-info");
        $(".supplyAlcohol").addClass("btn-default");
        $(".supplyBottle").removeClass("btn-info");
        $(".supplyBottle").addClass("btn-default");
        $(".supplyItem").removeClass("btn-info");
        $(".supplyItem").addClass("btn-default");
        $(".supplySupplier").removeClass("btn-info");
        $(".supplySupplier").addClass("btn-default");
    });
    $(".supplyAlcohol").click(function(){
        $("#supplyEssenceInput").hide(250);
        $("#supplyAlcoholInput").show(250);
        $("#supplyBottleInput").hide(250);
        $("#supplyItemInput").hide(250);
        $("#supplySupplierInput").hide(250);
        $(".supplyAlcohol").addClass("btn-info");
        $(".supplyEessence").removeClass("btn-info");
        $(".supplyEessence").addClass("btn-default");
        $(".supplyBottle").removeClass("btn-info");
        $(".supplyBottle").addClass("btn-default");
        $(".supplyItem").removeClass("btn-info");
        $(".supplyItem").addClass("btn-default");
        $(".supplySupplier").removeClass("btn-info");
        $(".supplySupplier").addClass("btn-default");
    });
    $(".supplyBottle").click(function(){
        $("#supplyEssenceInput").hide(250);
        $("#supplyAlcoholInput").hide(250);
        $("#supplyBottleInput").show(250);
        $("#supplyItemInput").hide(250);
        $("#supplySupplierInput").hide(250);
        $(".supplyBottle").addClass("btn-info");
        $(".supplyAlcohol").removeClass("btn-info");
        $(".supplyAlcohol").addClass("btn-default");
        $(".supplyEessence").removeClass("btn-info");
        $(".supplyEessence").addClass("btn-default");
        $(".supplyItem").removeClass("btn-info");
        $(".supplyItem").addClass("btn-default");
        $(".supplySupplier").removeClass("btn-info");
        $(".supplySupplier").addClass("btn-default");
    });
    $(".supplyItem").click(function(){
        $("#supplyEssenceInput").hide(250);
        $("#supplyAlcoholInput").hide(250);
        $("#supplyBottleInput").hide(250);
        $("#supplyItemInput").show(250);
        $("#supplySupplierInput").hide(250);
        $(".supplyItem").addClass("btn-info");
        $(".supplyAlcohol").removeClass("btn-info");
        $(".supplyAlcohol").addClass("btn-default");
        $(".supplyBottle").removeClass("btn-info");
        $(".supplyBottle").addClass("btn-default");
        $(".supplyEessence").removeClass("btn-info");
        $(".supplyEessence").addClass("btn-default");
        $(".supplySupplier").removeClass("btn-info");
        $(".supplySupplier").addClass("btn-default");
    });
    $(".supplySupplier").click(function(){
        $("#supplyEssenceInput").hide(250);
        $("#supplyAlcoholInput").hide(250);
        $("#supplyBottleInput").hide(250);
        $("#supplyItemInput").hide(250);
        $("#supplySupplierInput").show(250);
        $(".supplySupplier").addClass("btn-info");
        $(".supplyAlcohol").removeClass("btn-info");
        $(".supplyAlcohol").addClass("btn-default");
        $(".supplyBottle").removeClass("btn-info");
        $(".supplyBottle").addClass("btn-default");
        $(".supplyItem").removeClass("btn-info");
        $(".supplyItem").addClass("btn-default");
        $(".supplyEessence").removeClass("btn-info");
        $(".supplyEessence").addClass("btn-default");
    });
});
var app = angular.module('PERFUME', []);
app.controller('SupplyALL', function($scope, $http) {
    $scope.allEssence;
    $scope.allBottle;
    $scope.allItem;
    $scope.allSupplier; 
    angular.element(document).ready(function () {
        $scope.getAllEssence();
        $scope.getAllBottle();
        $scope.getAllItem();
        $scope.getAllSupplier();
        //for(var i=1;i<$scope.rowsItem.column.length;i++){
        // $scope.rowsItem.column[i].itemEntryDate=datepicker({ dateFormat: 'd-mm-yy' });
        // $scope.rowsItem.column[i].itemExpirationDate=datepicker({ dateFormat: 'd-mm-yy' });
        // var dateComIds='#dateCom_retour'+i;
        // var dateRecIds='#dateRec_retour'+i;
        // $(dateComIds).datepicker({ dateFormat: 'd-mm-yy' }).val();
        // $(dateRecIds).datepicker({ dateFormat: 'd-mm-yy' }).val();
        //}
        
        $scope.addDate();
    });
    $scope.rowsEssence = [{"essenceId" :[],"essenceName": [],"essenceQuantity":[], "essenceSellingPrice": [], "essenceBellingPrice": [],"essenceCostPrice": []},{},{},{ }];
    // {column:
    //     [{:'',: '',: '',: '',: 0},
    //     {essenceName:'',essenceQuantity: '',essenceSellingPrice: '',essenceBellingPrice: '',essenceCostPrice: 0},
    //     {essenceName:'',essenceQuantity: '',essenceSellingPrice: '',essenceBellingPrice: '',essenceCostPrice: 0},
    //     {essenceName:'',essenceQuantity: '',essenceSellingPrice: '',essenceBellingPrice: '',essenceCostPrice: 0}
    // ]};
    $scope.rowsBottle = {column:
        [{bottleType:'',bottleCapacity: '',bottleQuantity: '',bottleSellingPrice: '',bottleBellingPrice: '',bottleCostPrice: 0},
        {bottleType:'',bottleCapacity: '',bottleQuantity: '',bottleSellingPrice: '',bottleBellingPrice: '',bottleCostPrice: 0},
        {bottleType:'',bottleCapacity: '',bottleQuantity: '',bottleSellingPrice: '',bottleBellingPrice: '',bottleCostPrice: 0},
        {bottleType:'',bottleCapacity: '',bottleQuantity: '',bottleSellingPrice: '',bottleBellingPrice: '',bottleCostPrice: 0}
    ]};
    $scope.rowsItem = {column:
        [{itemName:'',itemQuantity: '',itemSellingPrice: '',itemBellingPrice: '',itemCostPrice: 0,itemEntryDate: '',itemExpirationDate: ''},
        {itemName:'',itemQuantity: '',itemSellingPrice: '',itemBellingPrice: '',itemCostPrice: 0,itemEntryDate: '',itemExpirationDate: ''},
        {itemName:'',itemQuantity: '',itemSellingPrice: '',itemBellingPrice: '',itemCostPrice: 0,itemEntryDate: '',itemExpirationDate: ''},
        {itemName:'',itemQuantity: '',itemSellingPrice: '',itemBellingPrice: '',itemCostPrice: 0,itemEntryDate: '',itemExpirationDate: ''}
    ]};
    
    $scope.safeApply = function(fn) {
        var phase = this.$root.$$phase;
        if(phase == '$apply' || phase == '$digest') {
            if(fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };
    $scope.addRowEssence = function() {
        $scope.rowsEssence.push({});
        // $(".rowEssence").fadeIn();
        $(".newRowEssence").animatescroll();
    };
    $scope.addRowBottle = function() {
        $scope.rowsBottle.column.push
            ({bottleType:'',bottleCapacity: '',bottleQuantity: '',bottleSellingPrice: '',bottleBellingPrice: '',bottleCostPrice: 0});
        $(".rowBottle").fadeIn();
        $(".newRowBottle").animatescroll();
    };
    $scope.addRowItem = function() {

        $scope.rowsItem.column.push
            ({itemName:'',itemQuantity: '',itemSellingPrice: '',itemBellingPrice: '',itemCostPrice: 0,itemEntryDate: '',itemExpirationDate: ''});
        // $('.date').each(function() {
        //     var i=$scope.rowsItem.column.length;
        // $scope.rowsItem.column[i-1].itemEntryDate.addClass('date');
        // $scope.rowsItem.column[i-1].itemExpirationDate.addClass('date');
        $(".rowItem").fadeIn();
        $(".newRowItem").animatescroll();
            // $scope.index++;
        $scope.addDate();
       // });  
    };
    $scope.addDate = function(){
        $('.date').each(function() {
            $(this).datepicker({ dateFormat: 'd-mm-yy' });
        });
    }
    $scope.totalPriceEssence = function() {
        // alert("here we go");
        $scope.totalPrice=0;
        for(var i=0;i<$scope.rowsEssence[0].essenceQuantity.length;i++){
             $scope.totalPrice += parseInt($scope.rowsEssence[0].essenceQuantity[i])* parseInt($scope.rowsEssence[0].essenceBellingPrice[i]);
        }
        // });
        return $scope.totalPrice;
    };
    $scope.totalPriceAlcohol = function() {
        if($scope.alcoholQuantity != null && $scope.alcoholBellingPrice != null){
            var total = 0;
            total += $scope.alcoholQuantity * $scope.alcoholBellingPrice;
            return total;
        }
    };
    $scope.totalPriceBottle = function() {
        var total = 0;
        angular.forEach($scope.rowsBottle.column, function(col) {
            total += col.bottleQuantity * col.bottleBellingPrice;
        });
        return total;
    };
    $scope.totalPriceItem = function() {
        var total = 0;
        angular.forEach($scope.rowsItem.column, function(col) {
            total += col.itemQuantity * col.itemBellingPrice;
        });
        return total;
    };
    $scope.getAllEssence = function(){
        var url="../php/getAll.php";
        var data = {"function":"getAllEssence"};
        var options={
            type : "get",
            url : url,
            data: data,
            dataType: 'json',
            async : false,
            cache : false,
            success : function(response,status) {
                $scope.allEssence=response;
                // console.log($scope.allDesignation)
                $scope.safeApply(function() {});
            },
            error:function(request,response,error){
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
    };
    $scope.getAllBottle = function(){
        var url="../php/getAll.php";
        var data = {"function":"getAllBottle"};
        var options={
            type : "get",
            url : url,
            data: data,
            dataType: 'json',
            async : false,
            cache : false,
            success : function(response,status) {
                $scope.allBottle=response;
                $scope.safeApply(function() {});
            },
            error:function(request,response,error){
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
    };
    $scope.getAllItem = function(){
        var url="../php/getAll.php";
        var data = {"function":"getAllItem"};
        var options={
            type : "get",
            url : url,
            data: data,
            dataType: 'json',
            async : false,
            cache : false,
            success : function(response,status) {
                $scope.allItem=response;
                $scope.safeApply(function() {});
            },
            error:function(request,response,error){
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
    };
    $scope.getAllSupplier = function(){
        var url="../php/getAll.php";
        var data = {"function":"getAllSupplier"};
        var options={
            type : "get",
            url : url,
            data: data,
            dataType: 'json',
            async : false,
            cache : false,
            success : function(response,status) {
                $scope.allSupplier=response;
                $scope.safeApply(function() {});
            },
            error:function(request,response,error){
                swal({
                  title: "Please contact your software developerijijiji",
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
    };
    $scope.addEssenceName_Modal = function(){
        $('#addModal').modal('show');
        $('#bottleCapacity').hide();
        $scope.add_titleName = "تعريف اسانس جديد";
        $scope.add_labelName = "اسم الاسانس";
        $scope.add="";   
        $("#add").css("border","");
    };
    $scope.addBottleType_Modal = function(){
        $('#addModal').modal('show');
        $('#bottleCapacity').show();
        $scope.add_titleName = "تعريف قنينة جديدة";
        $scope.add_labelName = "نوع القنينة";
        $scope.add="";   
        $scope.capacity="";   
        $("#add").css("border","");
        $("#capacity").css("border","");
    };
    $scope.addItemName_Modal = function(){
        $('#addModal').modal('show');
        $('#bottleCapacity').hide();
        $scope.add_titleName = "تعريف اسم اكسسوار جديد";
        $scope.add_labelName = "اسم الإكسسوار";
        $scope.add="";
        $("#add").css("border","");
    }; 
    $scope.addName = function(){
        var labelName=$scope.add_labelName;
        var add = $scope.add;
        var url = '../php/supply.php';
        if(add!=""){
            if(labelName=="اسم الاسانس"){
                var func = "addEssence";
                var data = {'essence': add,'function': func};
                var options = {
                    type : "get",
                    url : url,
                    data: data,
                    dataType: "json",
                    async : false,
                    cache : false,
                    success : function(response,status) {
                        $scope.getAllEssence();
                        $('#addModal').modal('hide');
                    },
                    error:function(request,response,error){
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
            } else if(labelName=="نوع القنينة"){
                var capacity=$scope.capacity;
                if(capacity!=""){
                    var func = "addBottleType";
                    var data = {'bottleType': add,'bottleCapacity': capacity,'function': func};
                    var options = {
                        type : "get",
                        url : url,
                        data: data,
                        dataType: "json",
                        async : false,
                        cache : false,
                        success : function(response,status) {
                            $scope.getAllBottle();
                            //add="";
                            //$scope.getClient();
                            $('#addModal').modal('hide');
                        },
                        error:function(request,response,error){
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
                } else if(capacity==""){
                    $("#capacity").css("border","solid red 1px");
                }
            } else if(labelName=="اسم الإكسسوار") {
                var func = "addItem";
                var data = {'item': add,'function': func};
                var options = {
                    type : "get",
                    url : url,
                    data: data,
                    dataType: "json",
                    async : false,
                    cache : false,
                    success : function(response,status) {
                        $scope.getAllItem();
                        $('#addModal').modal('hide');
                    },
                    error:function(request,response,error){
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
        } else if(add==""){
            $("#add").css("border","solid red 1px");
        }
    };
    $scope.addSupplyEssence = function(){
        // var essenceId=[];
        // var essenceName=[];
        // var essenceQuantity=[];
        // var essenceSellingPrice=[];
        // var essenceBellingPrice=[];
        // var essenceCostPrice=[];
        // var rowsEssenceLenght=0;
        var msg='';
        for(var i = 0; i < $scope.rowsEssence.length; i++) {
            var name=$scope.rowsEssence.column[i].essenceName;
            if(name !="" && ($scope.rowsEssence.column[i].essenceQuantity =="" 
                || $scope.rowsEssence.column[i].essenceSellingPrice =="" 
                || $scope.rowsEssence.column[i].essenceBellingPrice =="")){
                msg+="إسانس '"+name+"' : معلومات ناقصة. \n";
            }
            if(name !=""){
                var listName='#listEssenceName'+' option';
                var idE = $(listName).filter(function() {
                    return this.value == name;
                }).data('item');
                var idName = idE ?idE : 'noId';
                if(idName =="noId"){
                    msg+="إسانس '"+name+"' : غيل مسجل. \n";
                } 
                $scope.rowsEssence[0]["essenceId"].push(idE);
                // essenceId.push(idE);
                // essenceName.push(name);
                // essenceQuantity.push($scope.rowsEssence.column[i].essenceQuantity);
                // essenceSellingPrice.push($scope.rowsEssence.column[i].essenceSellingPrice);
                // essenceBellingPrice.push($scope.rowsEssence.column[i].essenceBellingPrice);
                // essenceCostPrice.push($scope.rowsEssence.column[i].essenceCostPrice);
                // rowsEssenceLenght++;
            }
        }
        var supplierName=$('#essenceSupplierName').val();
        $scope.rowsEssence[0].supplierName.push(supplierName);
        if(supplierName!=""){
            var listEssenceSupplierName='#listEssenceSupplierName'+' option';
            var id = $(listEssenceSupplierName).filter(function() {
                return this.value == supplierName;
            }).data('item');
            var supplierId = id ?id : 'noId';
            if(supplierId =="noId"){
                msg+="مورد '"+supplierName+"' : غيل مسجل. \n";
            }
            $scope.rowsEssence[0].supplierId.push(supplierId);
        }else{
            msg+="مورد: معلومات ناقصة.";
        }
        if(msg!=''){
            swal({
                title: "إنتبه!",
                text: msg ,
                type: "warning",
                showCancelButton: false,
                confirmButtonClass: "btn-warning",
                confirmButtonText: "نعم",
                closeOnConfirm: true
            });
        } else{
            var url = '../php/supply.php';
            var func = "addSupplyEssence";
            var essenceTotalPrice=$scope.totalPriceEssence();
            var essenceRestPrice=essenceTotalPrice - $('#essencePayPrice').val();
            $scope.rowsEssence[0].supplierName.push(supplierName);
            // var data = {
            //     'function': func,
            //     'type': 'essence',
            //     'rowsEssenceLenght': rowsEssenceLenght,
            //     'essenceId': essenceId,
            //     'essenceName': essenceName,
            //     'essenceQuantity': essenceQuantity,
            //     'essenceSellingPrice': essenceSellingPrice,
            //     'essenceBellingPrice': essenceBellingPrice,
            //     'essenceCostPrice': essenceCostPrice,
            //     'supplierId': supplierId,
            //     'supplierName': supplierName,
            //     'essenceTotalPrice': essenceTotalPrice,
            //     'essenceRestPrice' : essenceRestPrice
            // };
            var options = {
                type : "get",
                url : url,
                data: data,
                dataType: "json",
                async : false,
                cache : false,
                success : function(response,status) {
                    $("#essenceSupplierName").val('');
                    $scope.rowsEssence = {column:
                        [{essenceName:'',essenceQuantity: '',essenceSellingPrice: '',essenceBellingPrice: '',essenceCostPrice: 0},
                        {essenceName:'',essenceQuantity: '',essenceSellingPrice: '',essenceBellingPrice: '',essenceCostPrice: 0},
                        {essenceName:'',essenceQuantity: '',essenceSellingPrice: '',essenceBellingPrice: '',essenceCostPrice: 0},
                        {essenceName:'',essenceQuantity: '',essenceSellingPrice: '',essenceBellingPrice: '',essenceCostPrice: 0}
                    ]}; 
                    $('#essencePayPrice').val("");
                },
                error:function(request,response,error){
                    swal({
                        title: "إنتبه!",
                        text: "مشكلة: "+error ,
                        type: "warning",
                        showCancelButton: false,
                        confirmButtonClass: "btn-warning",
                        confirmButtonText: "نعم",
                        closeOnConfirm: true
                    });
                }
            };
            $.ajax(options);
        }
    };
    $scope.addSupplyAlcohol = function(){
        var alcoholQuantity='';
        var alcoholSellingPrice= '';
        var alcoholBellingPrice= '';
        var alcoholCostPrice= '';
        var msg='';
        if($scope.alcoholQuantity != null && $scope.alcoholSellingPrice != null && $scope.alcoholBellingPrice != null){
            alcoholQuantity=$scope.alcoholQuantity;
            alcoholSellingPrice=$scope.alcoholSellingPrice;
            alcoholBellingPrice=$scope.alcoholBellingPrice;
            alcoholCostPrice=$scope.alcoholCostPrice;
        } else {
            msg+="كحول: معلومات ناقصة.\n";
        }
        var supplierName=$('#alcoholSupplierName').val();
        if(supplierName!=""){
            var listAlcoholSupplierName='#listAlcoholSupplierName'+' option';
            var id = $(listAlcoholSupplierName).filter(function() {
                return this.value == supplierName;
            }).data('item');
            var supplierId = id ?id : 'noId';
            if(supplierId =="noId"){
                msg+="مورد '"+supplierName+"' غيل مسجل. \n";
            }
        }else{
            msg+="مورد: معلومات ناقصة.\n";
        }
        if(msg!=''){
            swal({
                title: "إنتبه!",
                text: msg ,
                type: "warning",
                showCancelButton: false,
                confirmButtonClass: "btn-warning",
                confirmButtonText: "نعم",
                closeOnConfirm: true
            });
        } else{
            var url = '../php/supply.php';
            var func = "addSupplyAlcohol";
            var alcoholTotalPrice=$scope.totalPriceAlcohol();
            var alcoholRestPrice=alcoholTotalPrice - $('#alcoholPayPrice').val();
            var data = {
                'function': func,
                'type': 'alcohol',
                'alcoholQuantity': alcoholQuantity,
                'alcoholSellingPrice': alcoholSellingPrice,
                'alcoholBellingPrice': alcoholBellingPrice,
                'alcoholCostPrice': alcoholCostPrice,
                'supplierId': supplierId,
                'supplierName': supplierName,
                'alcoholTotalPrice': alcoholTotalPrice,
                'alcoholRestPrice' : alcoholRestPrice
            };
            var options = {
                type : "get",
                url : url,
                data: data,
                dataType: "json",
                async : false,
                cache : false,
                success : function(response,status) {
                    $("#alcoholSupplierName").val('');
                    $scope.alcoholQuantity= '';
                    $scope.alcoholSellingPrice= '';
                    $scope.alcoholBellingPrice= '';
                    $scope.alcoholCostPrice= 0 ;
                    $('#alcoholPayPrice').val("");
                },
                error:function(request,response,error){
                    swal({
                        title: "إنتبه!",
                        text: "مشكلة: "+error ,
                        type: "warning",
                        showCancelButton: false,
                        confirmButtonClass: "btn-warning",
                        confirmButtonText: "نعم",
                        closeOnConfirm: true
                    });
                }
            };
            $.ajax(options);
        }
    };
    $scope.addSupplyBottle = function(){
        var bottleId=[];
        var bottleType=[];
        var bottleQuantity=[];
        var bottleSellingPrice=[];
        var bottleBellingPrice=[];
        var bottleCostPrice=[];
        var rowsBottleLenght=0;
        var msg='';
        for(var i = 0; i < $scope.rowsBottle.column.length; i++) {
            var type=$scope.rowsBottle.column[i].bottleType;
            // alert(type);
            if(type !="" && ($scope.rowsBottle.column[i].bottleQuantity =="" 
                || $scope.rowsBottle.column[i].bottleSellingPrice == ""
                || $scope.rowsBottle.column[i].bottleBellingPrice == "")){
                msg+="قنينة '"+type+"' : معلومات ناقصة. \n";
            }
            if(type !="" && $scope.rowsBottle.column[i].bottleQuantity !="" 
                && $scope.rowsBottle.column[i].bottleSellingPrice != ""
                && $scope.rowsBottle.column[i].bottleBellingPrice != ""){
                var listType='#listBottleType'+' option';
                var idB = $(listType).filter(function() {
                    return this.value == type;
                }).data('item');
                var idType = idB ?idB : 'noId';
                if(idType =="noId"){
                    msg+="قنينة '"+type+"' : غير مسجلة. \n";
                } 
                bottleId.push(idB);
                bottleType.push(type);
                bottleQuantity.push($scope.rowsBottle.column[i].bottleQuantity);
                bottleSellingPrice.push($scope.rowsBottle.column[i].bottleSellingPrice);
                bottleBellingPrice.push($scope.rowsBottle.column[i].bottleBellingPrice);
                bottleCostPrice.push($scope.rowsBottle.column[i].bottleCostPrice);
                rowsBottleLenght++;
            }
        }
        var supplierName=$('#bottleSupplierName').val();
        if(supplierName!=""){
            var listBottleSupplierName='#listBottleSupplierName'+' option';
            var id = $(listBottleSupplierName).filter(function() {
                return this.value == supplierName;
            }).data('item');
            var supplierId = id ?id : 'noId';
            if(supplierId =="noId"){
                msg+="مورد '"+supplierName+"' : غيل مسجل. \n";
            }
        }else{
            msg+="مورد : معلومات ناقصة. \n";
        }
        if(msg!=''){
            swal({
                title: "إنتبه!",
                text: msg ,
                type: "warning",
                showCancelButton: false,
                confirmButtonClass: "btn-warning",
                confirmButtonText: "نعم",
                closeOnConfirm: true
            });
        } else{
            var url = '../php/supply.php';
            var func = "addSupplyBottle";
            var bottleTotalPrice=$scope.totalPriceBottle();
            var bottleRestPrice=bottleTotalPrice - $('#bottlePayPrice').val();
            var data = {
                'function': func,
                'type': 'bottle',
                'rowsBottleLenght': rowsBottleLenght,
                'bottleId': bottleId,
                'bottleType': bottleType,
                'bottleQuantity': bottleQuantity,
                'bottleSellingPrice': bottleSellingPrice,
                'bottleBellingPrice': bottleBellingPrice,
                'bottleCostPrice': bottleCostPrice,
                'supplierId': supplierId,
                'supplierName': supplierName,
                'bottleTotalPrice': bottleTotalPrice,
                'bottleRestPrice' : bottleRestPrice
            };
            var options = {
                type : "get",
                url : url,
                data: data,
                dataType: "json",
                async : false,
                cache : false,
                success : function(response,status) {
                    $scope.rowsBottle = {column:
                        [{bottleType:'',bottleCapacity: '',bottleQuantity: '',bottleSellingPrice: '',bottleBellingPrice: '',bottleCostPrice: 0},
                        {bottleType:'',bottleCapacity: '',bottleQuantity: '',bottleSellingPrice: '',bottleBellingPrice: '',bottleCostPrice: 0},
                        {bottleType:'',bottleCapacity: '',bottleQuantity: '',bottleSellingPrice: '',bottleBellingPrice: '',bottleCostPrice: 0},
                        {bottleType:'',bottleCapacity: '',bottleQuantity: '',bottleSellingPrice: '',bottleBellingPrice: '',bottleCostPrice: 0}
                    ]}; 
                    $("#bottleSupplierName").val('');
                    $('#bottlePayPrice').val("");
                },
                error:function(request,response,error){
                    swal({
                        title: "إنتبه!",
                        text: "مشكلة: " + error,
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
    };
    $scope.addSupplyItem = function(){
        var itemId=[];
        var itemName=[];
        var itemQuantity=[];
        var itemSellingPrice=[];
        var itemBellingPrice=[];
        var itemCostPrice=[];
        var itemEntryDate=[];
        var itemExpirationDate=[];
        var rowsItemLenght=0;
        var msg='';
        for(var i = 0; i < $scope.rowsItem.column.length; i++) {
            var name=$scope.rowsItem.column[i].itemName;
            if(name !="" && ($scope.rowsItem.column[i].itemQuantity == ''
                || $scope.rowsItem.column[i].itemSellingPrice == ''
                || $scope.rowsItem.column[i].itemBellingPrice == '' 
                || $scope.rowsItem.column[i].itemCostPrice == ''
                || $scope.rowsItem.column[i].itemEntryDate == null
                || $scope.rowsItem.column[i].itemExpirationDate == null)){
                msg+="إكسسوار '"+name+"' : معلومات ناقصة. \n";
            }
            if(name !="" && $scope.rowsItem.column[i].itemQuantity != ''
                && $scope.rowsItem.column[i].itemSellingPrice != ''
                && $scope.rowsItem.column[i].itemBellingPrice != '' 
                && $scope.rowsItem.column[i].itemCostPrice != ''
                && $scope.rowsItem.column[i].itemEntryDate != null
                && $scope.rowsItem.column[i].itemExpirationDate != null){
                var listName='#listItemName'+' option';
                var idI = $(listName).filter(function() {
                    return this.value == name;
                }).data('item');
                var idName = idI ?idI : 'noId';
                if(idName =="noId"){
                    msg+="إكسسوار '"+name+"' : غيل مسجل. \n";
                } 
                itemId.push(idI);
                itemName.push(name);
                itemQuantity.push($scope.rowsItem.column[i].itemQuantity);
                itemSellingPrice.push($scope.rowsItem.column[i].itemSellingPrice);
                itemBellingPrice.push($scope.rowsItem.column[i].itemBellingPrice);
                itemCostPrice.push($scope.rowsItem.column[i].itemCostPrice);
                itemEntryDate.push($scope.rowsItem.column[i].itemEntryDate);
                itemExpirationDate.push($scope.rowsItem.column[i].itemExpirationDate);
                alert(itemExpirationDate)
                rowsItemLenght++;
            }
        }
        var supplierName=$('#itemSupplierName').val();
        if(supplierName!=""){
            var listItemSupplierName='#listItemSupplierName'+' option';
            var id = $(listItemSupplierName).filter(function() {
                return this.value == supplierName;
            }).data('item');
            var supplierId = id ?id : 'noId';
            if(supplierId =="noId"){
                msg+="مورد '"+supplierName+"' : غيل مسجل. \n";
            }
        }else{
            msg+="مورد : معلومات ناقصة. \n";
        }
        if(msg!=''){
            swal({
                title: "إنتبه!",
                text: msg ,
                type: "warning",
                showCancelButton: false,
                confirmButtonClass: "btn-warning",
                confirmButtonText: "نعم",
                closeOnConfirm: true
            });
        } else{
            var url = '../php/supply.php';
            var func = "addSupplyItem";
            var itemTotalPrice=$scope.totalPriceItem();
            var itemRestPrice=itemTotalPrice - $('#itemPayPrice').val();
            var data = {
                'function': func,
                'type': 'item',
                'rowsItemLenght': rowsItemLenght,
                'itemId': itemId,
                'itemName': itemName,
                'itemQuantity': itemQuantity,
                'itemSellingPrice': itemSellingPrice,
                'itemBellingPrice': itemBellingPrice,
                'itemCostPrice': itemCostPrice,
                'itemEntryDate': itemEntryDate,
                'itemExpirationDate': itemExpirationDate,
                'supplierId': supplierId,
                'supplierName': supplierName,
                'itemTotalPrice': itemTotalPrice,
                'itemRestPrice' : itemRestPrice
            };
            var options = {
                type : "get",
                url : url,
                data: data,
                dataType: "json",
                async : false,
                cache : false,
                success : function(response,status) {
                    $scope.rowsItem = {column:
                        [{itemName:'',itemQuantity: '',itemSellingPrice: '',itemBellingPrice: '',itemCostPrice: 0,itemEntryDate: '',itemExpirationDate: ''},
                        {itemName:'',itemQuantity: '',itemSellingPrice: '',itemBellingPrice: '',itemCostPrice: 0,itemEntryDate: '',itemExpirationDate: ''},
                        {itemName:'',itemQuantity: '',itemSellingPrice: '',itemBellingPrice: '',itemCostPrice: 0,itemEntryDate: '',itemExpirationDate: ''},
                        {itemName:'',itemQuantity: '',itemSellingPrice: '',itemBellingPrice: '',itemCostPrice: 0,itemEntryDate: '',itemExpirationDate: ''}
                    ]};
                    $("#itemSupplierName").val('');
                    $('#itenPayPrice').val("");
                },
                error:function(request,response,error){
                    swal({
                        title: "إنتبه!",
                        text: "مشكلة: " + error,
                        type: "warning",
                        showCancelButton: false,
                        confirmButtonClass: "btn-warning",
                        confirmButtonText: "نعم",
                        closeOnConfirm: true
                    });
                }
            }
        };
        $.ajax(options);
    };
});
// app.directive("datePicker", function () {

//         function link(scope, element, attrs) {
//             // CALL THE "datepicker()" METHOD USING THE "element" OBJECT.
//             element.datepicker({
//                 dateFormat: "dd/mm/yy"
//             });
//         }

//         return {
//             require: 'ngModel',
//             link: link
//         };
// });
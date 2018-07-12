var app = angular.module('PERFUME', []);
app.controller('SupplyALL', function($scope, $http) {
    $scope.allEssence;
    $scope.allBottle;
    $scope.allItem;
    $scope.allSupplier;
    $scope.payPrice_items;
    $scope.supplyDate_items;
    $scope.supplierName_items;
    $scope.payPrice_accessories;
    $scope.supplyDate_accessories;
    $scope.supplierName_accessories;
    $scope.alcohol=[{}];
    angular.element(document).ready(function () {
        $scope.getAllEssence();
        $scope.getAllBottle();
        $scope.getAllAccessories();
        $scope.getAllSupplier();
        $scope.getAlcohol();
    });
    $scope.rowsItems = [
        {type:'',name:'',quantity:'',cost:'',selling:'',price:''},
        {type:'',name:'',quantity:'',cost:'',selling:'',price:''},
        {type:'',name:'',quantity:'',cost:'',selling:'',price:''},
        {type:'',name:'',quantity:'',cost:'',selling:'',price:''}
    ]
    $scope.rowsAccessories = [
        {name:'',quantity: '',cost:'',selling:'',expirationDate: '',price:''},
        {name:'',quantity: '',cost:'',selling:'',expirationDate: '',price:''},
        {name:'',quantity: '',cost:'',selling:'',expirationDate: '',price:''},
        {name:'',quantity: '',cost:'',selling:'',expirationDate: '',price:''}
    ]
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
    $scope.getAllEssence = function(){
        var options={
            type : "get",
            url : "../php/getAll.php",
            data: {"function":"getAllEssence"},
            dataType: 'json',
            async : false,
            cache : false,
            success : function(response,status) {
                $scope.allEssence=response;
                // for(var i= 0; i<$scope.allEssence.length;i++){
                //     if($scope.allEssence[i].type=="alc"){
                //         $scope.idAlcohol=$scope.allEssence[i].id;
                //     }
                // }
                // if($scope.idAlcohol==undefined){
                //     $scope.idAlcohol='noId';
                // }
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
    $scope.getAlcohol = function(){
        var options={
            type : "get",
            url : "../php/getAll.php",
            data: {"function":"getAlcohol"},
            dataType: 'json',
            async : false,
            cache : false,
            success : function(response,status) {
                $scope.allAlcohol=response;
                if($scope.allAlcohol==''){
                    $scope.alcohol[0].id='noId';
                } else if($scope.allAlcohol!=''){
                    $scope.alcohol[0].id=$scope.allAlcohol[0].id;
                }
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
        var options={
            type : "get",
            url : "../php/getAll.php",
            data: {"function":"getAllBottle"},
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
    $scope.getAllAccessories = function(){
        var options={
            type : "get",
            url : "../php/getAll.php",
            data: {"function":"getAllAccessories"},
            dataType: 'json',
            async : false,
            cache : false,
            success : function(response,status) {
                $scope.allAccessories=response;
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
        var options={
            type : "get",
            url : "../php/getAll.php",
            data: {"function":"getAllSupplier"},
            dataType: 'json',
            async : false,
            cache : false,
            success : function(response,status) {
                $scope.allSupplier=response;
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
    $scope.addEssenceName_Modal = function(){
        $('#addModal').modal('show');
        $('#bottleCapacity').hide();
        $scope.add_titleName = "تعريف اسانس جديد";
        $scope.add_labelName = "اسم الاسانس";
        $scope.add="";   
        $scope.capacity="";   
        inputNull("#add", 'false');
        inputNull("#capacity", 'false');
        $('#add').focus();
    };
    $scope.addBottleType_Modal = function(){
        $('#addModal').modal('show');
        $('#bottleCapacity').show();
        $scope.add_titleName = "تعريف قنينة جديدة";
        $scope.add_labelName = "نوع القنينة";
        $scope.add="";   
        $scope.capacity="";   
        inputNull("#add", 'false');
        inputNull("#capacity", 'false');
        $('#add').focus();
    };
    $scope.addAccessoriesName_Modal = function(){
        $('#addModal').modal('show');
        $('#bottleCapacity').hide();
        $scope.add_titleName = "تعريف اسم اكسسوار جديد";
        $scope.add_labelName = "اسم الإكسسوار";
        $scope.add="";   
        $scope.capacity=""; 
        inputNull("#add", 'false');
        inputNull("#capacity", 'false');
        $('#add').focus();
    }; 
    $scope.addRowItems = function() {
        $scope.rowsItems.push({type:'',name:'',quantity:'',cost:'',selling:'',price:''});
        $(".newRowItems").animatescroll();
    };
    $scope.addRowAccessories = function() {
        $scope.rowsAccessories.push({name:'',quantity: '',cost:'',selling:'',expirationDate: '',price:''});
        $(".newRowAccessories").animatescroll(); 
        $scope.$watch('rowsAccessories.expirationDate', function(newvalue,oldvalue) {
            $('.expirationDate').datepicker({ dateFormat: 'yy-mm-dd' });
        });
    }; 
    $scope.priceItemsRow = function(index){
        var totalRow = 0;
        for(var i=0;i<$scope.rowsItems.length;i++){
            if(i==index){
                totalRow=$scope.rowsItems[i].quantity*$scope.rowsItems[i].cost;
                if(totalRow!=0){
                    $scope.rowsItems[i].price=totalRow;
                    break; 
                }else{
                    $scope.rowsItems[i].price='';
                    break
                }
            }
        }
        $scope.changeTotalPriceItems();
    }
    $scope.changeTotalPriceItems = function() {
        var total = 0;
        angular.forEach($scope.rowsItems, function(col) {
            if(col.price!='' || col.price!=0)
            total += col.price;
        });
        if(total!=0){
            $scope.totalPriceItems=total;
        }else {
            $scope.totalPriceItems='';
        }
    }; 
    $scope.priceAccessoriesRow = function(index){
        var totalRow = 0;
        for(var i=0;i<$scope.rowsAccessories.length;i++){
            if(i==index){
                totalRow=$scope.rowsAccessories[i].quantity*$scope.rowsAccessories[i].cost;
                if(totalRow!=0){
                    $scope.rowsAccessories[i].price=totalRow;
                    break; 
                }else{
                    $scope.rowsAccessories[i].price='';
                    break
                }
            }
        }
        $scope.changeTotalPriceAccessories();
    }
    $scope.changeTotalPriceAccessories = function() {
        var total = 0;
        angular.forEach($scope.rowsAccessories, function(col) {
            if(col.price!='' || col.price!=0)
            total += col.price;
        });
        if(total!=0){
            $scope.totalPriceAccessories=total;
        }else {
            $scope.totalPriceAccessories='';
        }
    };
    $scope.addName = function(){
        var labelName=$scope.add_labelName;
        var add = $scope.add;
        var data='';
        if(add!="" && add!=undefined){
            if(labelName=="اسم الاسانس"){
                data= {'essence': add,'function': 'addEssence'}; 
            } else if(labelName=="نوع القنينة"){
                var capacity=$scope.capacity;
                if(capacity!="" && capacity!=undefined){
                    data= {'bottleType': add,'bottleCapacity': capacity,'function': "addBottleType"};
                } else if(capacity=="" || capacity==undefined){
                    inputNull("#capacity", 'true');
                }
            } else if(labelName=="اسم الإكسسوار") {
                data= {'accessories': add,'function': "addAccessories"};
            }
            if(data!=''){
            var options = {
                    type : "get",
                    url : '../php/supply.php',
                    data: data,
                    dataType: "json",
                    async : false,
                    cache : false,
                    success : function(response,status) {
                        if(labelName=="اسم الاسانس"){
                            $scope.getAllEssence();
                        }
                        else if(labelName=="نوع القنينة"){
                            $scope.getAllBottle();
                        }
                        else if(labelName=="اسم الإكسسوار"){
                            $scope.getAllAccessories();
                        }
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
        } else if(add=="" || add==undefined){
            inputNull("#add", 'true');
        }
    };
    $scope.addSupplyItems = function(){
        var msg = '';
        $scope.supplyEssence = [];
        $scope.supplyAlcohol = [];
        $scope.supplyBottle = [];
        var lengthSupplyItemsNoEmpty=0;
        for(var i = 0; i < $scope.rowsItems.length; i++){
            var selectType = $scope.rowsItems[i].type;
            var name=$scope.rowsItems[i].name;
            if(selectType != '' && name != undefined){
                lengthSupplyItemsNoEmpty++;
                if(selectType == 'essence'){
                    if(name !="" 
                        && $scope.rowsItems[i].quantity !="" && $scope.rowsItems[i].quantity !=undefined 
                        && $scope.rowsItems[i].cost !="" && $scope.rowsItems[i].cost !=undefined
                        && $scope.rowsItems[i].selling !="" && $scope.rowsItems[i].selling !=undefined
                        && $scope.rowsItems[i].price!="" && $scope.rowsItems[i].price!=undefined){
                        var listName='#listEssence'+i+' option';
                        var idE = $(listName).filter(function() {
                            return this.value == name;
                        }).data('id');
                        var idName = idE ?idE : 'noId';
                        if(idName =="noId"){
                            msg+="إسانس '"+name+"' : غيل مسجل. \n";
                        } else{ 
                            $scope.supplyEssence.push({
                                id: idName,
                                quantity:$scope.rowsItems[i].quantity,
                                cost:$scope.rowsItems[i].cost,
                                selling:$scope.rowsItems[i].selling,
                                price:$scope.rowsItems[i].price
                            });
                        }
                    } else{
                        msg+="إسانس '"+name+"' : معلومات ناقصة. \n";  
                    }
                }else if(selectType == 'alcohol'){
                    if($scope.rowsItems[i].quantity !="" && $scope.rowsItems[i].quantity !=undefined 
                        && $scope.rowsItems[i].cost !="" && $scope.rowsItems[i].cost !=undefined
                        && $scope.rowsItems[i].selling !="" && $scope.rowsItems[i].selling !=undefined
                        && $scope.rowsItems[i].price!="" && $scope.rowsItems[i].price!=undefined){
                        $scope.supplyAlcohol.push({
                            id:$scope.alcohol[0].id,
                            quantity:$scope.rowsItems[i].quantity,
                            cost:$scope.rowsItems[i].cost,
                            selling:$scope.rowsItems[i].selling,
                            price:$scope.rowsItems[i].price
                        });
                    } else{
                        msg+="كحول : معلومات ناقصة. \n";
                    }
                }else if(selectType == 'bottle'){
                    if(name !="" 
                        && $scope.rowsItems[i].quantity !="" && $scope.rowsItems[i].quantity !=undefined 
                        && $scope.rowsItems[i].cost !="" && $scope.rowsItems[i].cost !=undefined
                        && $scope.rowsItems[i].selling !="" && $scope.rowsItems[i].selling !=undefined
                        && $scope.rowsItems[i].price!="" && $scope.rowsItems[i].price!=undefined){
                        var listName='#listBottle'+i+' option';
                        var idB= $(listName).filter(function() {
                            return this.value == name;
                        }).data('id');
                        var idName = idB ?idB : 'noId';
                        if(idName =="noId"){
                            msg+="قنينة '"+name+"' : غيل مسجلة. \n";
                        } else{ 
                            $scope.supplyBottle.push({
                                id: idName,
                                quantity:$scope.rowsItems[i].quantity,
                                cost:$scope.rowsItems[i].cost,
                                selling:$scope.rowsItems[i].selling,
                                price:$scope.rowsItems[i].price
                            });
                        }
                    } else {
                        msg+="قنينة '"+name+"' : معلومات ناقصة. \n";
                    } 
                } 
            }
        }
        if(lengthSupplyItemsNoEmpty!=0){
            var supplierName=$('#supplierName_items').val();
            if(supplierName!="" && supplierName!=undefined){
                var listSupplierName='#listSupplierName_items'+' option';
                var id = $(listSupplierName).filter(function() {
                    return this.value == supplierName;
                }).data('id');
                var supplierId = id ?id : 'noId';
                if(supplierId =="noId"){
                    msg+="مورد '"+supplierName+"' : غيل مسجل. \n";
                }
            }else{
                msg+="مورد : معلومات ناقصة. \n";
            }
            var supplyDate = $('#supplyDate_items').val();
            if(supplyDate=='' || supplyDate==undefined){
                msg+="تاريخ : معلومات ناقصة. \n";
            }
            var payPrice=$('#payPrice_items').val();
            // alert(payPrice)
            if(payPrice=='' || payPrice==undefined ){
                msg+="المبلغ المدفوع : معلومات ناقصة. \n";
            }
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
        } else if(lengthSupplyItemsNoEmpty!=0){
            var supplyCode=document.getElementById('BIToBe').innerHTML;
            var supplyTotalPrice = $scope.totalPriceItems;
            // alert(supplyTotalPrice)
            var supplyRestPrice = supplyTotalPrice - payPrice;
            // var todayDate=getDate();
            var supplyEssenceDetails = JSON.stringify($scope.supplyEssence);
            var supplyAlcoholDetails = JSON.stringify($scope.supplyAlcohol);
            var supplyBottleDetails = JSON.stringify($scope.supplyBottle);
            var options = {
                type : "get",
                url : '../php/supply.php',
                data: {
                    'function':'addSupplyItems',
                    'supplyEssenceData':supplyEssenceDetails,
                    'supplyAlcoholData':supplyAlcoholDetails,
                    'supplyBottleData':supplyBottleDetails,
                    'supplierId':supplierId,
                    'supplyCode':supplyCode,
                    'supplyDate':supplyDate,
                    'supplyTotalPrice':supplyTotalPrice,
                    'supplyRestPrice':supplyRestPrice
                },
                dataType: "json",
                async : false,
                cache : false,
                success : function(response,status) {
                    location.reload();
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
        }else if(lengthSupplyItemsNoEmpty==0){
            swal({
              title: "لا يوجد فاتورة للإدخال",
              text: "",
              type: "warning",
              showCancelButton: false,
              confirmButtonClass: "btn-warning",
              confirmButtonText: "نعم",
              closeOnConfirm: true,
            });
        }  
    }
    $scope.addSupplyAccessories = function(){
        var msg = '';
        $scope.supplyAccessories = [];
        var lengthSupplyAccessoriesNoEmpty=0;
        for(var i = 0; i < $scope.rowsAccessories.length; i++){
            var name=$scope.rowsAccessories[i].name;
            if(name != undefined && name !="" ){
                lengthSupplyAccessoriesNoEmpty++;
                // alert()
                var exD = "#expirationDate"+i;
                var dateExp = $(exD).val(); 
                // alert(dateExp)
                if($scope.rowsAccessories[i].quantity !="" && $scope.rowsAccessories[i].quantity !=undefined 
                    && $scope.rowsAccessories[i].cost !="" && $scope.rowsAccessories[i].cost !=undefined
                    && $scope.rowsAccessories[i].selling !="" && $scope.rowsAccessories[i].selling !=undefined
                    && dateExp !="" 
                    && $scope.rowsAccessories[i].price!="" && $scope.rowsAccessories[i].price!=undefined){
                    // alert(name)
                    var listName='#listAccessories option';
                    var idA= $(listName).filter(function() {
                        return this.value == name;
                    }).data('id');
                    // alert(idA)
                    var idName = idA ?idA : 'noId';
                    if(idName =="noId"){
                        msg+="إكسسوار '"+name+"' : غيل مسجل. \n";
                    } else{
                        $scope.supplyAccessories.push({
                            id: idName,
                            quantity:$scope.rowsAccessories[i].quantity,
                            cost:$scope.rowsAccessories[i].cost,
                            selling:$scope.rowsAccessories[i].selling,
                            dateExp:dateExp,
                            price:$scope.rowsAccessories[i].price
                        });
                    }
                } else {
                    msg+="إكسسوار '"+name+"' : معلومات ناقصة. \n";
                } 
            }
        }
        if(lengthSupplyAccessoriesNoEmpty!=0){
            var supplierName=$('#supplierName_accessories').val();
            if(supplierName!="" && supplierName!=undefined){
                var listSupplierName='#listSupplierName_accessories'+' option';
                var id = $(listSupplierName).filter(function() {
                    return this.value == supplierName;
                }).data('id');
                var supplierId = id ?id : 'noId';
                if(supplierId =="noId"){
                    msg+="مورد '"+supplierName+"' : غيل مسجل. \n";
                }
            }else{
                msg+="مورد : معلومات ناقصة. \n";
            }
            var supplyDate = $('#supplyDate_accessories').val();
            if(supplyDate=='' || supplyDate==undefined){
                msg+="تاريخ : معلومات ناقصة. \n";
            }
            var payPrice=$('#payPrice_accessories').val();
            // alert(payPrice)
            if(payPrice=='' || payPrice==undefined ){
                msg+="المبلغ المدفوع : معلومات ناقصة. \n";
            }
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
        } else if(lengthSupplyAccessoriesNoEmpty!=0){
            var supplyCode=document.getElementById('BAToBe').innerHTML;
            var supplyTotalPrice = $scope.totalPriceAccessories;
            // alert(supplyTotalPrice)
            var supplyRestPrice = supplyTotalPrice - payPrice;
            // var todayDate=getDate();
            var supplyAccessoriesDetails = JSON.stringify($scope.supplyAccessories);
            var options = {
                type : "get",
                url : '../php/supply.php',
                data: {
                    'function':'addSupplyAccessories',
                    'supplyAccessoriesData':supplyAccessoriesDetails,
                    'supplierId':supplierId,
                    'supplyCode':supplyCode,
                    'supplyDate':supplyDate,
                    'supplyTotalPrice':supplyTotalPrice,
                    'supplyRestPrice':supplyRestPrice
                },
                dataType: "json",
                async : false,
                cache : false,
                success : function(response,status) {
                    location.reload();
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
        }else if(lengthSupplyItemsNoEmpty==0){
            swal({
              title: "لا يوجد فاتورة للإدخال",
              text: "",
              type: "warning",
              showCancelButton: false,
              confirmButtonClass: "btn-warning",
              confirmButtonText: "نعم",
              closeOnConfirm: true,
            });
        } 
    }
    $scope.cancelSupplyItems = function(){
        $scope.rowsItems = [
            {type:'',name:'',quantity:'',cost:'',selling:'',price:''},
            {type:'',name:'',quantity:'',cost:'',selling:'',price:''},
            {type:'',name:'',quantity:'',cost:'',selling:'',price:''},
            {type:'',name:'',quantity:'',cost:'',selling:'',price:''}
        ]
        $scope.supplierName_items='';
        $scope.supplyDate_items=getDate();
        $scope.totalPriceItems='';
    }
    $scope.cancelSupplyAccessories = function(){
        $scope.rowsAccessories = [
            {name:'',quantity: '',cost:'',selling:'',expirationDate: '',price:''},
            {name:'',quantity: '',cost:'',selling:'',expirationDate: '',price:''},
            {name:'',quantity: '',cost:'',selling:'',expirationDate: '',price:''},
            {name:'',quantity: '',cost:'',selling:'',expirationDate: '',price:''}
        ]
        $scope.supplierName_accessories='';
        $scope.supplyDate_accessories=getDate();
        $scope.totalPriceAccessories='';
    }
    
});
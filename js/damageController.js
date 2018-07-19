var app = angular.module('PERFUME', []);
app.controller('DamageALL', function($scope, $http) {
    $scope.essenceSearchResult;
    $scope.allAcc;
    $scope.essName;
    $scope.itemName;
    $scope.alcoholQuantity;
    $scope.essenceID;
    $scope.essenceQuantity = null;
    $scope.isDisabledEss = false;
    $scope.isDisabledAlc = false;
    $scope.isDisabledBot = false;
    $scope.isDisabledAcc = false;
    angular.element(document).ready(function () {
       $scope.getQuantityAlcohol();
    });
    $scope.safeApply = function(fn) {
        var phase = this.$root.$$phase;
        if(phase == '$apply' || phase == '$digest') {
            if(fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    }
    $scope.getQuantityAlcohol = function(){
        var options={
            type : "get",
            url : "../php/damage.php",
            data: {"function":"getQuantityAlcohol"},
            dataType: 'json',
            async : false,
            cache : false,
            success : function(response,status) {
                $scope.quan=response;
                $scope.alcoholSearchQuantity=$scope.quan[0]['quantity'];
                // alert($scope.alcoholSearchQuantity)
                $scope.safeApply();
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
    $scope.searchEssence = function(){
        $scope.essenceID = $('#essencesList option').filter(function() {
                    return this.value == $scope.essName;
          }).data('id');
        $scope.essenceID = $scope.essenceID ? $scope.essenceID : 'noId';
        if($scope.essenceID=='noId' && $scope.essName!=''){
            var options={
            type : "get",
            url : "../php/damage.php",
            data: {"function":"searchEssence","essenceName" : $scope.essName},
            dataType: 'json',
            async : false,
            cache : false,
            success : function(response,status) {
                $scope.essenceSearchResult=response;
                // $scope.quantityEssence=$scope.essenceSearchResult[0]['quantity'];
                $scope.safeApply();
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
        else
        {
            $scope.essenceSearchQuantity=$scope.essenceSearchResult[0]['quantity'];
            $scope.essenceSearchResult=null;
            $scope.essenceQuantity='';
            $scope.isDisabledEss=false;
            $('#essenceQuantity').css('background-color', '');
                // alert($scope.quantityEssence)
            // $scope.quantityEssence=null;
        }
    }
    $scope.searchBottle = function(){
        $scope.bottleID = $('#bottlesList option').filter(function() {
                    return this.value == $scope.bottleType;
          }).data('id');
        $scope.bottleID = $scope.bottleID ? $scope.bottleID : 'noId';
        if($scope.bottleID=='noId' && $scope.bottleType!=''){
            var options={
            type : "get",
            url : "../php/damage.php",
            data: {"function":"searchBottle","bottleKeywordSearch" : $scope.bottleType},
            dataType: 'json',
            async : false,
            cache : false,
            success : function(response,status) {
                $scope.bottleSearchResult=response;
                $scope.safeApply();
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
        else
        {
            $scope.bottleSearchQuantity=$scope.bottleSearchResult[0]['quantity'];
            $scope.bottleSearchResult=null;
            $scope.bottleQuantity='';
            $scope.isDisabledBot=false;
            $('#bottleQuantity').css('background-color', '');

        }
    }
    $scope.searchAccessory = function(){
        $scope.accessoryID = $('#accessoriesList option').filter(function() {
                    return this.value == $scope.itemName;
          }).data('id');
        $scope.accessoryID = $scope.accessoryID ? $scope.accessoryID : 'noId';
        if($scope.accessoryID=='noId' && $scope.itemName!=''){
            var options={
            type : "get",
            url : "../php/damage.php",
            data: {"function":"searchAccessory","accessoryName" :$scope.itemName},
            dataType: 'json',
            async : false,
            cache : false,
            success : function(response,status) {
                $scope.accessorySearchResult=response;
                $scope.safeApply();
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
        else
        {
            $scope.accessorySearchQuantity=$scope.accessorySearchResult[0]['quantity'];
            $scope.accessorySearchResult=null;
            $scope.itemQuantity='';
            $scope.isDisabledAcc=false;
            $('#itemQuantity').css('background-color', '');
        }
    }
    $scope.damageEssence = function(){
        var essenceQuantity = parseFloat($scope.essenceQuantity);
        var msg=''; 
        if(essenceQuantity == null || essenceQuantity<=0 || isNaN(essenceQuantity) ){
            msg+="الكمية : معلومات ناقصة. \n";
        }
        if($scope.essName ==null || $scope.essName==""){
            msg+="إسانس : معلومات ناقصة. \n";
        } else { 
             if($scope.essenceID =="noId"){
                msg+="إسانس '"+$scope.essName+"' : غيل مسجل. \n";
            }
        } 
        if(msg != ''){
            swal({
                title: "إنتبه!",
                text: msg ,
                type: "warning",
                showCancelButton: false,
                confirmButtonClass: "btn-warning",
                confirmButtonText: "نعم",
                closeOnConfirm: true
            });
        } else if(msg == '') {
            var url = "../php/damage.php";
            var data = {"function": "damageEssence","essenceId": $scope.essenceID,"essenceQuantity": essenceQuantity};
            var options = {
                type : "get",
                url : "../php/damage.php",
                data: data,
                dataType: "json",
                async : false,
                cache : false,
                success : function(response,status) {
                    $scope.essName= '';
                    $scope.essenceQuantity= "";
                    swal({
                        title: "تلف اسانس",
                        text: "تم تلف كمية الاسانس",
                        type: "success",
                        showCancelButton: false,
                        confirmButtonClass: "btn-success",
                        confirmButtonText: "Ok",
                        closeOnConfirm: true
                    });
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
    }
    $scope.damageAlcohol = function(){
        var alcoholQuantity = $scope.alcoholQuantity;
        if(alcoholQuantity ==null || alcoholQuantity <=0 ){
            swal({
                title: "إنتبه!",
                text: "الكمية : معلومات ناقصة." ,
                type: "warning",
                showCancelButton: false,
                confirmButtonClass: "btn-warning",
                confirmButtonText: "نعم",
                closeOnConfirm: true
            });
        } else {
            var options = {
                type : "get",
                url : '../php/damage.php',
                data: {"function":"damageAlcohol","alcoholQuantity": alcoholQuantity},
                dataType: "json",
                async : false,
                cache : false,
                success : function(response,status) {
                    $scope.alcoholQuantity= "";
                },
                error:function(request,response,error){
                    swal({
                        title: "إنتبه!",
                        text: "مشكلة: " + error ,
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
    }
    $scope.damageBottle = function(){
        var msg=''; 
        
        if($scope.bottleQuantity == null || $scope.bottleQuantity<=0 || isNaN($scope.bottleQuantity))
            msg+="الكمية : معلومات ناقصة. \n";
        
        if($scope.bottleType ==null || $scope.bottleType == ""){
            msg+="قنينة : معلومات ناقصة. \n";
        } else {
            if($scope.bottleID =="noId"){
                msg+="قنينة '"+$scope.bottleType+"' : غيل مسجلة. \n";
            }
        } 
        if(msg != ''){
            swal({
                title: "إنتبه!",
                text: msg ,
                type: "warning",
                showCancelButton: false,
                confirmButtonClass: "btn-warning",
                confirmButtonText: "نعم",
                closeOnConfirm: true
            });
        } else if(msg == '') {
            var options = {
                type : "get",
                url : '../php/damage.php',
                data: {"function": "damageBottle",'bottleId': $scope.bottleID,'bottleQuantity': $scope.bottleQuantity},
                dataType: "json",
                async : false,
                cache : false,
                success : function(response,status) {
                    $scope.bottleType= '';
                    $scope.bottleQuantity= "";
                    swal({
                        title:"تلف قنينة",
                        text: "تم تلف القنينة بالكمية المحددة",
                        type: "success",
                        showCancelButton: false,
                        confirmButtonClass: "btn-success",
                        confirmButtonText: "Ok",
                        closeOnConfirm: true
                    });
                },
                error:function(request,response,error){
                    swal({
                        title: "إنتبه!",
                        text: "مشكلة: " + error ,
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
    }
    $scope.damageItem = function(){
        var itemQuantity = parseInt($scope.itemQuantity);
        var msg=''; 
        if(itemQuantity == null || itemQuantity<=0 || isNaN(itemQuantity) ){
            msg+="الكمية : معلومات ناقصة. \n";
        }
        if($scope.itemName ==null || $scope.itemName==""){
            msg+="إكسسوار : معلومات ناقصة. \n";
        } else {
            if($scope.accessoryID =="noId"){
                msg+="إكسسوار '"+$scope.itemName+"' : غيل مسجل. \n";
            }
        } 
        if(msg != ''){
            swal({
                title: "إنتبه!",
                text: msg ,
                type: "warning",
                showCancelButton: false,
                confirmButtonClass: "btn-warning",
                confirmButtonText: "نعم",
                closeOnConfirm: true
            });
        } else if(msg == '') {
            var options = {
                type : "get",
                url : '../php/damage.php',
                data: {'function': 'damageItem','itemId': $scope.accessoryID,'itemQuantity': itemQuantity},
                dataType: "json",
                async : false,
                cache : false,
                success : function(response,status) {
                    $scope.itemName= '';
                    $scope.itemQuantity= "";
                    swal({
                        title: "تلف اكسسوار",
                        text: "تم تلف الاكسسوار بالكمية المحددة",
                        type: "success",
                        showCancelButton: false,
                        confirmButtonClass: "btn-success",
                        confirmButtonText: "Ok",
                        closeOnConfirm: true
                    });

                },
                error:function(request,response,error){
                    swal({
                        title: "إنتبه!",
                        text: "مشكلة: " + error ,
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
    }
    $scope.checkQuantity = function () {
        // debugger
        if ( $('#essenceQuantity').val()!='' && parseFloat($scope.essenceQuantity)/1000 > $scope.essenceSearchQuantity) {
            $scope.isDisabledEss=true;
            $('#essenceQuantity').css('background-color', '#FFFF99');
        } else if($('#essenceQuantity').val()!='' && parseFloat($scope.essenceQuantity)/1000 <= $scope.essenceSearchQuantity){
            $scope.isDisabledEss=false;
            $('#essenceQuantity').css('background-color', '');
        }
        if($('#alcoholQuantity').val()!='' && parseFloat($scope.alcoholQuantity)/1000 > $scope.alcoholSearchQuantity) {
            $scope.isDisabledAlc=true;
            $('#alcoholQuantity').css('background-color', '#FFFF99');
        } else if($('#alcoholQuantity').val()!='' && parseFloat($scope.alcoholQuantity)/1000 <= $scope.alcoholSearchQuantity){
            $scope.isDisabledAlc=false;
            $('#alcoholQuantity').css('background-color', '');
        }
        if($('#bottleQuantity').val()!='' && $scope.bottleQuantity > $scope.bottleSearchQuantity) {
            $scope.isDisabledBot=true;
            $('#bottleQuantity').css('background-color', '#FFFF99');
        } else if($('#bottleQuantity').val()!='' && $scope.bottleQuantity <= $scope.bottleSearchQuantity){
            $scope.isDisabledBot=false;
            $('#bottleQuantity').css('background-color', '');
        }
        if($('#itemQuantity').val()!='' && $scope.itemQuantity > $scope.accessorySearchQuantity) {
            $scope.isDisabledAcc=true;
            $('#itemQuantity').css('background-color', '#FFFF99');
        } else if($('#itemQuantity').val()!='' && $scope.itemQuantity <= $scope.accessorySearchQuantity){
            $scope.isDisabledAcc=false;
            $('#itemQuantity').css('background-color', '');
        }
    }
});
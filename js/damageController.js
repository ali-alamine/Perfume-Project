var app = angular.module('PERFUME', []);
app.controller('DamageALL', function($scope, $http) {
    $scope.essenceSearchResult;
    $scope.allAcc;
    $scope.essName;
    $scope.itemName;
    $scope.alcoholQuantity;
    $scope.essenceID;
    $scope.essenceQuantity = null;

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
            $scope.essenceSearchResult=null;
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
            $scope.bottleSearchResult=null;
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
            $scope.accessorySearchResult=null;
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
                        title:"تلف قنينية",
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
});
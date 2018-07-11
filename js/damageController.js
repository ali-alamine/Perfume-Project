var app = angular.module('PERFUME', []);
app.controller('DamageALL', function($scope, $http) {

    
    $scope.allEssenceName;
    $scope.allBottle;
    $scope.allAcc;
    $scope.essenceQuantity;
    $scope.essName;
    $scope.itemName;
    $scope.alcoholQuantity;
    
    
    angular.element(document).ready(function () {
        $scope.getAllEssenceName();
        $scope.getAllBottle();
        $scope.getAllAcc();
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

    $scope.getAllEssenceName = function(){

        var url="../php/damage.php";
        var data = {"function":"getAllEssence"};
        var options={
            type : "get",
            url : url,
            data: data,
            dataType: 'json',
            async : false,
            cache : false,
            success : function(response,status) {
                $scope.allEssenceName=response;
                console.log(response);
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
    }
    $scope.getAllBottle = function(){
        var url="../php/damage.php";
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
    }
    $scope.getAllAcc = function(){
        var url="../php/damage.php";
        var data = {"function":"getAllAcc"};
        var options={
            type : "get",
            url : url,
            data: data,
            dataType: 'json',
            async : false,
            cache : false,
            success : function(response,status) {
                $scope.allAcc=response;
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
    }

    $scope.damageEssence = function(){
        

        var essName=$scope.essName;
        var essenceQuantity = parseInt($scope.essenceQuantity);

        
        var msg=''; 
        if(essenceQuantity == null || essenceQuantity<=0){
            msg+="الكمية : معلومات ناقصة. \n";
        }
        if(essName ==null){
            msg+="إسانس : معلومات ناقصة. \n";
        } else { 
            var id = $('#essencesList option').filter(function() {
                return this.value == $scope.essName;
            }).data('id');

            
            var essenceId = id ? id : 'noId';
            if(essenceId =="noId"){
                msg+="إسانس '"+essenceName+"' : غيل مسجل. \n";
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
            var data = {"function": "damageEssence","essenceId": essenceId,"essenceQuantity": essenceQuantity};
            var options = {
                type : "get",
                url : "../php/damage.php",
                data: data,
                dataType: "json",
                async : false,
                cache : false,
                success : function(response,status) {
                    $scope.essName= '';
                    $scope.essenceQuantity= '';
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
        if(alcoholQuantity ==null){
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
                    $scope.alcoholQuantity= '';
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
        var bottleType = $scope.bottleType;
        var bottleQuantity = $scope.bottleQuantity;
        var msg=''; 
        if(bottleQuantity ==null){
            msg+="الكمية : معلومات ناقصة. \n";
        }
        if(bottleType ==null){
            msg+="قنينة : معلومات ناقصة. \n";
        } else { 
            var id = $('#bottlesList option').filter(function() {
                return this.value == bottleType;
            }).data('id');
            var bottleId = id ? id : 'noId';
            if(bottleId =="noId"){
                msg+="قنينة '"+bottleType+"' : غيل مسجلة. \n";
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
                data: {"function": "damageBottle",'bottleId': bottleId,'bottleQuantity': bottleQuantity},
                dataType: "json",
                async : false,
                cache : false,
                success : function(response,status) {
                    $scope.bottleType= '';
                    $scope.bottleQuantity= '';
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
        var itemName = $scope.itemName;
        var itemQuantity = $scope.itemQuantity;
        var msg=''; 
        if(bottleQuantity ==null){
            msg+="الكمية : معلومات ناقصة. \n";
        }
        if(itemName ==null){
            msg+="إكسسوار : معلومات ناقصة. \n";
        } else { 
            var id = $('#accessoriesList option').filter(function() {
                return this.value == itemName;
            }).data('id');
            var itemId = id ? id : 'noId';
            if(itemId =="noId"){
                msg+="إكسسوار '"+itemName+"' : غيل مسجل. \n";
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
                data: {'function': 'damageItem','itemId': itemId,'itemQuantity': itemQuantity},
                dataType: "json",
                async : false,
                cache : false,
                success : function(response,status) {
                    $scope.itemName= '';
                    $scope.itemQuantity= '';
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
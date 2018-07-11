var app = angular.module('PERFUME', []);
// var definitionPerfumeTable;
app.filter('reverse', function() {
    return function(items) {
    if (!items || !items.length) { return; }
    return items.slice().reverse();
    };
});
app.controller('PerfumeALL', function($scope, $http) {
    var id_total_drawer=localStorage.getItem('id_total_drawerKey');
    $scope.newDefPerfumeName="";
    $scope.nameE1="";
    $scope.nameE2="";
    $scope.botCapacity="كبس";
    $scope.customPerfumeCost=0.0;
    $scope.isKabessDisabled = false;
    $scope.isKabessNoDisabled = true;
    $scope.checkboxSavePerfume = false;
    $scope.perfumeEssenceQuantity2K=0;
    $scope.perfumeEssenceQuantity1K=0;
    $scope.facture=[];
    $scope.getPerfume=[];
    $scope.rowsSells = [
        {type:'',name: '',quantity: '',selling:'',price: '',profit:''},
        {type:'',name: '',quantity: '',selling:'',price: '',profit:''},
        {type:'',name: '',quantity: '',selling:'',price: '',profit:''},
        {type:'',name: '',quantity: '',selling:'',price: '',profit:''},
        {type:'',name: '',quantity: '',selling:'',price: '',profit:''}
    ]
    angular.element(document).ready(function () {
        $scope.getAllEssence();
        $scope.getAllBottle();
        $scope.getAlcohol();
        $scope.getTopAccessories();
        // $scope.getAllClient();
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
                for(var i= 0; i<$scope.allEssence.length;i++){
                    if($scope.allEssence[i].essenceName == "alcohol"){
                        $scope.alcoholId=$scope.allEssence[i].id;
                        $scope.bellingPriceAlcohol=$scope.allEssence[i].essenceBellingPrice;
                        $scope.sellingPriceAlcohol=$scope.allEssence[i].essenceSellingPrice;
                    }
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
    $scope.getAlcohol = function(){
        var options={
            type : "get",
            url : "../php/getAll.php",
            data: {"function":"getAlcohol"},
            dataType: 'json',
            async : false,
            cache : false,
            success : function(response,status) {
                $scope.alcohol=response;
                // if($scope.allAlcohol==''){
                //     $scope.alcohol[0].id='noId';
                // } else if($scope.allAlcohol!=''){
                //     $scope.alcohol[0].id=$scope.allAlcohol[0].id;
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
    $scope.getSearchClient = function(){
        var options={
            type : "get",
            url : "../php/client.php",
            data: {"function":"getSearchClient",'clientName':$scope.clientData},
            dataType: 'json',
            async : false,
            cache : false,
            success : function(response,status) {
                $scope.getClient=response;
                $scope.safeApply(function() {});
                var idClient = $('#clientNameList option').filter(function() {
                    return this.value == $scope.clientData;
                }).data('id');
                idClient = idClient ? idClient : 'noId';
                if(idClient!='noId'){
                    for(var i=0;i<$scope.getClient.length;i++){
                        if($scope.getClient[i].id==idClient){
                            $scope.clientPhone=$scope.getClient[i].phone;
                        }
                    }
                } else{
                    $scope.clientPhone='';
                }
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
    $scope.getAllPerfume = function(){
        var url="../php/getAll.php";
        var data = {"function":"getAllPerfume"};
        var options={
            type : "get",
            url : url,
            data: data,
            dataType: 'json',
            async : false,
            cache : false,
            success : function(response,status) {
                $scope.allPerfume=response;
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
    $scope.getSearchPerfume=function(){
        var options={
            type : "get",
            url : '../php/sell.php',
            data: {"function":"getSearchPerfume","searchPerfume":$scope.searchPerfume},
            dataType:'json',
            async : false,
            cache : false,
            success : function(response,status) {
                $scope.getPerfume=response;
                $scope.safeApply(function() {});
                var idPerfume = $('#listPerfume option').filter(function() {
                    return this.value == $scope.searchPerfume;
                }).data('id');
                idPerfume = idPerfume ? idPerfume : 'noId';
                if(idPerfume!='noId'){
                    for(var i=0;i<$scope.getPerfume.length;i++){
                        if($scope.getPerfume[i].id==idPerfume){
                            $scope.dPerfume.push({
                                name:$scope.getPerfume[i].name,
                                bottle:$scope.getPerfume[i].bottle,
                                name_e1:$scope.getPerfume[i].name_e1,
                                name_e2:$scope.getPerfume[i].name_e2,
                                quan_e1:$scope.getPerfume[i].quan_e1,
                                quan_e2:$scope.getPerfume[i].quan_e2,
                                quan_a:$scope.getPerfume[i].quan_a,
                                selling:$scope.getPerfume[i].selling,
                                cost:$scope.getPerfume[i].cost
                            }); 
                        }
                    }
                } else{
                    $scope.dPerfume=[];
                }
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
    $scope.getTopAccessories=function(){
        var options={
            type : "get",
            url : '../php/sell.php',
            data: {"function":"getTopAccessories"},
            dataType:'json',
            async : false,
            cache : false,
            success : function(response,status) {
                $scope.getTopAccessories=response;
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
    $scope.getSearchAccessories=function(){
        var options={
            type : "get",
            url : '../php/sell.php',
            data: {"function":"getSearchAccessories","searchAccessories":$scope.searchAccessories},
            dataType:'json',
            async : false,
            cache : false,
            success : function(response,status) {
                $scope.getAccessories=response;
                $scope.safeApply(function() {});
                var idAccessories = $('#listAccessories option').filter(function() {
                    return this.value == $scope.searchAccessories;
                }).data('id');
                idAccessories = idAccessories ? idAccessories : 'noId';
                if(idAccessories!='noId'){
                    for(var i=0;i<$scope.getAccessories.length;i++){
                        if($scope.getAccessories[i].id==idAccessories){
                            $scope.dAccessories.push({
                                id:$scope.getAccessories[i].id,
                                name:$scope.getAccessories[i].name,
                                selling:$scope.getAccessories[i].selling,
                                cost:$scope.getAccessories[i].cost
                            }); 
                        }
                    }
                } else{
                    $scope.dAccessories=[];
                }
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
    $scope.factureTotalPriceSell = function(){
        var t=0;
        $scope.facture.forEach(function(v) { t = t+ parseFloat(v.price)*parseFloat(v.quantity); });
        // alert(t)
        $scope.totalPriceSell = t ? t : '';
    }
    $scope.deleteRow = function(index){
        $scope.facture.splice(index,1);     
        $scope.factureTotalPriceSell();
    }
    $scope.cancelFactureSell = function(){
        $scope.facture = [];
        $scope.clientData='';
        $scope.clientPhone='';  
        $scope.factureTotalPriceSell();
    }
    $scope.addRow = function(){
        $scope.rowsSells.push({type:'',name: '',quantity: '',selling:'',price: '',profit:''});
        $(".newRow").animatescroll();
    }
    $scope.cleanInput = function(index){
        $scope.rowsSells[index].name='';
        $scope.rowsSells[index].quantity='';
        $scope.rowsSells[index].selling='';
        $scope.rowsSells[index].price='';
        $scope.rowsSells[index].profit='';
        if($scope.rowsSells[index].type=='alcohol'){
            $scope.rowsSells[index].name='كحول';
            $scope.rowsSells[index].selling=parseFloat($scope.alcohol[0].selling);
        }
    }
    $scope.changeSelling = function(index){
        var type = $scope.rowsSells[index].type;
        $scope.rowsSells[index].selling='';
        $scope.rowsSells[index].price='';
        $scope.rowsSells[index].quantity='';
        if(type == "essence"){
            var n="#nameEssence"+index;
            var name=$(n).val();
            var listType = n +' option';
            var eSPrice = $(listType).filter(function() {
                return this.value == name;
            }).data('price');
            var sellingPrice = eSPrice ?eSPrice : 'noId';
            if(sellingPrice != 'noId' && sellingPrice>0){
                $scope.rowsSells[index].selling=parseFloat(sellingPrice);
            } else{
                return '';
            }
        } else if(type == "bottle"){
            var n="#nameBottle"+index;
            var name=$(n).val();
            var listType = n +' option';
            var bSPrice = $(listType).filter(function() {
                return this.value == name;
            }).data('price');
            var sellingPrice = bSPrice ?bSPrice : 'noId';
            if(sellingPrice != 'noId' && sellingPrice>0){
                $scope.rowsSells[index].selling=parseFloat(sellingPrice);
            } else{
                return '';
            }
        } else{
            return '';
        } 
    }
    $scope.totalPriceRow = function(index){
        var total=0.0;
        var type = $scope.rowsSells[index].type;
        var quantity=$scope.rowsSells[index].quantity;
        var selling=$scope.rowsSells[index].selling;
        $scope.rowsSells[index].price='';
        if(type == "essence"){
            var n="#nameEssence"+index;
            var name=$(n).val();
            var listType = n +' option';
            var eSPrice = $(listType).filter(function() {
                return this.value == name;
            }).data('price');
            var sellingPrice = eSPrice ?eSPrice : 'noId';
            if(sellingPrice != 'noId'){
                total=parseFloat($scope.rowsSells[index].selling)*quantity;
                if(total>0){   
                   $scope.rowsSells[index].price=total;
                   var cost = $(listType).filter(function() {
                        return this.value == name;
                    }).data('cost');
                   $scope.rowsSells[index].profit=total-cost;
                } else{
                    return '';
                }
            }else{
                return '';
            }      
        } else if(type == "alcohol"){
            total=parseFloat($scope.rowsSells[index].selling)*quantity;
            if(total>0){
                $scope.rowsSells[index].price=total;
                $scope.rowsSells[index].profit=total-parseFloat($scope.alcohol[0].cost);
            }else{
                return '';
            }
        } else if(type == "bottle"){
            var n="#nameBottle"+index;
            var name=$(n).val();
            var listType = n +' option';
            var bSPrice = $(listType).filter(function() {
                return this.value == name;
            }).data('price');
            var sellingPrice = bSPrice ?bSPrice : 'noId';
            if(sellingPrice != 'noId'){
                total=parseFloat($scope.rowsSells[index].selling)*quantity;
                if(total>0){
                    $scope.rowsSells[index].price=total;
                    var cost = $(listType).filter(function() {
                        return this.value == name;
                    }).data('cost');
                    $scope.rowsSells[index].profit=total-cost;
                    // alert($scope.rowsSells[index].profit)
                }else{
                    return '';
                }
            }else{
                return '';
            }
        } else{
            return '';
        }
    }
    $scope.totalPriceSells = function(){
        var total = 0;
        angular.forEach($scope.rowsSells, function(col) {
            if(col.price!='' || col.price!=0)
            total += col.price;
        });
        if(total!=0){
            return total;
        }else {
            return '';
        }
    }
    $scope.cancelFactureSells = function(){
        $scope.rowsSells = [
            {type:'',name: '',quantity: '',selling:'',price: '',profit:''},
            {type:'',name: '',quantity: '',selling:'',price: '',profit:''},
            {type:'',name: '',quantity: '',selling:'',price: '',profit:''},
            {type:'',name: '',quantity: '',selling:'',price: '',profit:''},
            {type:'',name: '',quantity: '',selling:'',price: '',profit:''}
        ]
        $scope.clientSellsData='';
        $scope.clientSellsPhone='';
        $('#delDateSells').val(getDate());
    }
    $scope.checkQuantity = function (index,type) {
        // debugger
        var type = $scope.rowsSells[index].type;
        var name = $scope.rowsSells[index].name;
        var quantity = $scope.rowsSells[index].quantity;
        if(type == "essence"){
            var quantityIndex='#quantity'+index;
            var listName = '#nameEssence'+index+' option';
            var quantityEssence = $(listName).filter(function () {
                return this.value == name;
            }).data('quantity');
            if (quantity > quantityEssence) {
                $(quantityIndex).css('background-color', '#FFFF99');
            } else {
                $(quantityIndex).css('background-color', '');
            }
        } else if(type == "alcohol"){
            var quantityIndex='#quantity'+index;
            var quantityAlcohol=$scope.alcohol[0].quantity;
            if (quantity > quantityAlcohol) {
                $(quantityIndex).css('background-color', '#FFFF99');
            } else {
                $(quantityIndex).css('background-color', '');
            }
        } else if(type == "bottle"){
            var quantityIndex='#quantityBottle'+index;
            var listName = '#nameBottle'+index+' option';
            var quantityBottle = $(listName).filter(function () {
                return this.value == name;
            }).data('quantity');
            // alert(quantity)
            if (quantity > quantityBottle) {
                $(quantityIndex).css('background-color', '#FFFF99');
            } else {
                $(quantityIndex).css('background-color', '');
            }
        }
    }
    $scope.checkCost = function (index,type) {
        // debugger
        var type = $scope.rowsSells[index].type;
        var name = $scope.rowsSells[index].name;
        var selling = $scope.rowsSells[index].selling;
        if(type == "essence"){
            var sellingIndex='#selling'+index;
            var listName = '#nameEssence'+index+' option';
            var costEssence = $(listName).filter(function () {
                return this.value == name;
            }).data('cost');
            var profit=selling-costEssence;
            // alert(profit)
            if (profit<=0) {
                $(sellingIndex).css('background-color', '#FFFF99');
            } else {
                $(sellingIndex).css('background-color', '');
            }
        } else if(type == "alcohol"){
            var sellingIndex='#selling'+index;
            var costAlcohol=$scope.alcohol[0].cost;
            var profit=selling-costAlcohol;
            if (profit<=0) {
                $(sellingIndex).css('background-color', '#FFFF99');
            } else {
                $(sellingIndex).css('background-color', '');
            }
        } else if(type == "bottle"){
            var sellingIndex='#sellingBottle'+index;
            var listName = '#nameBottle'+index+' option';
            var costBottle = $(listName).filter(function () {
                return this.value == name;
            }).data('cost');
            var profit=selling-costBottle;
            if (profit<=0) {
                $(sellingIndex).css('background-color', '#FFFF99');
            } else {
                $(sellingIndex).css('background-color', '');
            }
        }
    }

    $scope.essenceName1Changed = function(){
        $scope.generatePefumeName();
    }

    $scope.essenceName2Changed = function(){
        $scope.generatePefumeName();
    }
    $scope.generatePefumeName=function(){
        $scope.newDefPerfumeName=$scope.nameE1+" "+$scope.nameE2+" | "+$scope.botCapacity;
    }
    $scope.bottleChanged=function(){

        if($scope.selectedBottle==null)
        {
            $scope.botCapacity="كبس";
            $scope.isKabessDisabled = false;
            $scope.isKabessNoDisabled = true;
            $scope.checkboxSavePerfume=false;
        }
        else
        {
            $scope.botCapacity=$scope.selectedBottle.capacity;
            $scope.isKabessDisabled = true;
            $scope.isKabessNoDisabled = false;
            $scope.checkboxSavePerfume=false;
        }
        
        if($scope.isKabessDisabled)
        {
            $scope.calculateAlcQuantity();
        }

        $scope.generatePefumeName();
        $scope.calculateCost();
    }
    $scope.calculateAlcQuantity = function(){
        $scope.perfumeAlcoholQuantity= $scope.botCapacity - $scope.perfumeEssenceQuantity1K - $scope.perfumeEssenceQuantity2K;
    };
    $scope.calculateCost = function(){
        var bottleCost=0.0;
        var essence1Cost=0.0;
        var essence2Cost=0.0;
        var alcCost=0.0;
        if($scope.selectedBottle!=null && $scope.selectedBottle!=undefined)
            bottleCost=parseFloat($scope.selectedBottle.cost);
        if($scope.selectedEssence1!=null)
            essence1Cost=parseFloat($scope.selectedEssence1.cost * $scope.perfumeEssenceQuantity1K/1000);
        if($scope.selectedEssence2!=null)
            essence2Cost=parseFloat($scope.selectedEssence2.cost * $scope.perfumeEssenceQuantity2K/1000);
        alcCost = parseFloat(parseFloat($scope.alcohol[0].cost) * $scope.perfumeAlcoholQuantity/1000)
        $scope.customPerfumeCost = parseFloat(bottleCost+essence1Cost+essence2Cost+alcCost);
        // alert($scope.selectedBottle)
    }
    $scope.essence1Changed = function(){
        if($scope.selectedEssence1==null){
            $scope.nameE1="";
            $scope.perfumeEssenceQuantity1K="";
            $scope.perfumeAlcoholQuantity="";
        }
        else
            $scope.nameE1=$scope.selectedEssence1.name;
        $scope.generatePefumeName();
        $scope.calculateCost();
    }
    $scope.essence2Changed = function(){
        if($scope.selectedEssence2==null){
            $scope.nameE2="";
            $scope.perfumeEssenceQuantity2K="";
            $scope.perfumeAlcoholQuantity="";
        }
        else
            $scope.nameE2=$scope.selectedEssence2.name;
        $scope.generatePefumeName();
        $scope.calculateCost();
    }
    $scope.essence1QunatityChanged = function(){
        $scope.calculateCost();
        if($scope.isKabessDisabled)
        {
            $scope.calculateAlcQuantity();
        }
    }
    $scope.essence2QunatityChanged = function(){
        $scope.calculateCost();
        if($scope.isKabessDisabled)
        {
            $scope.calculateAlcQuantity();
        }
    }
    $scope.alcQuantityChanged = function(){
        $scope.calculateCost();
    }
    $scope.addFacturePerfumeData=function(){
        var msg = '';
        var price = $('#perfumePrice').val();
        var quantity = $('#perfumeQuantity').val();
        if(price == undefined){
            msg+="السعر : معلومات ناقصة. \n";
        }
        if(quantity == undefined || quantity == 0){
            msg+="العدد : معلومات ناقصة. \n";
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
        } else{ 
            $scope.facture.push({
                type : 'perfume',
                item_id : $scope.getPerfume[0]['id'],//def id
                name : $scope.getPerfume[0]['name'],
                id_b : $scope.getPerfume[0]['id_b'],
                id_e1 : $scope.getPerfume[0]['id_e1'],
                id_e2 : $scope.getPerfume[0]['id_e2'],
                quan_e1 : $scope.getPerfume[0]['quan_e1'],
                quan_e1 : $scope.getPerfume[0]['quan_e1'],
                quan_a : $scope.getPerfume[0]['quan_a'],
                cost:$scope.getPerfume[0]['cost'],
                quantity : quantity, //quantity Perfume OR accessories
                price : price,
                profit:price -parseFloat($scope.getPerfume[0]['cost'])
            });
            $scope.factureTotalPriceSell();
            $('.sellPerfumeTable').animatescroll();
            $("#searchPerfume").val('');
            $("#searchPerfume").focus();
            $('#perfumeQuantity').val('');
            $scope.dPerfume=[];
        }
    }
    $scope.addFacturePerfumeKabbesData=function(){
        var msg = '';
        var price = $('#perfumeSellingPriceK').val();
        var quantity = $('#perfumeQuantityFactureK').val();
        if($scope.newDefPerfumeName=="" 
            || $scope.perfumeEssenceQuantity1K == null 
            || ($scope.selectedEssence1 != null && $scope.perfumeEssenceQuantity2K == null) 
            || $scope.perfumeAlcoholQuantity == null)
            msg+="عطر : معلومات ناقصة. \n";
        if(price == '')
            msg+="السعر : معلومات ناقصة. \n";
        if(quantity == '')
            msg+="العدد : معلومات ناقصة. \n";
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
        } else{
            var item_id,id_b,id_e1,id_e2,quan_e2;
            if($scope.checkboxSavePerfume==true) item_id='new'; else item_id=null;
            if($scope.selectedBottle!=null) id_b=$scope.selectedBottle.id; else id_b=null;
            if($scope.selectedEssence2!=null) id_e2=$scope.selectedEssence2.id; else id_e2=null;
            if($scope.perfumeEssenceQuantity2K!=null) quan_e2=$scope.perfumeEssenceQuantity2K; else quan_e2=null;
            $scope.facture.push({
                type : 'perfume',
                item_id :item_id,
                name : $scope.newDefPerfumeName,
                id_b : id_b,
                id_e1 : $scope.selectedEssence1.id,
                id_e2 : id_e2,
                quan_e1 : $scope.perfumeEssenceQuantity1K,
                quan_e2 : quan_e2,
                quan_a : $scope.perfumeAlcoholQuantity,
                cost:$scope.customPerfumeCost,
                quantity : $scope.perfumeQuantityFactureK, //quantity Perfume OR accessories
                price : $scope.customPerfumePrice,
                profit:price - parseFloat($scope.customPerfumeCost)
            });
            console.log($scope.facture)
            $scope.factureTotalPriceSell();
            $('.sellPerfumeTable').animatescroll();
            $("#searchPerfume").val('');
            $("#searchPerfume").focus();
            $scope.newDefPerfumeName='';
            $scope.customPerfumeCost='';
            $scope.selectedBottle=undefined;
            $scope.selectedEssence1=undefined;
            $scope.selectedEssence2=undefined;
            $scope.perfumeEssenceQuantity1K='';
            $scope.perfumeEssenceQuantity2K='';
            $scope.perfumeAlcoholQuantity='';
            $scope.customPerfumePrice='';
            $scope.perfumeQuantityFactureK='';
            $scope.checkboxSavePerfume=false;
            $scope.isKabessNoDisabled = true;
            $scope.isKabessDisabled = false;
        }
    }
    $scope.addFactureAccessoriesData=function(index,id,name,cost){
        var msg = '';
        // alert(index)
        if(index!='null'){ 
            var p = "#accessoriesSelling"+ index;
            var price = $(p).val();
            var q =  "#accessoriesQuantity" + index;
            var quantity=$(q).val();
            // alert(index)
        } else{
            // alert(id)
            var price = $("#accessoriesSelling").val();
            var quantity=$('#accessoriesQuantity').val();
        }
        // alert(quantity)
        if(price == '')
            msg+="السعر : معلومات ناقصة. \n";
        if(quantity == '')
            msg+="العدد : معلومات ناقصة. \n";
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
        } else{
            $scope.facture.push({
                type : 'accessories',
                item_id :id,
                name : name,
                id_b : null,
                id_e1 : null,
                id_e2 : null,
                quan_e1 : null,
                quan_e2 : null,
                quan_a : null,
                cost: cost,
                quantity : quantity, //quantity Perfume OR accessories
                price : price,
                profit:price - cost
            });
            console.log($scope.facture)
            $scope.factureTotalPriceSell();
            $('#searchAccessories').animatescroll();
            $("#searchAccessories").focus();
            $("#searchAccessories").val('');
            // $scope.accessoriesQuantity="";
            $(price).val('');
            $scope.dAccessories=[];
        }
    }
    $scope.addFactureSell = function(){
        if($scope.facture.length>0){
            var msg="";
            $scope.clientSell=[];
            var clientName = $('#clientName').val();
            if(clientName != '' && clientName != null){
            // alert(clientName)
                var listClient='#clientNameList option';
                var idC = $(listClient).filter(function() {
                    return this.value == clientName;
                }).data('id');
                var clientId = idC ?idC : 'noId';
                // alert(clientId)
                var phone=$('#clientPhone').val();
                // alert(phone)
                $scope.clientSell.push({
                    id: clientId,
                    name:clientName,
                    phone:phone
                });
            } 
            var orderDate = $('#delDateSell').val();
            if(orderDate=='' || orderDate==undefined){
                msg+="تاريخ : معلومات ناقصة. \n";
            }
            var orderPayPrice=$('#sellPayPrice').val();
            if(orderPayPrice=='' || orderPayPrice==undefined ){
                msg+="المبلغ المدفوع: معلومات ناقصة. \n";
            }
            var orderTotalPrice=$('#sellTotalPrice').val();
            if(orderTotalPrice=='' || orderTotalPrice==undefined ){
                msg+="مجموع الفاتورة: معلومات ناقصة. \n";
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
            } else {
                var orderCode=document.getElementById('SLToBe').innerHTML;
                var orderRestPrice = orderTotalPrice - orderPayPrice;
                var factureDetails = JSON.stringify($scope.facture);
                var clientDetails = JSON.stringify($scope.clientSell);
                var options = {
                    type : "get",
                    url : '../php/sell.php',
                    data: {
                        'function':'addOrderSell',
                        'factureData':factureDetails,
                        'clientData':clientDetails,
                        'orderCode':orderCode,
                        'orderDate':orderDate,
                        'orderTotalPrice':orderTotalPrice,
                        'orderRestPrice':orderRestPrice
                    },
                    dataType: "json",
                    async : false,
                    cache : false,
                    success : function(response,status) {
                        // alert("goooooood")
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
            }
        }else{
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
    $scope.addFactureSells = function(){
        var msg = '';
        $scope.orderEssence = [];
        $scope.orderAlcohol = [];
        $scope.orderBottle = [];
        $scope.client = []; //{id:'',name:'',phone:''}
        var lengthOrderNoEmpty=0;
        for(var i = 0; i < $scope.rowsSells.length; i++){
            var selectType = $scope.rowsSells[i].type;
            var name=$scope.rowsSells[i].name;
            if(selectType != '' && name != undefined){
            // alert(name)
                lengthOrderNoEmpty++;
                if(selectType == 'essence'){
                    if(name !="" 
                        && $scope.rowsSells[i].quantity !="" && $scope.rowsSells[i].quantity !=undefined 
                        && $scope.rowsSells[i].selling !="" && $scope.rowsSells[i].selling !=undefined){
                        var listName='#nameEssence'+i+' option';
                        var idE = $(listName).filter(function() {
                            return this.value == name;
                        }).data('id');
                        $scope.orderEssence.push({
                            id: idE,
                            quantity:$scope.rowsSells[i].quantity,
                            // selling:$scope.rowsSells[i].selling,
                            price:$scope.rowsSells[i].selling,
                            profit:$scope.rowsSells[i].profit
                        });
                    } else{
                        msg+="إسانس '"+name+"' : معلومات ناقصة. \n";  
                    }
                }else if(selectType == 'alcohol'){
                    if($scope.rowsSells[i].quantity !="" && $scope.rowsSells[i].quantity !=undefined 
                        && $scope.rowsSells[i].selling !="" && $scope.rowsSells[i].selling !=undefined){
                        $scope.orderAlcohol.push({
                            id:$scope.alcohol[0].id,
                            quantity:$scope.rowsSells[i].quantity,
                            // selling:$scope.rowsSells[i].selling,
                            price:$scope.rowsSells[i].selling,
                            profit:$scope.rowsSells[i].profit
                        });
                    } else{
                        msg+="كحول : معلومات ناقصة. \n";
                    }
                }else if(selectType == 'bottle'){
                    if(name !="" 
                        && $scope.rowsSells[i].quantity !="" && $scope.rowsSells[i].quantity !=undefined 
                        && $scope.rowsSells[i].selling !="" && $scope.rowsSells[i].selling !=undefined){
                        var listName='#nameBottle'+i+' option';
                        var idB= $(listName).filter(function() {
                            return this.value == name;
                        }).data('id');
                        $scope.orderBottle.push({
                            id: idB,
                            quantity:$scope.rowsSells[i].quantity,
                            // selling:$scope.rowsSells[i].selling,
                            price:$scope.rowsSells[i].selling,
                            profit:$scope.rowsSells[i].profit
                        });
                    } else {
                        msg+="قنينة '"+name+"' : معلومات ناقصة. \n";
                    } 
                } 
            }
        }
        if(lengthOrderNoEmpty!=0){
            var clientName = $('#clientSellsName').val();
            // alert(clientName)
            if(clientName != '' && clientName!=null){
                var listClient='#clientNameList option';
                var idC = $(listClient).filter(function() {
                    return this.value == clientName;
                }).data('id');
                var clientId = idC ?idC : 'noId';
                // alert(clientId)
                var phone=$('#clientPhone').val();
                // alert(phone)
                $scope.client.push({
                    id: clientId,
                    name:clientName,
                    phone:phone
                });
            } 
            var orderDate = $('#delDateSells').val();
            if(orderDate=='' || orderDate==undefined){
                msg+="تاريخ : معلومات ناقصة. \n";
            }
            var orderPayPrice=$('#sellsPayPrice').val();
            if(orderPayPrice=='' || orderPayPrice==undefined ){
                msg+="المبلغ المدفوع: معلومات ناقصة. \n";
            }
            var orderTotalPrice=$('#sellsTotalPrice').val();
            if(orderTotalPrice=='' || orderTotalPrice==undefined ){
                msg+="مجموع الفاتورة: معلومات ناقصة. \n";
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
        } else if(lengthOrderNoEmpty!=0){
            var orderCode=document.getElementById('SSToBe').innerHTML;
            var orderRestPrice = orderTotalPrice - orderPayPrice;
            var orderEssenceDetails = JSON.stringify($scope.orderEssence);
            var orderAlcoholDetails = JSON.stringify($scope.orderAlcohol);
            var orderBottleDetails = JSON.stringify($scope.orderBottle);
            var clientDetails = JSON.stringify($scope.client);
            var options = {
                type : "get",
                url : '../php/sell.php',
                data: {
                    'function':'addOrderSells',
                    'orderEssenceData':orderEssenceDetails,
                    'orderAlcoholData':orderAlcoholDetails,
                    'orderBottleData':orderBottleDetails,
                    'clientData':clientDetails,
                    'orderCode':orderCode,
                    'orderDate':orderDate,
                    'orderTotalPrice':orderTotalPrice,
                    'orderRestPrice':orderRestPrice
                },
                dataType: "json",
                async : false,
                cache : false,
                success : function(response,status) {
                    // alert("goooooood")
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
        }else if(lengthOrderNoEmpty==0){
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

});
var app = angular.module('PERFUME', []);
var definitionPerfumeTable;
app.controller('DefinitionPerfumeALL', function($scope, $compile) {

    $scope.allDefinitionPerfume;
    $scope.allEssence;
    $scope.allBottle;
    $scope.editDefPerInfo;
    $scope.newDefPerInfo=[{"item_name":"","item_cost":0,"item_selling":0,"item_b_IID":"NULL",
    "item_e1_IID":" ","item_e2_IID":" ","item_quan_e1":0,"item_quan_e2":0,"item_quan_a":0}];

    $scope.updatedDefPerfInfo=[{"item_iid":"","item_name":"","item_cost":0,"item_selling":0,"item_b_IID":"NULL",
    "item_e1_IID":" ","item_e2_IID":" ","item_quan_e1":0,"item_quan_e2":0,"item_quan_a":0}];
    $scope.alcInfo;
    $scope.totalCost;
    $scope.bottleCapacity;
    angular.element(document).ready(function () {
        $scope.getAllBottle();
        $scope.getAllEssence();
        $scope.getAlcInfo();

    });

    definitionPerfumeTable=$('#definitionPerfumeTable').DataTable({
        "paging": true,
        "serverSide": true,
        "processing":false,
        "ordering": true,
        "responsive" : false,
        "pagingType": "full_numbers",
        "searching": true,
        "lengthMenu": [[5,10, 25,50,100,150,200,300,400, -1], [5,10, 25,50,100,150,200,300,400, "الكل"]],
        "ajax": {
            type : "get",
            url : "../php/definitionPerfume.php",
            data :{"function":"perfumeDefintionDataTable"},
            cache:false,
            async:false             
        },
        columns: [
            { "data": "item_name" },
            { "data": "bottleName" },
            { "data": "item_cost" },
            { "data":"item_selling"},
            { "data": "item_IID",
            "searchable": false,
             "width": "8%",
            "sortable": false,
            "render": function (data,meta,row) {
             return '<input ng-click="disableDef('+data+')" id="disableDef" type="button" class="glyphicon btn-danger btn" value="&#xe014" title="إلغاء"/> <input ng-click="updateModal('+data+')" id="updatePerfume" type="button" class="glyphicon btn-info btn" value="&#xf044" title="تعديل"/> ';}
        
        }
        ],
        "oLanguage": {
            "sProcessing":   "جارٍ التحميل...",
            "sLengthMenu":   "أظهر _MENU_ مدخلات",
            "sZeroRecords":  "لم يعثر على أية سجلات",
            "sInfo":         "إظهار _START_ إلى _END_ من أصل _TOTAL_ مدخل",
            "sInfoEmpty":    "يعرض 0 إلى 0 من أصل 0 سجل",
            "sInfoFiltered": "(منتقاة من مجموع _MAX_ مُدخل)",
            "sInfoPostFix":  "",
            "sSearch":       "ابحث:",
            "sUrl":          "",
            "oPaginate": {
                "sFirst":    "الأول",
                "sPrevious": "السابق",
                "sNext":     "التالي",
                "sLast":     "الأخير"
            }
        },
        createdRow: function(row, data, dataIndex) {
            $compile(angular.element(row).contents())($scope);
               
        }
    });

    $scope.updateModal = function(defPerfumeID){
        $('#perfumeEditModal').modal('show');
        $scope.getDefPerInfo(defPerfumeID);

        $scope.updatedDefPerfInfo[0].item_iid=$scope.editDefPerInfo[0].item_IID;
        $scope.updatedDefPerfInfo[0].item_name=$scope.editDefPerInfo[0].item_name;
        $scope.updatedDefPerfInfo[0].item_cost=$scope.editDefPerInfo[0].item_cost;
        $scope.updatedDefPerfInfo[0].item_selling=$scope.editDefPerInfo[0].item_selling;
        $scope.updatedDefPerfInfo[0].item_quan_e1=$scope.editDefPerInfo[0].item_quan_e1;
        $scope.updatedDefPerfInfo[0].item_quan_e2=$scope.editDefPerInfo[0].item_quan_e2;
        $scope.updatedDefPerfInfo[0].item_quan_a=$scope.editDefPerInfo[0].item_quan_a;

        $scope.bottleChangedEdit();
        $scope.essence1NameChangedEdit();
        $scope.essence2NameChangedEdit();

    }

    $scope.getDefPerInfo = function(defPerfumeID){
        var options = {
                type : "get",
                url : "../php/definitionPerfume.php",
                data: {"id":defPerfumeID ,"function":"getPerfumeForEdit"},
                dataType: "json",
                async : false,
                cache : false,
                success : function(response,status) {
                    $scope.editDefPerInfo=response;
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

            for(var i = 0; i < $scope.editDefPerInfo.length; i++){
                var obj =  $scope.editDefPerInfo[i];
                for(var prop in obj){
                    if(obj.hasOwnProperty(prop) && obj[prop] !== null && !isNaN(obj[prop])){
                        obj[prop] = +obj[prop];   
                    }
                }
            }

            if($scope.editDefPerInfo[0].item_name_ess2==0)
                $scope.editDefPerInfo[0].item_name_ess2="";

    }

    $scope.EditPerfume = function(){

        var msg="";
        if($scope.updatedDefPerfInfo[0].item_b_IID=="NULL")
            msg=msg+"select a bottle  ";
        if($scope.updatedDefPerfInfo[0].item_e1_IID==" ")
            msg=msg+"select ess1  ";
        if($scope.updatedDefPerfInfo[0].item_quan_e1==0)
            msg=msg+"enter quan ess1  ";
        if($scope.updatedDefPerfInfo[0].item_selling==0)
            msg=msg+"enter price  ";

        $scope.updatedDefPerfInfo[0].item_selling=$scope.editDefPerInfo[0].item_selling;

        if(msg=="")
        {
            var editDefPerfJSON = JSON.stringify($scope.updatedDefPerfInfo);
            var options = {
                type : "get",
                url : "../php/definitionPerfume.php",
                data :{"defPerfumeInfo":editDefPerfJSON ,"function":"updateDefPer"},
                dataType :'json',
                async : false,
                cache : false,
                success : function(response,status){
                    definitionPerfumeTable.ajax.reload();
                    $('#perfumeEditModal').modal('toggle');

                    swal({
                        title:" ",
                        text:"added",
                        type:"success",
                        showConfirmButton:false,
                        timer:600
                    });

                },
                error : function(request,response,error){
                    alert(error)
                }
            };
            $.ajax(options); 
        }
        else
        {
            swal({
                title: "Please contact your software developer",
                text: msg,
                type: "warning",
                showCancelButton: false,
                confirmButtonClass: "btn-info",
                confirmButtonText: "Ok",
                closeOnConfirm: true
                });
        }
    };
    $scope.disableDef = function(defPerfumeID) {

        if(defPerfumeID != ""){
            swal({
                title: "هل تريد إلغاء هذا العطر؟",
                text: "",
                type: "warning",
                showCancelButton: true,
                cancelButtonClass: "btn-info",
                cancelButtonText: "لا",
                confirmButtonClass: "btn-info",
                confirmButtonText: "نعم",
                closeOnConfirm: false
            },function(){
                var options = {
                    type : "get",
                    url : '../php/definitionPerfume.php',
                    data: {"function": "disableDefPerfume","id":defPerfumeID},
                    dataType: 'json',
                    async : false,
                    cache : false,
                    success : function(response,status) {
                        definitionPerfumeTable.ajax.reload(null,false);
                        swal({
                            title:" ",
                            text:"removed",
                            type:"success",
                            showConfirmButton:false,
                            timer:600
                        });
                       
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
            });
        }else{
            swal({
              title: "Please contact your software developer",
              text: "ERROR: ID Not Found",
              type: "warning",
              showCancelButton: false,
              confirmButtonClass: "btn-info",
              confirmButtonText: "Ok",
              closeOnConfirm: true
            });
        }
    };

     
    $scope.addPerfumeModal=function(){
        $scope.newDefPerInfo=[{"item_name":"","item_cost":0,"item_selling":0,"item_b_IID":"NULL",
         "item_e1_IID":" ","item_e2_IID":" ","item_quan_e1":0,"item_quan_e2":0,"item_quan_a":0}];
        $scope.bottleCapacity=0;
        $('#perfumeModal').modal('show');
       
        $scope.bottleType = '';
        $scope.essenceName1 = '';
        $scope.essenceName2 = '';
        $scope.alcoholQuantity = '';
        $('#perfumePrice').val('');
        $('#perfumeCost').val('');    
        $('#bottleType').focus();
    };
    $scope.addPerfume = function(){

        var msg="";
        if($scope.newDefPerInfo[0].item_b_IID=="NULL")
            msg=msg+"select a bottle  ";
        if($scope.newDefPerInfo[0].item_e1_IID==" ")
            msg=msg+"select ess1  ";
        if($scope.newDefPerInfo[0].item_quan_e1==0)
            msg=msg+"enter quan ess1  ";
        if($scope.newDefPerInfo[0].item_selling==0)
            msg=msg+"enter price  ";



        if(msg=="")
        {
            var newDefPerfumeJSON = JSON.stringify($scope.newDefPerInfo);
            var options = {
                type : "get",
                url : "../php/definitionPerfume.php",
                data :{"defPerfumeInfo":newDefPerfumeJSON ,"function":"addDefPer"},
                dataType :'json',
                async : false,
                cache : false,
                success : function(response,status){
                    definitionPerfumeTable.ajax.reload();
                    $('#perfumeModal').modal('toggle');

                    swal({
                        title:" ",
                        text:"added",
                        type:"success",
                        showConfirmButton:false,
                        timer:600
                    });

                },
                error : function(request,response,error){
                    alert(error)
                }
            };
            $.ajax(options); 
        }
        else
        {
            swal({
                title: "Please contact your software developer",
                text: msg,
                type: "warning",
                showCancelButton: false,
                confirmButtonClass: "btn-info",
                confirmButtonText: "Ok",
                closeOnConfirm: true
                });
        }
    };
    $scope.essence1QuanChanged = function(){

        $scope.calculateAlcQuantity();
        $scope.calculateTotalCost();
    };
    $scope.essence2QuanChanged = function(){
        $scope.calculateAlcQuantity();
        $scope.calculateTotalCost();
    };
    $scope.essence1NameChanged = function(){

        var idEssence1 = $('#listEssenceName1 option').filter(function() {
                return this.value == $scope.essenceName1;
            }).data('id');
        idEssence1 = idEssence1 ?idEssence1 : ' ';
        $scope.newDefPerInfo[0].item_e1_IID=idEssence1;


        $scope.generatePerfumeName();
        $scope.calculateTotalCost();
    };
    $scope.essence2NameChanged = function(){

        var idEssence2 = $('#listEssenceName2 option').filter(function() {
                return this.value == $scope.essenceName2;
            }).data('id');
        idEssence2 = idEssence2 ?idEssence2 : ' ';

        $scope.newDefPerInfo[0].item_e2_IID=idEssence2;

        $scope.generatePerfumeName();
        $scope.calculateTotalCost();
    };
    $scope.bottleChanged=function(){
        var idBottle = $('#listBottleType option').filter(function() {
            return this.value == $scope.bottleType;
        }).data('id');

        idBottle = idBottle ?idBottle : 'NULL';

        var bottleCapacity = $('#listBottleType option').filter(function() {
            return this.value == $scope.bottleType;
        }).data('capacity');

        bottleCapacity = bottleCapacity ?bottleCapacity : 'NULL';
        $scope.newDefPerInfo[0].item_b_IID=idBottle;
        $scope.bottleCapacity = bottleCapacity;
        
        $scope.calculateAlcQuantity();
        $scope.generatePerfumeName();
        $scope.calculateTotalCost();
    }
    
    $scope.bottleChangedEdit=function(){
        var idBottle = $('#listBottleTypeEdit option').filter(function() {
            return this.value == $scope.editDefPerInfo[0].bottleInfo;
        }).data('id');

        idBottle = idBottle ?idBottle : 'NULL';

        var bottleCapacity = $('#listBottleTypeEdit option').filter(function() {
            return this.value == $scope.editDefPerInfo[0].bottleInfo;
        }).data('capacity');

        bottleCapacity = bottleCapacity ?bottleCapacity : 'NULL';

        $scope.updatedDefPerfInfo[0].item_b_IID=idBottle;
        $scope.bottleCapacityEdit = bottleCapacity;

        $scope.calculateAlcQuantityEdit();
        $scope.generatePerfumeNameEdit();
        $scope.calculateTotalCostEdit();
    }
    $scope.essence1NameChangedEdit = function(){

        var idEssence1 = $('#listEssenceName1Edit option').filter(function() {
                return this.value == $scope.editDefPerInfo[0].item_name_ess1;
            }).data('id');
        idEssence1 = idEssence1 ?idEssence1 : ' ';
        $scope.updatedDefPerfInfo[0].item_e1_IID=idEssence1;


        $scope.generatePerfumeNameEdit();
        //$scope.calculateTotalCostEdit();
    };
    $scope.essence2NameChangedEdit = function(){

        var idEssence2 = $('#listEssenceName2Edit option').filter(function() {
                return this.value == $scope.editDefPerInfo[0].item_name_ess2;
            }).data('id');
        idEssence2 = idEssence2 ?idEssence2 : ' ';
        $scope.updatedDefPerfInfo[0].item_e2_IID=idEssence2;



        $scope.generatePerfumeNameEdit();
        //$scope.calculateTotalCostEdit();
    };
    $scope.essence1QuanChangedEdit = function(){

        $scope.calculateAlcQuantityEdit();
        $scope.calculateTotalCostEdit();
    };
    $scope.essence2QuanChangedEdit = function(){
        $scope.calculateAlcQuantityEdit();
        $scope.calculateTotalCostEdit();
    };

    $scope.calculateAlcQuantity = function(){
        $scope.newDefPerInfo[0].item_quan_a=$scope.bottleCapacity - $scope.newDefPerInfo[0].item_quan_e1-$scope.newDefPerInfo[0].item_quan_e2;
        if($scope.newDefPerInfo[0].item_quan_a<0 && $scope.newDefPerInfo[0].item_b_IID!='noId' )
        {
            swal({
                    title: "خطأ",
                    text: "كمية الاسانس أكبر من سعة القنينة",
                    type: "warning",
                    showCancelButton: false,
                    confirmButtonClass: "btn-info",
                    confirmButtonText: "Ok",
                    closeOnConfirm: true
                    });
            $scope.newDefPerInfo[0].item_quan_e1=0;
            $scope.newDefPerInfo[0].item_quan_e2=0;
            $scope.newDefPerInfo[0].item_quan_a=$scope.bottleCapacity - $scope.newDefPerInfo[0].item_quan_e1-$scope.newDefPerInfo[0].item_quan_e2;

        }

        if($scope.newDefPerInfo[0].item_quan_a<0 && $scope.newDefPerInfo[0].item_b_IID=='noId' )
        {
            swal({
                    title: "خطأ",
                    text: "قم بتحديد القنينة",
                    type: "warning",
                    showCancelButton: false,
                    confirmButtonClass: "btn-info",
                    confirmButtonText: "Ok",
                    closeOnConfirm: true
                    });
            $scope.newDefPerInfo[0].item_quan_e1=0;
            $scope.newDefPerInfo[0].item_quan_e2=0;
            $scope.newDefPerInfo[0].item_quan_a=$scope.bottleCapacity - $scope.newDefPerInfo[0].item_quan_e1-$scope.newDefPerInfo[0].item_quan_e2;

        }
    };

    $scope.calculateAlcQuantityEdit = function(){
        $scope.updatedDefPerfInfo[0].item_quan_a=$scope.bottleCapacityEdit - $scope.updatedDefPerfInfo[0].item_quan_e1-$scope.updatedDefPerfInfo[0].item_quan_e2;
        if($scope.updatedDefPerfInfo[0].item_quan_a<0 && $scope.updatedDefPerfInfo[0].item_b_IID!='noId' )
        {
            swal({
                    title: "خطأ",
                    text: "كمية الاسانس أكبر من سعة القنينة",
                    type: "warning",
                    showCancelButton: false,
                    confirmButtonClass: "btn-info",
                    confirmButtonText: "Ok",
                    closeOnConfirm: true
                    });
            $scope.updatedDefPerfInfo[0].item_quan_e1=0;
            $scope.updatedDefPerfInfo[0].item_quan_e2=0;
            $scope.updatedDefPerfInfo[0].item_quan_a=$scope.bottleCapacityEdit - $scope.updatedDefPerfInfo[0].item_quan_e1-$scope.updatedDefPerfInfo[0].item_quan_e2;

        }

        if($scope.updatedDefPerfInfo[0].item_quan_a<0 && $scope.updatedDefPerfInfo[0].item_b_IID=='noId' )
        {
            swal({
                    title: "خطأ",
                    text: "قم بتحديد القنينة",
                    type: "warning",
                    showCancelButton: false,
                    confirmButtonClass: "btn-info",
                    confirmButtonText: "Ok",
                    closeOnConfirm: true
                    });
            $scope.updatedDefPerfInfo[0].item_quan_e1=0;
            $scope.updatedDefPerfInfo[0].item_quan_e2=0;
            $scope.updatedDefPerfInfo[0].item_quan_a=$scope.bottleCapacityEdit - $scope.updatedDefPerfInfo[0].item_quan_e1-$scope.updatedDefPerfInfo[0].item_quan_e2;

        }
    };

    $scope.generatePerfumeName = function(){
        $scope.newDefPerInfo[0].item_name=$scope.essenceName1+" "+$scope.essenceName2+" | "+$scope.bottleCapacity;
    };

    $scope.generatePerfumeNameEdit = function(){
        $scope.updatedDefPerfInfo[0].item_name=$scope.editDefPerInfo[0].item_name_ess1+" "+$scope.editDefPerInfo[0].item_name_ess2+" | "+$scope.bottleCapacityEdit;

    };

    $scope.calculateTotalCost = function(){
        var bottleCost = $('#listBottleType option').filter(function() {
            return this.value == $scope.bottleType;
        }).data('cost');

        bottleCost = bottleCost ? bottleCost : 0 ;
        
        

        var alcoholCost = parseFloat((parseFloat($scope.alcInfo[0].alc_cost)/1000) * parseFloat($scope.newDefPerInfo[0].item_quan_a));
        

        alcoholCost = alcoholCost ? alcoholCost : 0 ;
       

        var essenceQuantity1 = parseInt($scope.newDefPerInfo[0].item_quan_e1);
        var essenceQuantity2 = parseInt($scope.newDefPerInfo[0].item_quan_e2);
        
        var essence1LitterCost = $('#listEssenceName1 option').filter(function() {
             return this.value == $scope.essenceName1;
         }).data('cost');

        var essence2LitterCost = $('#listEssenceName2 option').filter(function() {
             return this.value == $scope.essenceName2;
         }).data('cost');

        var essence1Cost = parseFloat((essenceQuantity1*essence1LitterCost)/1000);
        var essence2Cost = parseFloat((essenceQuantity2*essence2LitterCost)/1000);

        
        essence1Cost = essence1Cost ?essence1Cost : 0;
        essence2Cost = essence2Cost ?essence2Cost : 0;
        
        $scope.newDefPerInfo[0].item_cost=parseFloat(bottleCost)+parseFloat(alcoholCost)+parseFloat(essence1Cost)+parseFloat(essence2Cost);
        $scope.newDefPerInfo[0].item_cost=Math.round($scope.newDefPerInfo[0].item_cost * 100) / 100
    };

    $scope.calculateTotalCostEdit = function(){
        var bottleCost = $('#listBottleTypeEdit option').filter(function() {
            return this.value == $scope.editDefPerInfo[0].bottleInfo;
        }).data('cost');

        bottleCost = bottleCost ? bottleCost : 0 ;
        
        

        var alcoholCost = parseFloat((parseFloat($scope.alcInfo[0].alc_cost)/1000) * parseFloat($scope.newDefPerInfo[0].item_quan_a));
        

        alcoholCost = alcoholCost ? alcoholCost : 0 ;
       

        var essenceQuantity1 = parseInt($scope.newDefPerInfo[0].item_quan_e1);
        var essenceQuantity2 = parseInt($scope.newDefPerInfo[0].item_quan_e2);
        
        var essence1LitterCost = $('#listEssenceName1 option').filter(function() {
             return this.value == $scope.essenceName1;
         }).data('cost');

        var essence2LitterCost = $('#listEssenceName2 option').filter(function() {
             return this.value == $scope.essenceName2;
         }).data('cost');

        var essence1Cost = parseFloat((essenceQuantity1*essence1LitterCost)/1000);
        var essence2Cost = parseFloat((essenceQuantity2*essence2LitterCost)/1000);

        
        essence1Cost = essence1Cost ?essence1Cost : 0;
        essence2Cost = essence2Cost ?essence2Cost : 0;
        
        $scope.newDefPerInfo[0].item_cost=parseFloat(bottleCost)+parseFloat(alcoholCost)+parseFloat(essence1Cost)+parseFloat(essence2Cost);
        $scope.newDefPerInfo[0].item_cost=Math.round($scope.newDefPerInfo[0].item_cost * 100) / 100
    };


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
    $scope.getAllEssence=function(){
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
    $scope.getAllBottle=function(){
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
        $.ajax(options);  // checked
    };
    $scope.getAlcInfo=function(){
        var url="../php/definitionPerfume.php";
        var data = {"function":"getAlcInfo"};
        var options={
            type : "get",
            url : url,
            data: data,
            dataType: 'json',
            async : false,
            cache : false,
            success : function(response,status) {
                $scope.alcInfo=response;
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

});
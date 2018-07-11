var app = angular.module('PERFUME', []);

var drawerDataTable;

app.controller('DrawerALL', function($scope, $compile) {

    $scope.clientID='noId';
    
    var id_total_drawer=localStorage.getItem('id_total_drawerKey');
    angular.element(document).ready(function () {
       $scope.getTodayTotalDrawer();
    });
    


    drawerDataTable=$('#drawerTable').DataTable({
        "order": [[ 0, "desc" ]],
        "paging": true,
        "serverSide": true,
        "processing":true,
        "ordering": true,
        "pagingType": "full_numbers",
        "searching": true,
        "lengthMenu": [[5,10, 25,50,100,150,200,300,400, -1], [5,10, 25,50,100,150,200,300,400, "الكل"]],
        "ajax": {
            type : "get",
            url : "../php/drawer.php",
            data :{"function":"drawerDataTable"},
            cache:false,
            async:false             
        },
        columns: [
            { "data":  "drawer_Date"},
            { "data": "drawer_total_withdraw" },
            { "data":  "drawer_total_return"},
            { "data":"drawer_profit_total"},
            {"data":"drawer_sell_total"}
            
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
           
            
               
        },
        
    });

    
    $('#drawerTable tbody').on('dblclick', 'tr', function () {
    var data = drawerDataTable.row( this ).data();
    $scope.drawerDayDetails(data['drawer_Date'])
    });

    
    $scope.drawerDayDetails = function(drawerDate){
        $scope.selectedDate=drawerDate;
        $scope.safeApply();
        $scope.getDrawerHeader(drawerDate);
        $scope.getDrawerDetails(drawerDate);
        $("#dialog-drawer").dialog('open');

    }

    $scope.getDrawerHeader = function(drawerDate){
        var options = {
            type : "get",
            url : '../php/drawer.php',
            data: {'dateD': drawerDate,'function': "getDrawerHeaderByDate"},
            dataType: "json",
            async : false,
            cache : false,
            success : function(response,status) {
                $scope.drawerHeaderInfo=response;
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

    $scope.getDrawerDetails = function(drawerDate){
        var options = {
            type : "get",
            url : '../php/drawer.php',
            data: {'dateD': drawerDate,'function': "getDrawerDetailsByDate"},
            dataType: "json",
            async : false,
            cache : false,
            success : function(response,status) {
                $scope.drawerDetailsInfo=response;
                $scope.safeApply();
                console.log($scope.drawerDetailsInfo)
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

    $scope.searchClient = function(){

        var clientID = $('#clientNameList option').filter(function() {
                    return this.value == $scope.clientName;
        }).data('id');

        $scope.clientID = clientID ? clientID : 'noId';


        if($scope.clientID=='noId' && $scope.clientName!=''){

            var options={
            type : "get",
            url : "../php/client.php",
            data: {"function":"getSearchClient","clientName" : $scope.clientName},
            dataType: 'json',
            async : false,
            cache : false,
            success : function(response,status) {
                $scope.allClient=response;
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
            $scope.allClient=null;
        }
    };

	$scope.modalReturnAmount=function(){
		$("#drawerModal").modal('show');
        $('#inputClient').show();
		$scope.drawerModal_titleName='إرجاع مبلغ إلى الصندوق';
		$scope.drawerModal_btnName='إرجاع';
        $scope.clientName='';
        $scope.amount='';
        $scope.reason='';
        $("#amount").css("border","");
        $("#reason").css("border","");
        $("#amount").focus();
	}
	$scope.modalWithdrawalAmount=function(){
		$("#drawerModal").modal('show');
        $('#inputClient').hide();
		$scope.drawerModal_titleName='سحب مبلغ من الصندوق';
		$scope.drawerModal_btnName='سحب';
        $scope.amount='';
        $scope.reason='';      
        $("#amount").css("border","");
        $("#reason").css("border","");
        $("#amount").focus();
	}

     // swal({
     //            title: "هل تريد إلغاء هذا الزبون؟",
     //            text: "",
     //            type: "warning",
     //            showCancelButton: true,
     //            cancelButtonClass: "btn-info",
     //            cancelButtonText: "لا",
     //            confirmButtonClass: "btn-info",
     //            confirmButtonText: "نعم",
     //            closeOnConfirm: false
     //        },function(){


    $scope.withdrawalTotalDrawer=function(){
        swal({
            title: "هل انت متأكد؟",
            text: "انت تقوم بسحب المبلغ الكلى الموجود في الصندوق !",
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn-danger",
            confirmButtonText: "نعم, انا متأكد !",
            closeOnConfirm: false
            }, 
            function () {
                var options = {
                    type : "get",
                    url : '../php/drawer.php',
                    data: {'function': "withdrawalTotalDrawer"},
                    dataType: "json",
                    async : false,
                    cache : false,
                    success: function () {
                        $scope.getTodayTotalDrawer();
                        swal({
                            title:"سحب كلي" ,
                            text: "تم سحب الكلي للصندوق",
                            type: "success",
                            showCancelButton: false,
                            confirmButtonClass: "btn-success",
                            confirmButtonText: "Ok",
                            closeOnConfirm: true
                        });
                    },
                    error: function (request,response,error) {
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
        );
    }

    $scope.getTodayTotalDrawer = function(){
        var options = {
            type : "get",
            url : '../php/drawer.php',
            data: {'function': "getTodayTotalDrawer"},
            dataType: "json",
            async : false,
            cache : false,
            success : function(response,status) {
                $scope.totalDrawer = response["total"];
                console.log(response)
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

    $scope.addDrawer = function(){

        var btnName=$scope.drawerModal_btnName;
        var amount=$scope.amount;
        var reason=$scope.reason;

        if(amount!='' && amount!=null){
            if(btnName=='سحب'){
                var options = {
                    type : "get",
                    url : '../php/drawer.php',
                    data: {'amount': amount,'reason': reason,'function': "withdrawalAmount"},
                    dataType: "json",
                    async : false,
                    cache : false,
                    success : function(response,status) {
                        $("#drawerModal").modal('hide');
                        drawerDataTable.ajax.reload(null,false);
                        swal({
                            title: " سحب من الصندوق ",
                            text: "تم سحب المبلغ من الصندوق بنجاح",
                            type: "success",
                            showCancelButton: false,
                            confirmButtonClass: "btn-success",
                            confirmButtonText: "Ok",
                            closeOnConfirm: true
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
            }else if(btnName=='إرجاع'){

                var msg='';
                if($scope.clientID == 'noId'){
                    msg = 'زبون: اسم غير مسجل. \n';
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
                    var options = {
                        type : "get",
                        url : '../php/drawer.php',
                        data: {'clientId':$scope.clientID,'amount': amount,'reason': reason,'function': "returnAmount"},
                        dataType: "json",
                        async : false,
                        cache : false,
                        success : function(response,status) {
                            $("#drawerModal").modal('hide');
                            drawerDataTable.ajax.reload(null,false);
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
            }
        }else if(amount=='' || amount==null){
            $("#amount").css("border","solid red 1px");
        }
        
        $scope.getTodayTotalDrawer();
    }
});
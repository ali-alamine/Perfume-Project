var app = angular.module('PERFUME', []);
app.filter('reverse', function() {
    return function(items) {
    if (!items || !items.length) { return; }
    return items.slice().reverse();
    };
});


var supplierTable;

app.controller('Client&SupplierALL', function($scope, $compile) {
    $scope.client;
    $scope.supplier;
    $scope.newClient=[{"Name":"","Phone":"","Address":""}];
    $scope.newSupplier=[{"Name":"","Phone":"","Address":"","debit":""}]; 
    $scope.allClients;

    

    var clientTable=$('#clientTable').DataTable({
    //     dom: 'Bfrtip',
    //     buttons: [
    //     'copy', 'excel', 'pdf','print'
    // ],
        "processing": true,
        "paging": true,
        "serverSide": true,
        "processing":true,
        "ordering": true,
        "pagingType": "full_numbers",
        "searching": true,
        "lengthMenu": [[5,10, 25,50,100,150,200,300,400, -1], [5,10, 25,50,100,150,200,300,400, "الكل"]],
        "ajax": {
            type : "get",
            url : "../php/client.php",
            data :{"function":"getAllClients"},
            cache:false,
            async:false             
        },
        columns: [
            { "data": "client_fullName" },
            { "data": "client_phone" },
            { "data": "client_address" },
            { "data": "client_debit" },
            { "data":"CID",
            "searchable": false,
            "width":"10%",
            "sortable": false,
            "render": function (data,meta,row) {
             return '<input ng-click="removeClient('+data+')" id="deleteClientBtn" type="button" class="glyphicon btn-danger btn" value="&#xe014" title="إلغاء"/> <input ng-click="updateModal('+data+')" id="deleteClientBtn" type="button" class="glyphicon btn-info btn" value="&#xf044" title="تعديل"/> ';}}
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

clientTable.buttons().container().appendTo( $('#test', clientTable.table().container() ) );


    supplierTable=$('#supplierTable').DataTable({
        "paging": true,
        "serverSide": true,
        "processing":true,
        "ordering": true,
        "pagingType": "full_numbers",
        "searching": true,
        "lengthMenu": [[5,10, 25,50,100,150,200,300,400, -1], [5,10, 25,50,100,150,200,300,400, "الكل"]],
        "ajax": {
            type : "get",
            url : "../php/client.php",
            data :{"function":"getAllSuppliers"},
            cache:false,
            async:false             
        },
        columns: [
            { "data": "supplier_name" },
            { "data": "supplier_phone" },
            { "data": "supplier_address" },
            { "data": "supplier_debit" },
            { "data":"SRID",
            "searchable": false,
            "width":"10%",
            "sortable": false,
            "render": function (data,meta,row) {
             return '<input ng-click="removeSupplier('+data+')" id="deleteClientBtn" type="button" class="glyphicon btn-danger btn" value="&#xe014" title="إلغاء"/> <input ng-click="updateModalSupplier('+data+')" id="updateSupplier" type="button" class="glyphicon btn-info btn" value="&#xf044" title="تعديل"/> ';}}
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
    
    $('.dataTables_filter input[type="search"]').
      css({'width':'800px','display':'inline-block','border':'1px solid blue','border-radius':'5px'});

    $scope.updateModal = function(clientId){
        
        var options = {
            type : "get",
            url : "../php/client.php",
            data :{"id":clientId ,"function":"getClientByID"},
            dataType :'json',
            async : false,
            cache : false,
            success : function(response,status){
                $scope.editClientInfo = response;
               
            },
            error : function(request,response,error){
                alert(error)
            }
        };
        $.ajax(options);
        $('#clientEditModal').modal('show');
        $("#clientEditName").focus(); 
        inputNull("#clientEditName",false);
        $("#clientPhone").css("border","");
        $("#clientEditName").css("border","");
        $("#clientEditName").focus(); 
    }

    $scope.updateModalSupplier = function(supplierID){
        var options = {
            type : "get",
            url : "../php/client.php",
            data :{"id":supplierID ,"function":"getSupplierByID"},
            dataType :'json',
            async : false,
            cache : false,
            success : function(response,status){
                $scope.editSupplierInfo = response;
            },
            error : function(request,response,error){
                alert(error)
            }
        };
        $.ajax(options);
        $('#supplierModalEdit').modal('show');
        $("#supplierNameEdit").focus(); 
        inputNull("#supplierNameEdit",false);
        $("#supplierPhoneEdit").css("border","");
        $("#supplierNameEdit").css("border","");
        $("#supplierNameEdit").focus(); 
    }

    $scope.editClient = function(){
        if($scope.editClientInfo[0].name=="")
        {
           inputNull("#clientEditName",true);
            return;
        }

        var editClientInfoJSON = JSON.stringify($scope.editClientInfo);
        var options = {
            type : "get",
            url : "../php/client.php",
            data :{"clientInfo":editClientInfoJSON ,"function":"updateClient"},
            dataType :'json',
            async : false,
            cache : false,
            success : function(response,status){
                clientTable.ajax.reload(null,false);
                swal({
                    title:" ",
                    text:"updated",
                    type:"success",
                    showConfirmButton:false,
                    timer:600
                });
                 $('#clientEditModal').modal('toggle');

            },
            error : function(request,response,error){
                alert(error)
            }
        };
        $.ajax(options);
        $scope.editClientInfo=[{"id":"","name":"","phone":"","address":""}];
    }
    $scope.editSupplier = function(){
        if($scope.editSupplierInfo[0].name=="")
        {
           inputNull("#supplierNameEdit",true);
            return;
        }

        var editSupplierInfoJSON = JSON.stringify($scope.editSupplierInfo);
        var options = {
            type : "get",
            url : "../php/client.php",
            data :{"supplierInfo":editSupplierInfoJSON ,"function":"updateSupplier"},
            dataType :'json',
            async : false,
            cache : false,
            success : function(response,status){
                supplierTable.ajax.reload(null,false);
                swal({
                    title:" ",
                    text:"updated",
                    type:"success",
                    showConfirmButton:false,
                    timer:600
                });
                 $('#supplierModalEdit').modal('toggle');

            },
            error : function(request,response,error){
                alert(error)
            }
        };
        $.ajax(options);
        
    }
    
    $scope.removeClient = function(clientID){
       if(clientID != ""){
            swal({
                title: "هل تريد إلغاء هذا الزبون؟",
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
                    url : '../php/client.php',
                    data: {"function": "removeClient","id":clientID},
                    dataType: 'json',
                    async : false,
                    cache : false,
                    success : function(response,status) {
                        
                        if(response["msg"] == "deleted")
                        {
                            swal({
                                title: "Client",
                                text: response["msg"],
                                type: "info",
                                showCancelButton: false,
                                confirmButtonClass: "btn-info",
                                confirmButtonText: "Ok",
                                closeOnConfirm: true
                            }); 
                            clientTable.ajax.reload(null,false);
                        }
                        else
                        {
                            swal({
                                title: "Error",
                                text: response["msg"] ,
                                type: "warning",
                                showCancelButton: false,
                                confirmButtonClass: "btn-info",
                                confirmButtonText: "Ok",
                                closeOnConfirm: true
                        });
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
            });
        }else{
            swal({
              title: "Please contact your software developer",
              text: "ERROR: Id Not Found",
              type: "warning",
              showCancelButton: false,
              confirmButtonClass: "btn-info",
              confirmButtonText: "Ok",
              closeOnConfirm: true
            });
        }
    };
    $scope.removeSupplier = function(supplierID){
       if(supplierID != ""){
            swal({
                title: "هل تريد إلغاء هذا المورد؟",
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
                    url : '../php/client.php',
                    data: {"function": "removeSupplier","id":supplierID},
                    dataType: 'json',
                    async : false,
                    cache : false,
                    success : function(response,status) {
                        
                        if(response["msg"] == "deleted")
                        {
                            swal({
                                title: "مورد",
                                text: response["msg"],
                                type: "info",
                                showCancelButton: false,
                                confirmButtonClass: "btn-info",
                                confirmButtonText: "Ok",
                                closeOnConfirm: true
                            }); 
                            supplierTable.ajax.reload(null,false);
                        }
                        else
                        {
                            swal({
                                title: "Error",
                                text: response["msg"] ,
                                type: "warning",
                                showCancelButton: false,
                                confirmButtonClass: "btn-info",
                                confirmButtonText: "Ok",
                                closeOnConfirm: true
                        });
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
    $scope.addClient = function(){

        if($scope.newClient[0].Name=="")
        {
           inputNull("#clientName",true);
            return;
        }

        var newClientInfo = JSON.stringify($scope.newClient);
        var options = {
            type : "get",
            url : "../php/client.php",
            data :{"clientInfo":newClientInfo ,"function":"addClient"},
            dataType :'json',
            async : false,
            cache : false,
            success : function(response,status){
                clientTable.ajax.reload();
                $('#clientModal').modal('toggle');
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
        $scope.newClient=[{"Name":"","Phone":"","Address":""}];
    };
    $scope.addSupplierModal = function(){

        $('#supplierModal').modal('show');
        inputNull("#supplierName",false);
        $scope.supplierModal_titleName= "إضافة مورد جديد";
        $scope.supplierModal_btnName='إضافة';
        $("#supplierPhone").css("border","");
        $("#supplierName").css("border","");
        $("#supplierName").focus();
    };
    $scope.addClientModal=function(){
        $('#clientModal').modal('show');
        inputNull("#clientName",false);
        $scope.clientModal_titleName= "إضافة زبون جديد";
        $scope.clientModal_btnName='إضافة';
        $("#clientPhone").css("border","");
        $("#clientName").css("border","");
        $("#clientName").focus();
    };
    $scope.addSupplier = function(){

        if($scope.newSupplier[0].Name=="")
        {
           inputNull("#supplierName",true);
            return;
        }

        var newSupplierInfo = JSON.stringify($scope.newSupplier);
        var options = {
            type : "get",
            url : "../php/client.php",
            data :{"supplierInfo":newSupplierInfo ,"function":"addSupplier"},
            dataType :'json',
            async : false,
            cache : false,
            success : function(response,status){
                supplierTable.ajax.reload();
                $('#supplierModal').modal('toggle');
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
        $scope.newSupplier=[{"Name":"","Phone":"","Address":"","debit":""}]; 
    };
});
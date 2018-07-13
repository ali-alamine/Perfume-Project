var app = angular.module('PERFUME', []);
var supplyInvoicesTable;
var sellTable;
var sellsTable;
app.controller('FactureALL', function($scope, $compile) {
    $scope.supplyInvoiceHeader;
    $scope.sellsInvoiceHeader;
    supplyInvoicesTable=$('#supplyInvoicesTable').DataTable({
        "order": [[ 1, "desc" ]],
        "paging": true,
        "serverSide": true,
        "processing":true,
        "ordering": true,
        "pagingType": "full_numbers",
        "searching": true,
        "lengthMenu": [[5,10, 25,50,100,150,200,300,400, -1], [5,10, 25,50,100,150,200,300,400, "الكل"]],
        "ajax": {
            type : "get",
            url : "../php/history.php",
            data :{"function":"supplyInvoicesDataTable"},
            cache:false,
            async:false             
        },
        columns: [
            { "data": "sup_det_code"},
            { "data":  "sup_det_date"},
            { "data": "supplier_name" },
            { "data":  "sup_det_total_price"},
            { "data":"sup_det_rem_amount"},
            { "data":"SDID",
            "searchable": false,
            "sortable": false,
            "render": function (data,meta,row) {
            return '<input ng-click="showSupplyDetailDialog('+data+')" id="showDetails" type="button" class="glyphicon btn-info btn" value="&#xf044" title="عرض"/>'+
            ' <input ng-click="removeFactureSupply('+data+')" id="deleteSupply" type="button" class="glyphicon btn-danger btn" value="&#xe014" title="إلغاء"/>';}}
            
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
    sellsTable=$('#sellsTable').DataTable({
        "paging": true,
        "serverSide": true,
        "processing":true,
        "ordering": true,
        "pagingType": "full_numbers",
        "searching": true,
        "order": [[ 0, "desc" ]],
        "lengthMenu": [[5,10, 25,50,100,150,200,300,400, -1], [5,10, 25,50,100,150,200,300,400, "الكل"]],
        "ajax": {
            type : "get",
            url : "../php/history.php",
            data :{"function":"sellsInvoicesDataTable"},
            cache:false,
            async:false             
        },
        columns: [
            { "data": "ord_det_code"},
            { "data":  "ord_det_date"},
            { "data": "client_fullName" },
            { "data":  "ord_det_total_price"},
            { "data":"ord_det_rem_amount"},
            { "data":"ODID",
            "searchable": false,
            "sortable": false,
            "render": function (data,meta,row) {
            return '<input ng-click="showSellsDetailDialog('+data+')" id="showSellsDetails" type="button" class="glyphicon btn-info btn" value="&#xf044" title="عرض"/> '+
            '<input ng-click="removeFacture('+data+')" id="deleteFacture" type="button" class="glyphicon btn-danger btn" value="&#xe014" title="إلغاء"/>';}}
            
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
    sellTable=$('#sellTable').DataTable({
        "paging": true,
        "serverSide": true,
        "processing":true,
        "ordering": true,
        "pagingType": "full_numbers",
        "searching": true,
        "order": [[ 0, "desc" ]],
        "lengthMenu": [[5,10, 25,50,100,150,200,300,400, -1], [5,10, 25,50,100,150,200,300,400, "الكل"]],
        "ajax": {
            type : "get",
            url : "../php/history.php",
            data :{"function":"sellInvoicesDataTable"},
            cache:false,
            async:false             
        },
        columns: [
            { "data": "ord_det_code"},
            { "data":  "ord_det_date"},
            { "data": "client_fullName" },
            { "data":  "ord_det_total_price"},
            { "data":"ord_det_rem_amount"},
            { "data":"ODID",
            "searchable": false,
            "sortable": false,
            "render": function (data,meta,row) {
            return '<input ng-click="showSellDetailDialog('+data+')" id="showSellDetails" type="button" class="glyphicon btn-info btn" value="&#xf044" title="عرض"/> '+
            '<input ng-click="removeFacture('+data+')" id="deleteFacture" type="button" class="glyphicon btn-danger btn" value="&#xe014" title="إلغاء"/>';}}
            
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
    $scope.showSupplyDetailDialog = function(supplyInvoiceID){
        var options={
            type : "get",
            url : "../php/history.php",
            data: {'function':'supplyinvoiceHeader','id': supplyInvoiceID},
            dataType: 'json',
            async : false,
            cache : false,
            success : function(response,status) { 
                $scope.supplyInvoiceHeader=response;
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
        var invoiceCode=$scope.supplyInvoiceHeader.sup_det_code;
        var subStrings = invoiceCode.split("-", 2);
        $('#dialog-factureSupply').dialog('open');
        if(subStrings[0]=='BA')
        {
            $('.type').hide();
            $('.typeItem').show();
            var options={
            type : "get",
            url : "../php/history.php",
            data: {'function':'accSupplyInvoiceDetails','id': supplyInvoiceID},
            dataType: 'json',
            async : false,
            cache : false,
            success : function(response,status) { 
                $scope.accSupplyInvoiceDetails=response;
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
        else
        {
            $('.type').show();
            $('.typeItem').hide();
            var options={
            type : "get",
            url : "../php/history.php",
            data: {'function':'itemsSupplyInvoiceDetails','id': supplyInvoiceID},
            dataType: 'json',
            async : false,
            cache : false,
            success : function(response,status) { 
                $scope.itemSupplyInvoiceDetails=response;
                for(var i=0;i<$scope.itemSupplyInvoiceDetails.length;i++)
                {
                    if($scope.itemSupplyInvoiceDetails[i].com_type=='bot')
                    {
                        $scope.itemSupplyInvoiceDetails[i].item_name = $scope.itemSupplyInvoiceDetails[i].item_name +" | "+
                         $scope.itemSupplyInvoiceDetails[i].com_capacity;
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
        } 
    };
    $scope.showSellsDetailDialog = function(sellsInvoiceID){
        var options={
            type : "get",
            url : "../php/history.php",
            data: {'function':'sellsInvoiceHeader','id': sellsInvoiceID},
            dataType: 'json',
            async : false,
            cache : false,
            success : function(response,status) { 
                $scope.sellsInvoiceHeader=response;
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

        $('#dialog-factureSells').dialog('open');

        var options={
            type : "get",
            url : "../php/history.php",
            data: {'function':'sellsInvoiceDetails','id': sellsInvoiceID},
            dataType: 'json',
            async : false,
            cache : false,
            success : function(response,status) { 
                $scope.allSellsDetail=response;
                $scope.safeApply(function() {});
                for(var i=0;i<$scope.allSellsDetail.length;i++)
                {
                    if($scope.allSellsDetail[i].com_type=='bot')
                    {
                        $scope.allSellsDetail[i].item_name = $scope.allSellsDetail[i].item_name +" | "+
                         $scope.allSellsDetail[i].com_capacity;
                    }
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
    $scope.showSellDetailDialog = function(sellInvoiceID){
        var options={
            type : "get",
            url : "../php/history.php",
            data: {'function':'sellsInvoiceHeader','id': sellInvoiceID},
            dataType: 'json',
            async : false,
            cache : false,
            success : function(response,status) { 
                $scope.sellsInvoiceHeader=response;
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

        $('#dialog-factureSell').dialog('open');

        var options={
            type : "get",
            url : "../php/history.php",
            data: {'function':'sellInvoiceDetails','id': sellInvoiceID},
            dataType: 'json',
            async : false,
            cache : false,
            success : function(response,status) { 
                $scope.allSellDetail=response;
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
    $scope.removeFacture = function(id){
        if(id != ""){
            swal({
                title: "هل تريد إلغاء هذه الفاتورة؟",
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
                    url : '../php/history.php',
                    data: {"function": "removeFactureSupply","id":id},
                    dataType: 'json',
                    async : false,
                    cache : false,
                    success : function(response,status) {
                        if(response["msg"] == "إلغاء")
                        {
                            swal({
                                title: "فاتورة",
                                text: response["msg"],
                                type: "info",
                                showCancelButton: false,
                                confirmButtonClass: "btn-info",
                                confirmButtonText: "Ok",
                                closeOnConfirm: true
                            }); 
                            if($('#factureSellTabel').show())
                                sellTable.ajax.reload(null,false);
                            if($('#factureSellsTabel').show())
                                sellsTable.ajax.reload(null,false);
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
    $scope.removeFactureSupply = function(id){
        if(id != ""){
            swal({
                title: "هل تريد إلغاء هذه الفاتورة؟",
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
                    url : '../php/history.php',
                    data: {"function": "removeFactureSupply","id":id},
                    dataType: 'json',
                    async : false,
                    cache : false,
                    success : function(response,status) {
                        swal({
                            title: "فاتورة",
                            text: "تم ا",
                            type: "info",
                            showCancelButton: false,
                            confirmButtonClass: "btn-info",
                            confirmButtonText: "Ok",
                            closeOnConfirm: true
                        }); 
                        supplyInvoicesTable.ajax.reload(null,false);
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
    }
});


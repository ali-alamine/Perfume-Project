var app = angular.module('PERFUME', []);
var essenceTable;
var bottleTable;
var accTable;
app.controller('StockALL', function($scope, $compile) {
    essenceTable=$('#essenceTable').DataTable({
        "paging": true,
        "serverSide": true,
        "processing":true,
        'responsive':true,
        "ordering": true,
        "pagingType": "full_numbers",
        "searching": true,
        "lengthMenu": [[5,10, 25,50,100,150,200,300,400, -1], [5,10, 25,50,100,150,200,300,400, "الكل"]],
        "ajax": {
            type : "get",
            url : "../php/stock.php",
            data :{"function":"essenceDataTable"},
            cache:false,
            async:false             
        },
        columns: [
            { "data": "item_name",
                "render":function(data,meta,row){
                    var splited = data.split("/", 2);
                    var id=splited[0];
                    var essName = splited[1];
                    var param = id+",'"+essName+"'";
                    return essName+' <button style="float:right" ng-click="editEssModal('+param+')">تعديل</button>';
                } 
            },
            { "data":  "com_quan"},
            { "data": "item_cost" },
            { "data":  "item_selling"},
            { "data":"supplier_name"}
            
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
    bottleTable=$('#bottleTable').DataTable({
        "paging": true,
        "serverSide": true,
        "processing":true,
        "ordering": true,
        'responsive':true,
        "pagingType": "full_numbers",
        "searching": true,
        "lengthMenu": [[5,10, 25,50,100,150,200,300,400, -1], [5,10, 25,50,100,150,200,300,400, "الكل"]],
        "ajax": {
            type : "get",
            url : "../php/stock.php",
            data :{"function":"bottleDataTable"},
            cache:false,
            async:false             
        },
        columns: [
            { "data": "item_name",
                "render":function(data,meta,row){
                    var splited = data.split("/", 2);
                    var id=splited[1];
                    var essName = splited[0];
                    var param = id+",'"+essName+"'";
                    return essName+' <button style="float:right" ng-click="editBotModal('+param+')">تعديل</button>';
                } 
            },
            { "data":  "com_quan"},
            { "data": "item_cost" },
            { "data":  "item_selling"},
            { "data":"supplier_name"}
            
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
    accTable=$('#accTable').DataTable({
        "paging": true,
        "serverSide": true,
        "processing":true,
        'responsive':true,
        "ordering": true,
        "pagingType": "full_numbers",
        "searching": true,
        "lengthMenu": [[5,10, 25,50,100,150,200,300,400, -1], [5,10, 25,50,100,150,200,300,400, "الكل"]],
        "ajax": {
            type : "get",
            url : "../php/stock.php",
            data :{"function":"accDataTable"},
            cache:false,
            async:false             
        },
        columns: [
            { "data": "item_name",
                "render":function(data,meta,row){
                    var splited = data.split("/", 2);
                    var id=splited[1];
                    var essName = splited[0];
                    var param = id+",'"+essName+"'";
                    return essName+' <button style="float:right" ng-click="editAccModal('+param+')">تعديل</button>';
                } 
            },
            { "data":  "com_quan"},
            { "data": "item_cost" },
            { "data":  "item_selling"},
            {"data":"com_date_exp"},
            { "data":"supplier_name"}
            
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
    $scope.editEssModal = function(essID,essName){
        $('#editModal').modal('show');
        $('#bottleCapacity').hide();
        $scope.edit_titleName = "تعديل اسم اسانس";
        $scope.edit_labelName = "إسم الإسانس";
        $scope.nameForEdit=essName;
        $scope.IDForEdit=essID;
        $("#name").css("border","");
        $('#name').focus();
    };
    $scope.editBotModal=function(id,name){
        var splited = name.split("|", 2);
        var bottleName = splited[0];
        var bottleCapacity=splited[1];
        $('#editModal').modal('show');
        $('#bottleCapacity').show();
        $scope.edit_titleName = "تعديل نوع القنينة";
        $scope.edit_labelName = "نوع القنينة";
        $scope.nameForEdit=bottleName;
        $scope.capacity=parseInt(bottleCapacity);
        $scope.IDForEdit=id;        
        $("#name").css("border","");
        $("#capacity").css("border","");
        $('#name').focus();
    };
    $scope.editAccModal=function(id,name){
        $('#editModal').modal('show');
        $('#bottleCapacity').hide();
        $scope.edit_titleName = "تعديل إسم الاكسسوار";
        $scope.edit_labelName = "اسم الإكسسوار";
        $scope.nameForEdit=name;
        $scope.IDForEdit=id;
        $("#name").css("border","");
        $('#name').focus();
    };
    $scope.updateName = function(){
        var labelName=$scope.edit_labelName;
        var name = $scope.nameForEdit;
        var id = $scope.IDForEdit;
        var url = '../php/stock.php';
        if(name!=""){
            if(labelName=="إسم الإسانس"){
                var func = "editEssence";
                var data = {'id': id,'essence': name,'function': func};
                var options = {
                    type : "get",
                    url : url,
                    data: data,
                    dataType: "json",
                    async : false,
                    cache : false,
                    success : function(response,status) {
                        essenceTable.ajax.reload(null,false);
                        $('#editModal').modal('hide');
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
                if(capacity!=null){
                    var func = "editBottle";
                    var data = {'id': id,'type': name,'capacity': capacity,'function': func};
                    var options = {
                        type : "get",
                        url : url,
                        data: data,
                        dataType: "json",
                        async : false,
                        cache : false,
                        success : function(response,status) {
                            bottleTable.ajax.reload(null,false);
                            $('#editModal').modal('hide');
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
                } else {
                    $("#capacity").css("border","solid red 1px");
                }
            } else if(labelName=="اسم الإكسسوار") {
                var func = "editAcc";
                var data = {'id': id,'item': name,'function': func};
                var options = {
                    type : "get",
                    url : url,
                    data: data,
                    dataType: "json",
                    async : false,
                    cache : false,
                    success : function(response,status) {
                        accTable.ajax.reload(null,false);
                        $('#editModal').modal('hide');
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
        } else if(name==""){
            $("#name").css("border","solid red 1px");
        }
    };
        
});
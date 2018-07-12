// function getDate(){
//     var d = new Date();
//     minutes = d.getMinutes().toString().length == 1 ? '0'+d.getMinutes() : d.getMinutes(),
//     hours = d.getHours().toString().length == 1 ? '0'+d.getHours() : d.getHours(),
//     ampm = d.getHours() >= 12 ? 'pm' : 'am',
//     months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
//     // days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
//     return d.getFullYear()+'-'+months[d.getMonth()]+'-'+d.getDate();
// }
// // function safeApply(fn) {
// //         var phase = this.$root.$$phase;
// //         if(phase == '$apply' || phase == '$digest') {
// //             if(fn && (typeof(fn) === 'function')) {
// //                 fn();
// //             }
// //         } else {
// //             this.$apply(fn);
// //         }
// //     }
// $(document).ready(function(){
//     // debugger
// 	var newDate=getDate();
//     var idOldDate=[];
//     var url="../php/totalDrawer.php";
//     var data = {"function":"checkNewDate",'newDate':newDate};
//     var opttions={
//         type : "get",
//         url : url,
//         data: data,
//         dataType: 'json',
//         async : false,
//         cache : false,
//         success : function(response,status) {
//             // idOldDate=response;
//             idOldDate=response;
//             if(idOldDate[0]['newDate']==false){
//                 // alert(idOldDate[0]['newDate']);
//                 totalDrawer(newDate);
//             }
//         },
//         error:function(request,response,error){
//             // alert(response)
//             swal({
//                 title: "Please contact your software developerppppppppiii",
//                 text: "ERROR: " + error,
//                 type: "warning",
//                 showCancelButton: false,
//                 confirmButtonClass: "btn-info",
//                 confirmButtonText: "Ok",
//                 closeOnConfirm: true
//             });
//         }
//     };
//     $.ajax(opttions);
// // if(idOldDate==''){
// //     // var newDate=getDate();
// //     var url="../php/totalDrawer.php";
// //     var data = {"function":"addTotalDrawer","newDate":newDate};
// //     var options={
// //         type : "get",
// //         url : url,
// //         data: data,
// //         dataType: 'json',
// //         async : false,
// //         cache : false,
// //         success : function(response,status) {
// //             localStorage.setItem("newDateKey", newDate);
// //             localStorage.setItem("id_total_drawerKey", response);
// //         },
// //         error:function(request,response,error){
// //             swal({
// //                 title: "Please contact your software developeruuuuuu",
// //                 text: "ERROR: " + error,
// //                 type: "warning",
// //                 showCancelButton: false,
// //                 confirmButtonClass: "btn-info",
// //                 confirmButtonText: "Ok",
// //                 closeOnConfirm: true
// //             });
// //         }
// //     };
// //     $.ajax(options);
// // }
// });
// function totalDrawer(newDate){
//     // if(idOldDate==''){
//     // var newDate=getDate();
//     var url="../php/totalDrawer.php";
//     var data = {"function":"addTotalDrawer","newDate":newDate};
//     var options={
//         type : "get",
//         url : url,
//         data: data,
//         dataType: 'json',
//         async : false,
//         cache : false,
//         success : function(response,status) {
//             localStorage.setItem("newDateKey", newDate);
//             localStorage.setItem("id_total_drawerKey", response);
//         },
//         error:function(request,response,error){
//             swal({
//                 title: "Please contact your software developeruuuuuu",
//                 text: "ERROR: " + error,
//                 type: "warning",
//                 showCancelButton: false,
//                 confirmButtonClass: "btn-info",
//                 confirmButtonText: "Ok",
//                 closeOnConfirm: true
//             });
//         }
//     };
//     $.ajax(options);
// // }
// }

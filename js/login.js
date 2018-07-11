$(document).ready(function(){
	var options = {
            type : "get",
            url : '../php/drawer.php',
            data: {'function': "todayCheck"},
            dataType: "json",
            async : false,
            cache : false,
            success : function(response,status) {
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

function getLoginKeys() {
	var username=$("#username").val();
	var passkey=$("#passkey").val();
	if(username != "" || passkey != "")
	{
		if(username=="123" && passkey=="123")
		{
        	localStorage.setItem("LoginKey", "admin");
			window.location.replace("sell.html");
		}
		else if(username=="456" && passkey=="456")
		{
        	localStorage.setItem("LoginKey", "employee");
			window.location.replace("sell.html")
		}
		else
		{
			alert("wrong username/password");
		}
	}
	else
	{
		alert("Please fill all the required fields");
	}
}
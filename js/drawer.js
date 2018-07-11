$(function() {
    $("#dialog-drawer").dialog({
        autoOpen: false,
        maxWidth:1000,
        maxHeight: 1000,
        width: 1000,
        height: 600,
        modal: true,
        buttons: {
        close: function() {
                $(this).dialog("close");
            }
        },
        close: function() {}
    });
});

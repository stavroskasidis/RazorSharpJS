$(function () {
    RazorSharp.Events.OnBeforeActionExecuted = function (eventArgs) {
        $(".spinner").show();
    }

    RazorSharp.Events.OnAfterActionExecuted = function (eventArgs) {
        $(".spinner").hide();
    }
});
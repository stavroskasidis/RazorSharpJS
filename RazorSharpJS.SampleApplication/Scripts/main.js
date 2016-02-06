$(function () {
    RazorSharp.Configuration.OnBeforeActionExecuted = function (url, data) {
        $(".spinner").show();
    }

    RazorSharp.Configuration.OnAfterActionExecuted = function (ajaxResult) {
        $(".spinner").hide();
    }
});
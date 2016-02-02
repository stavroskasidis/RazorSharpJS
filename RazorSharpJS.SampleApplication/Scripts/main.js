$(function () {
    RazorSharp.Configuration.OnBeforeActionExecuted = function () {
        $(".spinner").show();
    }

    RazorSharp.Configuration.OnAfterActionExecuted = function () {
        $(".spinner").hide();
    }
});
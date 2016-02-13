$(function () {
    RazorSharp.Events.OnBeforeActionExecuted = function (eventArgs) {
        $(".spinner").show();
    }

    RazorSharp.Events.OnAfterActionExecuted = function (eventArgs) {
        $(".spinner").hide();
        if(eventArgs.Url !== "/ApplicationStart/MenuLoginPartial") {
            RazorSharp.UpdatePartial("MenuLoginPartial");
        }
    }
});
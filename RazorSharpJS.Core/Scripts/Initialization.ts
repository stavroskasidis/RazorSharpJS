/// <reference path="../Scripts/typings/jquery/jquery.d.ts" />

$(function () {
    var urlResolver = new RazorSharp.UrlResolver();
    var actionExecutor = new RazorSharp.ActionExecutor();
    var viewRenderer = new RazorSharp.ViewRenderer();
    var actionResultHandler = new RazorSharp.ActionResultHandler(viewRenderer);
    var hashHandler = new RazorSharp.HashHandler(urlResolver, actionExecutor, actionResultHandler);
    var formHandler = new RazorSharp.FormHandler(actionExecutor, actionResultHandler);

    var bootstrapper = new RazorSharp.Bootstrapper(hashHandler, formHandler);

    bootstrapper.BindHashChange();
    bootstrapper.BindForms();
});
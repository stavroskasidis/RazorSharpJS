/// <reference path="../Scripts/typings/jquery/jquery.d.ts" />

namespace RazorSharp {

}

$(function () {
    var urlResolver = new RazorSharp.UrlResolver();
    var actionExecutor = new RazorSharp.ActionExecutor();
    var viewRenderer = new RazorSharp.ViewRenderer();
    var partialViewRenderer = new RazorSharp.PartialViewRenderer();
    var actionResultHandler = new RazorSharp.ActionResultHandler(viewRenderer, partialViewRenderer);
    var hashHandler = new RazorSharp.HashHandler(urlResolver, actionExecutor, actionResultHandler);
    var formHandler = new RazorSharp.FormHandler(actionExecutor, actionResultHandler);

    var partialViewHandler = new RazorSharp.PartialViewHandler(actionExecutor, actionResultHandler);
    var bootstrapper = new RazorSharp.Bootstrapper(hashHandler, formHandler);
    var self = this;

    bootstrapper.BindHashChange();
    bootstrapper.BindForms();

    RazorSharp.UpdatePartial = (partialId: string, method: string = "GET", data?: any) => {
        var element = $('#' + partialId)[0];
        if (!element) {
            throw new Error('Element with id "' + partialId + '" was not found');
        }
        var partialUrl = $('#' + partialId).attr('rs-partial');
        if (!partialUrl) {
            throw new Error('Element does not have the "rs-partial" attribute')
        }

        partialViewHandler.UpdatePartialView(element, data, method);
    }
});
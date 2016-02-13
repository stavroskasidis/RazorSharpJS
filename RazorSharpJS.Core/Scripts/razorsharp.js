/// <reference path="typings/jquery/jquery.d.ts" />
var RazorSharp;
(function (RazorSharp) {
    var ActionExecutor = (function () {
        function ActionExecutor() {
        }
        ActionExecutor.prototype.ExecuteAction = function (url, method, isPartial, partialViewElement, data) {
            if (RazorSharp.Events.OnBeforeActionExecuted != null) {
                var eventArgs = new RazorSharp.OnBeforeActionExecutedEventArgs(url, method, data, isPartial);
                RazorSharp.Events.OnBeforeActionExecuted(eventArgs);
                if (eventArgs.Cancel) {
                    return new RazorSharp.ActionResult(null, url, method, data, true, isPartial, partialViewElement);
                }
            }
            var ajaxPromise = $.ajax({
                url: url,
                method: method,
                data: data
            });
            return new RazorSharp.ActionResult(ajaxPromise, url, method, data, false, isPartial, partialViewElement);
        };
        return ActionExecutor;
    })();
    RazorSharp.ActionExecutor = ActionExecutor;
})(RazorSharp || (RazorSharp = {}));
var RazorSharp;
(function (RazorSharp) {
    var ActionResult = (function () {
        function ActionResult(ajaxPromise, url, method, data, canceled, isPartial, partialViewElement) {
            this.AjaxPromise = ajaxPromise;
            this.Url = url;
            this.Method = method;
            this.Data = data;
            this.Canceled = canceled;
            this.IsPartial = isPartial;
            this.PartialViewElement = partialViewElement;
        }
        return ActionResult;
    })();
    RazorSharp.ActionResult = ActionResult;
})(RazorSharp || (RazorSharp = {}));
var RazorSharp;
(function (RazorSharp) {
    var ActionResultHandler = (function () {
        function ActionResultHandler(viewRenderer, partialViewRenderer) {
            this.ViewRenderer = viewRenderer;
            this.PartialViewRenderer = partialViewRenderer;
        }
        ActionResultHandler.prototype.HandleActionResult = function (actionResult) {
            var _this = this;
            if (actionResult.Canceled) {
                return;
            }
            actionResult.AjaxPromise.always(function (ajaxResult) {
                if (ajaxResult.status && ajaxResult.status == 403 && ajaxResult.responseJSON && ajaxResult.responseJSON.RazorSharpJSLoginUrl) {
                    window.location.hash = ajaxResult.responseJSON.RazorSharpJSLoginUrl;
                }
                else if (ajaxResult.RazorSharpJSRedirectTo) {
                    window.location.hash = ajaxResult.RazorSharpJSRedirectTo;
                }
                else if (actionResult.IsPartial) {
                    _this.PartialViewRenderer.RenderPartialView(actionResult.PartialViewElement, ajaxResult);
                }
                else {
                    _this.ViewRenderer.RenderView(ajaxResult);
                }
                if (RazorSharp.Events.OnAfterActionExecuted != null) {
                    var eventArgs = new RazorSharp.OnAfterActionExecutedEventArgs(actionResult.Url, actionResult.Method, actionResult.Data, ajaxResult, actionResult.IsPartial);
                    RazorSharp.Events.OnAfterActionExecuted(eventArgs);
                }
            });
        };
        return ActionResultHandler;
    })();
    RazorSharp.ActionResultHandler = ActionResultHandler;
})(RazorSharp || (RazorSharp = {}));
var RazorSharp;
(function (RazorSharp) {
    var Bootstrapper = (function () {
        function Bootstrapper(urlHandler, formHandler) {
            //this.AnchorHandler = anchorHandler;
            this.HashHandler = urlHandler;
            this.FormHandler = formHandler;
        }
        Bootstrapper.prototype.BindHashChange = function () {
            var self = this;
            $(window).on('hashchange', function () {
                self.HashHandler.HandleHashChange(window.location.hash);
            });
        };
        Bootstrapper.prototype.BindForms = function () {
            var self = this;
            $(document).on('submit', "form[rs-form]", function (e) {
                e.preventDefault(); //prevent default form submit
                self.FormHandler.HandleSubmit($(this)[0]);
            });
        };
        return Bootstrapper;
    })();
    RazorSharp.Bootstrapper = Bootstrapper;
})(RazorSharp || (RazorSharp = {}));
var RazorSharp;
(function (RazorSharp) {
    var Events = (function () {
        function Events() {
        }
        return Events;
    })();
    RazorSharp.Events = Events;
})(RazorSharp || (RazorSharp = {}));
/// <reference path="typings/jquery/jquery.d.ts" />
var RazorSharp;
(function (RazorSharp) {
    var FormHandler = (function () {
        function FormHandler(actionExecutor, actionResultHandler) {
            this.ActionExecutor = actionExecutor;
            this.ActionResultHandler = actionResultHandler;
        }
        FormHandler.prototype.HandleSubmit = function (form) {
            var actionResult = this.ActionExecutor.ExecuteAction(form.action, "POST", false, null, $(form).serialize());
            this.ActionResultHandler.HandleActionResult(actionResult);
        };
        return FormHandler;
    })();
    RazorSharp.FormHandler = FormHandler;
})(RazorSharp || (RazorSharp = {}));
/// <reference path="typings/jquery/jquery.d.ts" />
var RazorSharp;
(function (RazorSharp) {
    var HashHandler = (function () {
        function HashHandler(urlResolver, actionExecutor, actionResultHandler) {
            this.UrlResolver = urlResolver;
            this.ActionExecutor = actionExecutor;
            this.ActionResultHandler = actionResultHandler;
        }
        HashHandler.prototype.HandleHashChange = function (hash) {
            var url = this.UrlResolver.Resolve(hash);
            var actionResult = this.ActionExecutor.ExecuteAction(url, "GET", false, null);
            this.ActionResultHandler.HandleActionResult(actionResult);
        };
        return HashHandler;
    })();
    RazorSharp.HashHandler = HashHandler;
})(RazorSharp || (RazorSharp = {}));
/// <reference path="typings/jquery/jquery.d.ts" />
var RazorSharp;
(function (RazorSharp) {
    function SubmitForm(form) {
        var button = form.ownerDocument.createElement('input');
        button.style.display = 'none';
        button.type = 'submit';
        form.appendChild(button).click();
        form.removeChild(button);
    }
    RazorSharp.SubmitForm = SubmitForm;
})(RazorSharp || (RazorSharp = {}));
/// <reference path="../Scripts/typings/jquery/jquery.d.ts" />
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
    RazorSharp.UpdatePartial = function (partialId, method, data) {
        if (method === void 0) { method = "GET"; }
        var element = $('#' + partialId)[0];
        if (!element) {
            throw new Error('Element with id "' + partialId + '" was not found');
        }
        var partialUrl = $('#' + partialId).attr('rs-partial');
        if (!partialUrl) {
            throw new Error('Element does not have the "rs-partial" attribute');
        }
        partialViewHandler.UpdatePartialView(element, data, method);
    };
});
var RazorSharp;
(function (RazorSharp) {
    var OnAfterActionExecutedEventArgs = (function () {
        function OnAfterActionExecutedEventArgs(url, method, data, ajaxResult, isPartial) {
            this.Url = url;
            this.Method = method;
            this.Data = data;
            this.AjaxResult = ajaxResult;
            this.IsPartial = isPartial;
        }
        return OnAfterActionExecutedEventArgs;
    })();
    RazorSharp.OnAfterActionExecutedEventArgs = OnAfterActionExecutedEventArgs;
})(RazorSharp || (RazorSharp = {}));
var RazorSharp;
(function (RazorSharp) {
    var OnBeforeActionExecutedEventArgs = (function () {
        function OnBeforeActionExecutedEventArgs(url, method, data, isPartial) {
            this.Url = url;
            this.Method = method;
            this.Data = data;
            this.Cancel = false;
            this.IsPartial = isPartial;
        }
        return OnBeforeActionExecutedEventArgs;
    })();
    RazorSharp.OnBeforeActionExecutedEventArgs = OnBeforeActionExecutedEventArgs;
})(RazorSharp || (RazorSharp = {}));
var RazorSharp;
(function (RazorSharp) {
    var PartialViewHandler = (function () {
        function PartialViewHandler(actionExecutor, actionResultHandler) {
            this.ActionExecutor = actionExecutor;
            this.ActionResultHandler = actionResultHandler;
        }
        PartialViewHandler.prototype.UpdatePartialView = function (partialViewHtmlElement, data, method) {
            if (method === void 0) { method = "GET"; }
            var url = partialViewHtmlElement.getAttribute('rs-partial');
            var actionResult = this.ActionExecutor.ExecuteAction(url, method, true, partialViewHtmlElement, data);
            this.ActionResultHandler.HandleActionResult(actionResult);
        };
        return PartialViewHandler;
    })();
    RazorSharp.PartialViewHandler = PartialViewHandler;
})(RazorSharp || (RazorSharp = {}));
var RazorSharp;
(function (RazorSharp) {
    var PartialViewRenderer = (function () {
        function PartialViewRenderer() {
        }
        PartialViewRenderer.prototype.RenderPartialView = function (partialViewElement, viewContent) {
            partialViewElement.innerHTML = viewContent;
        };
        return PartialViewRenderer;
    })();
    RazorSharp.PartialViewRenderer = PartialViewRenderer;
})(RazorSharp || (RazorSharp = {}));
var RazorSharp;
(function (RazorSharp) {
    var UrlResolver = (function () {
        function UrlResolver() {
        }
        UrlResolver.prototype.Resolve = function (anchorUrl) {
            var result = anchorUrl.replace("#/", "");
            return result;
        };
        return UrlResolver;
    })();
    RazorSharp.UrlResolver = UrlResolver;
})(RazorSharp || (RazorSharp = {}));
var RazorSharp;
(function (RazorSharp) {
    var ViewRenderer = (function () {
        function ViewRenderer() {
        }
        ViewRenderer.prototype.RenderView = function (viewContent) {
            $("[rs-body]").html(viewContent);
        };
        return ViewRenderer;
    })();
    RazorSharp.ViewRenderer = ViewRenderer;
})(RazorSharp || (RazorSharp = {}));

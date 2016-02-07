/// <reference path="typings/jquery/jquery.d.ts" />
var RazorSharp;
(function (RazorSharp) {
    var ActionExecutor = (function () {
        function ActionExecutor() {
        }
        ActionExecutor.prototype.ExecuteAction = function (url, method, data) {
            if (RazorSharp.Events.OnBeforeActionExecuted != null) {
                var eventArgs = new RazorSharp.OnBeforeActionExecutedEventArgs(url, method, data);
                RazorSharp.Events.OnBeforeActionExecuted(eventArgs);
                if (eventArgs.Cancel) {
                    return new RazorSharp.ActionResult(null, url, method, data, true);
                }
            }
            var ajaxPromise = $.ajax({
                url: url,
                method: method,
                data: data
            });
            return new RazorSharp.ActionResult(ajaxPromise, url, method, data, false);
        };
        return ActionExecutor;
    })();
    RazorSharp.ActionExecutor = ActionExecutor;
})(RazorSharp || (RazorSharp = {}));
var RazorSharp;
(function (RazorSharp) {
    var ActionResult = (function () {
        function ActionResult(ajaxPromise, url, method, data, canceled) {
            this.AjaxPromise = ajaxPromise;
            this.Url = url;
            this.Method = method;
            this.Data = data;
            this.Canceled = canceled;
        }
        return ActionResult;
    })();
    RazorSharp.ActionResult = ActionResult;
})(RazorSharp || (RazorSharp = {}));
var RazorSharp;
(function (RazorSharp) {
    var ActionResultHandler = (function () {
        function ActionResultHandler(viewRenderer) {
            this.ViewRenderer = viewRenderer;
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
                else {
                    _this.ViewRenderer.RenderView(ajaxResult);
                }
                if (RazorSharp.Events.OnAfterActionExecuted != null) {
                    var eventArgs = new RazorSharp.OnAfterActionExecutedEventArgs(actionResult.Url, actionResult.Method, actionResult.Data, ajaxResult);
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
        ;
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
            var actionResult = this.ActionExecutor.ExecuteAction(form.action, "POST", $(form).serialize());
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
            var actionResult = this.ActionExecutor.ExecuteAction(url, "GET");
            this.ActionResultHandler.HandleActionResult(actionResult);
        };
        return HashHandler;
    })();
    RazorSharp.HashHandler = HashHandler;
})(RazorSharp || (RazorSharp = {}));
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
var RazorSharp;
(function (RazorSharp) {
    var OnAfterActionExecutedEventArgs = (function () {
        function OnAfterActionExecutedEventArgs(url, method, data, ajaxResult) {
            this.Url = url;
            this.Method = method;
            this.Data = data;
            this.AjaxResult = ajaxResult;
        }
        return OnAfterActionExecutedEventArgs;
    })();
    RazorSharp.OnAfterActionExecutedEventArgs = OnAfterActionExecutedEventArgs;
})(RazorSharp || (RazorSharp = {}));
var RazorSharp;
(function (RazorSharp) {
    var OnBeforeActionExecutedEventArgs = (function () {
        function OnBeforeActionExecutedEventArgs(url, method, data) {
            this.Url = url;
            this.Method = method;
            this.Data = data;
            this.Cancel = false;
        }
        return OnBeforeActionExecutedEventArgs;
    })();
    RazorSharp.OnBeforeActionExecutedEventArgs = OnBeforeActionExecutedEventArgs;
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

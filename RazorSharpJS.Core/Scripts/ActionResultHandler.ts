namespace RazorSharp {
    export interface IActionResultHandler {
        HandleActionResult(actionResult: ActionResult): void;
    }

    export class ActionResultHandler implements IActionResultHandler {

        private ViewRenderer: IViewRenderer;
        private PartialViewRenderer: IPartialViewRenderer;

        public constructor(viewRenderer: IViewRenderer, partialViewRenderer: IPartialViewRenderer) {
            this.ViewRenderer = viewRenderer;
            this.PartialViewRenderer = partialViewRenderer;
        }

        public HandleActionResult(actionResult: ActionResult): void {
            if (actionResult.Canceled) {
                return;
            }
            actionResult.AjaxPromise.always((ajaxResult) => {
                if (ajaxResult.status && ajaxResult.status == 403 && ajaxResult.responseJSON && ajaxResult.responseJSON.RazorSharpJSLoginUrl) {
                    window.location.hash = ajaxResult.responseJSON.RazorSharpJSLoginUrl;
                }
                else if (ajaxResult.RazorSharpJSRedirectTo) {
                    window.location.hash = ajaxResult.RazorSharpJSRedirectTo;
                }
                else if (actionResult.IsPartial) {
                    this.PartialViewRenderer.RenderPartialView(actionResult.PartialViewElement, ajaxResult);
                }
                else {
                    this.ViewRenderer.RenderView(ajaxResult);
                }

                if (RazorSharp.Events.OnAfterActionExecuted != null) {
                    var eventArgs = new OnAfterActionExecutedEventArgs(actionResult.Url, actionResult.Method, actionResult.Data, ajaxResult, actionResult.IsPartial);
                    RazorSharp.Events.OnAfterActionExecuted(eventArgs);
                }
            });


        }
    }
}
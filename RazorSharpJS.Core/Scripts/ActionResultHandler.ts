namespace RazorSharp {
    export interface IActionResultHandler {
        HandleActionResult(actionResult: ActionResult): void;
    }

    export class ActionResultHandler implements IActionResultHandler {

        private ViewRenderer: IViewRenderer;

        public constructor(viewRenderer: IViewRenderer) {
            this.ViewRenderer = viewRenderer;
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
                else {
                    this.ViewRenderer.RenderView(ajaxResult);
                }

                if (RazorSharp.Events.OnAfterActionExecuted != null) {
                    var eventArgs = new OnAfterActionExecutedEventArgs(actionResult.Url, actionResult.Method, actionResult.Data, ajaxResult);
                    RazorSharp.Events.OnAfterActionExecuted(eventArgs);
                }
            });


        }
    }
}
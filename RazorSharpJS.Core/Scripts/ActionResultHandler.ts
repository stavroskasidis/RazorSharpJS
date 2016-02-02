namespace RazorSharp {
    export interface IActionResultHandler {
        HandleActionResult(actionResult: JQueryXHR): void;
    }

    export class ActionResultHandler implements IActionResultHandler {

        private ViewRenderer: IViewRenderer;

        constructor(viewRenderer: IViewRenderer) {
            this.ViewRenderer = viewRenderer;
        }

        HandleActionResult(actionResult: JQueryXHR): void {
            actionResult.always((ajaxResult) => {
                if (ajaxResult.status && ajaxResult.status == 403 && ajaxResult.responseJSON && ajaxResult.responseJSON.RazorSharpJSLoginUrl) {
                    window.location.hash = ajaxResult.responseJSON.RazorSharpJSLoginUrl;
                }
                else if (ajaxResult.RazorSharpJSRedirectTo) {
                    window.location.hash = ajaxResult.RazorSharpJSRedirectTo;
                }
                else {
                    this.ViewRenderer.RenderView(ajaxResult);
                }

                if (RazorSharp.Configuration.OnAfterActionExecuted != null) {
                    RazorSharp.Configuration.OnAfterActionExecuted(ajaxResult);
                }
            });


        }
    }
}
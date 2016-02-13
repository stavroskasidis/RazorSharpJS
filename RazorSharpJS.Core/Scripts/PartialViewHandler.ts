namespace RazorSharp {

    export interface IPartialViewHandler {
        UpdatePartialView(partialViewHtmlElement: HTMLElement, data?: any): void;
    }

    export class PartialViewHandler implements IPartialViewHandler {
        private ActionExecutor: IActionExecutor;
        private ActionResultHandler: IActionResultHandler;

        public constructor(actionExecutor: IActionExecutor, actionResultHandler: IActionResultHandler) {
            this.ActionExecutor = actionExecutor;
            this.ActionResultHandler = actionResultHandler;
        }

        public UpdatePartialView(partialViewHtmlElement: HTMLElement, data?: any, method: string = "GET"): void {
            var url = partialViewHtmlElement.getAttribute('rs-partial');
            var actionResult = this.ActionExecutor.ExecuteAction(url, method, true, partialViewHtmlElement, data);
            this.ActionResultHandler.HandleActionResult(actionResult);
        }
    }
}
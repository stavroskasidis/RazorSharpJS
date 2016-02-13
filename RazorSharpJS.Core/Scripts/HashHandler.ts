/// <reference path="typings/jquery/jquery.d.ts" />
namespace RazorSharp {
    export interface IHashHandler {
        HandleHashChange(hash: string): void;
    }

    export class HashHandler implements IHashHandler {

        private UrlResolver: IUrlResolver;
        private ActionExecutor: IActionExecutor;
        private ActionResultHandler: IActionResultHandler;

        public constructor(urlResolver: IUrlResolver, actionExecutor: IActionExecutor, actionResultHandler: IActionResultHandler) {
            this.UrlResolver = urlResolver;
            this.ActionExecutor = actionExecutor;
            this.ActionResultHandler = actionResultHandler;
        }

        public HandleHashChange(hash: string): void {
            var url = this.UrlResolver.Resolve(hash);
            var actionResult = this.ActionExecutor.ExecuteAction(url, "GET", false,null);
            this.ActionResultHandler.HandleActionResult(actionResult);
        }
    }
}
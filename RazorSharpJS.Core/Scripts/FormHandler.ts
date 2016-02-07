/// <reference path="typings/jquery/jquery.d.ts" />
namespace RazorSharp {
    export interface IFormHandler {
        HandleSubmit(form: HTMLFormElement): void;
    }

    export class FormHandler implements IFormHandler {

        private ActionExecutor: IActionExecutor;
        private ActionResultHandler: IActionResultHandler;

        public constructor(actionExecutor: IActionExecutor, actionResultHandler: IActionResultHandler) {
            this.ActionExecutor = actionExecutor;
            this.ActionResultHandler = actionResultHandler;
        }

        public HandleSubmit(form: HTMLFormElement): void {
            var actionResult = this.ActionExecutor.ExecuteAction(form.action, "POST", $(form).serialize() );
            this.ActionResultHandler.HandleActionResult(actionResult);
        }
    }
}
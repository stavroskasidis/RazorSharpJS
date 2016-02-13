/// <reference path="typings/jquery/jquery.d.ts" />
namespace RazorSharp {
    export interface IActionExecutor {
        ExecuteAction(url: string, method: string, isPartial: boolean, partialViewElement: HTMLElement, data?): ActionResult;
    }

    export class ActionExecutor implements IActionExecutor {
        public ExecuteAction(url: string, method: string, isPartial: boolean, partialViewElement: HTMLElement, data?): ActionResult {
            if (RazorSharp.Events.OnBeforeActionExecuted != null) {
                var eventArgs = new OnBeforeActionExecutedEventArgs(url, method, data, isPartial);
                RazorSharp.Events.OnBeforeActionExecuted(eventArgs);
                if (eventArgs.Cancel) {
                    return new ActionResult(null, url, method, data, true, isPartial, partialViewElement);
                }
            }
            var ajaxPromise = $.ajax({
                url: url,
                method: method,
                data: data
            });
            return new ActionResult(ajaxPromise, url, method, data, false, isPartial, partialViewElement);
        }
    }
}
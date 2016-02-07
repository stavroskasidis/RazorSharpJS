/// <reference path="typings/jquery/jquery.d.ts" />
namespace RazorSharp {
    export interface IActionExecutor {
        ExecuteAction(url: string, method: string, data?): ActionResult;
    }

    export class ActionExecutor implements IActionExecutor {
        public ExecuteAction(url: string, method: string, data?): ActionResult {
            if (RazorSharp.Events.OnBeforeActionExecuted != null) {
                var eventArgs = new OnBeforeActionExecutedEventArgs(url, method,data);
                RazorSharp.Events.OnBeforeActionExecuted(eventArgs);
                if (eventArgs.Cancel) {
                    return new ActionResult(null, url, method, data, true);
                }
            }
            var ajaxPromise = $.ajax({
                url: url,
                method: method,
                data: data
            }); 
            return new ActionResult(ajaxPromise,url, method,data,false);
        }
    }
}
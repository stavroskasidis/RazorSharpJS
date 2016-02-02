/// <reference path="typings/jquery/jquery.d.ts" />
namespace RazorSharp {
    export interface IActionExecutor {
        ExecuteAction(url: string, method: string, data?): JQueryXHR;
    }

    export class ActionExecutor implements IActionExecutor {
        ExecuteAction(url: string, method: string, data?): JQueryXHR {
            if (RazorSharp.Configuration.OnBeforeActionExecuted != null) {
                RazorSharp.Configuration.OnBeforeActionExecuted(url, data);
            }

            return $.ajax({
                url: url,
                method: method,
                data: data
            });
        }
    }
}
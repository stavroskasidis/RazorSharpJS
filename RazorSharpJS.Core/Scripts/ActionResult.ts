namespace RazorSharp {
    export class ActionResult {
        public AjaxPromise: JQueryXHR;
        public Url: string;
        public Method: string;
        public Data: any;
        public Canceled: boolean;

        public constructor(ajaxPromise: JQueryXHR, url: string, method: string, data: any, canceled: boolean) {
            this.AjaxPromise = ajaxPromise;
            this.Url = url;
            this.Method = method;
            this.Data = data;
            this.Canceled = canceled;
        }
    }
}
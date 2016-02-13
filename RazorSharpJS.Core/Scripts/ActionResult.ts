namespace RazorSharp {
    export class ActionResult {
        public AjaxPromise: JQueryXHR;
        public Url: string;
        public Method: string;
        public Data: any;
        public Canceled: boolean;
        public IsPartial: boolean;
        public PartialViewElement: HTMLElement;

        public constructor(ajaxPromise: JQueryXHR, url: string, method: string, data: any, canceled: boolean, isPartial: boolean, partialViewElement: HTMLElement) {
            this.AjaxPromise = ajaxPromise;
            this.Url = url;
            this.Method = method;
            this.Data = data;
            this.Canceled = canceled;
            this.IsPartial = isPartial;
            this.PartialViewElement = partialViewElement;
        }
    }
}
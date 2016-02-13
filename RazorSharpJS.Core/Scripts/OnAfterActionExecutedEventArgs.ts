namespace RazorSharp {
    export class OnAfterActionExecutedEventArgs {
        public Url: string;
        public Method: string;
        public Data: any;
        public AjaxResult: any;
        public IsPartial: boolean;

        public constructor(url: string, method: string, data: any, ajaxResult: any, isPartial: boolean) {
            this.Url = url;
            this.Method = method;
            this.Data = data;
            this.AjaxResult = ajaxResult;
            this.IsPartial = isPartial;
        }
    }
}
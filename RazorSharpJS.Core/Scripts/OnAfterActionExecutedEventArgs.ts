namespace RazorSharp {
    export class OnAfterActionExecutedEventArgs {
        public Url: string;
        public Method: string;
        public Data: any;
        public AjaxResult: any;

        public constructor(url: string, method: string, data: any, ajaxResult: any) {
            this.Url = url;
            this.Method = method;
            this.Data = data;
            this.AjaxResult = ajaxResult;
        }
    }
}
namespace RazorSharp {
    export class OnBeforeActionExecutedEventArgs {
        public Url: string;
        public Method: string;
        public Data: any;
        public Cancel: boolean;

        public constructor(url: string, method: string, data: any) {
            this.Url = url;
            this.Method = method;
            this.Data = data;
            this.Cancel = false;
        }
    }
}
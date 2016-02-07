namespace RazorSharp {

    export class Events {
        public static OnBeforeActionExecuted: (eventArgs: OnBeforeActionExecutedEventArgs) => void;
        public static OnAfterActionExecuted: (eventArgs: OnAfterActionExecutedEventArgs) => void;;

    }
}
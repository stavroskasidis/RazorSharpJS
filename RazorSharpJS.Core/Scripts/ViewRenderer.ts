namespace RazorSharp {
    export interface IViewRenderer {
        RenderView(viewContent): void;
    }

    export class ViewRenderer implements IViewRenderer {
        public RenderView(viewContent): void {
            $("[rs-body]").html(viewContent);
        }
    }

} 
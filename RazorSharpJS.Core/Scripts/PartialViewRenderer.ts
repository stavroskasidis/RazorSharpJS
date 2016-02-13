namespace RazorSharp {
    export interface IPartialViewRenderer {
        RenderPartialView(partialViewElement: HTMLElement, viewContent): void;
    }

    export class PartialViewRenderer implements IPartialViewRenderer {
        public RenderPartialView(partialViewElement: HTMLElement, viewContent): void {
            partialViewElement.innerHTML = viewContent;
        }
    }

} 
/// <reference path="typings/jquery/jquery.d.ts" />
namespace RazorSharp {

    export var UpdatePartial: (partialId: string, method: string, data?: any) => void;

    export function SubmitForm(form) {
        var button = form.ownerDocument.createElement('input');
        button.style.display = 'none';
        button.type = 'submit';
        form.appendChild(button).click();
        form.removeChild(button);
    }
    
}
namespace RazorSharp {
    export class Bootstrapper {
        //private AnchorHandler: IAnchorHandler;
        private FormHandler: IFormHandler;
        private HashHandler: IHashHandler;

        constructor(urlHandler: IHashHandler, formHandler: IFormHandler) {
            //this.AnchorHandler = anchorHandler;
            this.HashHandler = urlHandler;
            this.FormHandler = formHandler;
        }

        public BindHashChange() {
            var self = this;
            $(window).on('hashchange', function () {
                self.HashHandler.HandleHashChange(window.location.hash);
            });
        }

        public BindForms() {
            var self = this;
            $(document).on('submit', "form[rs-form]", function (e) {
                e.preventDefault(); //prevent default form submit
                self.FormHandler.HandleSubmit(<HTMLFormElement>$(this)[0]);
            });
        }
    }
}
namespace RazorSharp {
    export interface IUrlResolver {
        Resolve(anchorUrl: string): string;

    }

    export class UrlResolver implements IUrlResolver {
        public Resolve(anchorUrl: string): string {
            var result = anchorUrl.replace("#/", "");
            return result;
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Routing;

namespace System.Web.Mvc.Html
{
    public static class RazorSharpLinkExtensions
    {
        private static MvcHtmlString DecorateLink(MvcHtmlString originalLink)
        {
            MvcHtmlString result = new MvcHtmlString(originalLink.ToHtmlString().Replace("<a href=\"", "<a rs-anchor href=\"/#"));
            return result;
        }

        public static MvcHtmlString RazorSharpActionLink(this HtmlHelper htmlHelper, string linkText, string actionName)
        {
            return DecorateLink(LinkExtensions.ActionLink(htmlHelper, linkText, actionName));
        }
        public static MvcHtmlString RazorSharpActionLink(this HtmlHelper htmlHelper, string linkText, string actionName, object routeValues)
        {
            return DecorateLink(LinkExtensions.ActionLink(htmlHelper, linkText, actionName, routeValues));
        }
        public static MvcHtmlString RazorSharpActionLink(this HtmlHelper htmlHelper, string linkText, string actionName, RouteValueDictionary routeValues)
        {
            return DecorateLink(LinkExtensions.ActionLink(htmlHelper, linkText, actionName, routeValues));
        }
        public static MvcHtmlString RazorSharpActionLink(this HtmlHelper htmlHelper, string linkText, string actionName, string controllerName)
        {
            return DecorateLink(LinkExtensions.ActionLink(htmlHelper, linkText, actionName, controllerName));
        }
        public static MvcHtmlString RazorSharpActionLink(this HtmlHelper htmlHelper, string linkText, string actionName, object routeValues, object htmlAttributes)
        {
            return DecorateLink(LinkExtensions.ActionLink(htmlHelper, linkText, actionName, routeValues, htmlAttributes));
        }
        public static MvcHtmlString RazorSharpActionLink(this HtmlHelper htmlHelper, string linkText, string actionName, RouteValueDictionary routeValues, IDictionary<string, object> htmlAttributes)
        {
            return DecorateLink(LinkExtensions.ActionLink(htmlHelper, linkText, actionName, routeValues, htmlAttributes));
        }
        public static MvcHtmlString RazorSharpActionLink(this HtmlHelper htmlHelper, string linkText, string actionName, string controllerName, object routeValues, object htmlAttributes)
        {
            return DecorateLink(LinkExtensions.ActionLink(htmlHelper, linkText, actionName, controllerName, routeValues, htmlAttributes));
        }
        public static MvcHtmlString RazorSharpActionLink(this HtmlHelper htmlHelper, string linkText, string actionName, string controllerName, RouteValueDictionary routeValues, IDictionary<string, object> htmlAttributes)
        {
            return DecorateLink(LinkExtensions.ActionLink(htmlHelper, linkText, actionName, controllerName, routeValues, htmlAttributes));
        }
        public static MvcHtmlString RazorSharpActionLink(this HtmlHelper htmlHelper, string linkText, string actionName, string controllerName, string protocol, string hostName, string fragment, object routeValues, object htmlAttributes)
        {
            return DecorateLink(LinkExtensions.ActionLink(htmlHelper, linkText, actionName, controllerName, protocol, hostName,fragment,routeValues,htmlAttributes));
        }
        public static MvcHtmlString RazorSharpActionLink(this HtmlHelper htmlHelper, string linkText, string actionName, string controllerName, string protocol, string hostName, string fragment, RouteValueDictionary routeValues, IDictionary<string, object> htmlAttributes)
        {
            return DecorateLink(LinkExtensions.ActionLink(htmlHelper, linkText, actionName, controllerName, protocol, hostName, fragment, routeValues, htmlAttributes));
        }
        public static MvcHtmlString RazorSharpRouteLink(this HtmlHelper htmlHelper, string linkText, object routeValues)
        {
            return DecorateLink(LinkExtensions.RouteLink(htmlHelper, linkText, routeValues));
        }
        public static MvcHtmlString RazorSharpRouteLink(this HtmlHelper htmlHelper, string linkText, RouteValueDictionary routeValues)
        {
            return DecorateLink(LinkExtensions.RouteLink(htmlHelper, linkText, routeValues));
        }
        public static MvcHtmlString RazorSharpRouteLink(this HtmlHelper htmlHelper, string linkText, string routeName)
        {
            return DecorateLink(LinkExtensions.RouteLink(htmlHelper, linkText, routeName));
        }
        public static MvcHtmlString RazorSharpRouteLink(this HtmlHelper htmlHelper, string linkText, object routeValues, object htmlAttributes)
        {
            return DecorateLink(LinkExtensions.RouteLink(htmlHelper, linkText, routeValues, htmlAttributes));
        }
        public static MvcHtmlString RazorSharpRouteLink(this HtmlHelper htmlHelper, string linkText, RouteValueDictionary routeValues, IDictionary<string, object> htmlAttributes)
        {
            return DecorateLink(LinkExtensions.RouteLink(htmlHelper, linkText, routeValues, htmlAttributes));
        }
        public static MvcHtmlString RazorSharpRouteLink(this HtmlHelper htmlHelper, string linkText, string routeName, object routeValues)
        {
            return DecorateLink(LinkExtensions.RouteLink(htmlHelper, linkText, routeName, routeValues));
        }
        public static MvcHtmlString RazorSharpRouteLink(this HtmlHelper htmlHelper, string linkText, string routeName, RouteValueDictionary routeValues)
        {
            return DecorateLink(LinkExtensions.RouteLink(htmlHelper, linkText, routeName, routeValues));
        }
        public static MvcHtmlString RazorSharpRouteLink(this HtmlHelper htmlHelper, string linkText, string routeName, object routeValues, object htmlAttributes)
        {
            return DecorateLink(LinkExtensions.RouteLink(htmlHelper, linkText, routeName, routeValues, htmlAttributes));
        }
        public static MvcHtmlString RazorSharpRouteLink(this HtmlHelper htmlHelper, string linkText, string routeName, RouteValueDictionary routeValues, IDictionary<string, object> htmlAttributes)
        {
            return DecorateLink(LinkExtensions.RouteLink(htmlHelper, linkText, routeName, routeValues, htmlAttributes));
        }
        public static MvcHtmlString RazorSharpRouteLink(this HtmlHelper htmlHelper, string linkText, string routeName, string protocol, string hostName, string fragment, object routeValues, object htmlAttributes)
        {
            return DecorateLink(LinkExtensions.RouteLink(htmlHelper, linkText, routeName, protocol,hostName,fragment,routeValues,htmlAttributes));
        }
        public static MvcHtmlString RazorSharpRouteLink(this HtmlHelper htmlHelper, string linkText, string routeName, string protocol, string hostName, string fragment, RouteValueDictionary routeValues, IDictionary<string, object> htmlAttributes)
        {
            return DecorateLink(LinkExtensions.RouteLink(htmlHelper, linkText, routeName, protocol, hostName, fragment, routeValues, htmlAttributes));
        }
    }


}

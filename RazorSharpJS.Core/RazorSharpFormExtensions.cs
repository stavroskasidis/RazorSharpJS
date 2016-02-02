using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Dynamic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Routing;
using RazorSharp;

namespace System.Web.Mvc.Html
{
    public static class RazorSharpFormExtensions
    {
        public static MvcForm BeginRazorSharpForm(this HtmlHelper htmlHelper)
        {
            return FormExtensions.BeginForm(htmlHelper, null, null, null, FormMethod.Post, new Dictionary<string, object>() { { "rs-form", "" } });
        }
        public static MvcForm BeginRazorSharpForm(this HtmlHelper htmlHelper, object routeValues)
        {
            return FormExtensions.BeginForm(htmlHelper, null, null, new RouteValueDictionary(routeValues), FormMethod.Post, new Dictionary<string, object>() { { "rs-form", "" } });
        }
        public static MvcForm BeginRazorSharpForm(this HtmlHelper htmlHelper, RouteValueDictionary routeValues)
        {
            return FormExtensions.BeginForm(htmlHelper, null, null, routeValues, FormMethod.Post, new Dictionary<string, object>() { { "rs-form", "" } });
        }
        public static MvcForm BeginRazorSharpForm(this HtmlHelper htmlHelper, string actionName, string controllerName)
        {
            return FormExtensions.BeginForm(htmlHelper, actionName, controllerName, FormMethod.Post, new Dictionary<string, object>() { { "rs-form", "" } });
        }
        public static MvcForm BeginRazorSharpForm(this HtmlHelper htmlHelper, string actionName, string controllerName, FormMethod method)
        {
            return FormExtensions.BeginForm(htmlHelper, actionName, controllerName, method, new Dictionary<string, object>() { { "rs-form", "" } });
        }
        public static MvcForm BeginRazorSharpForm(this HtmlHelper htmlHelper, string actionName, string controllerName, object routeValues)
        {
            return FormExtensions.BeginForm(htmlHelper, actionName, controllerName, new RouteValueDictionary(routeValues), FormMethod.Post, new Dictionary<string, object>() { { "rs-form", "" } });
        }
        public static MvcForm BeginRazorSharpForm(this HtmlHelper htmlHelper, string actionName, string controllerName, RouteValueDictionary routeValues)
        {
            return FormExtensions.BeginForm(htmlHelper, actionName, controllerName, routeValues, FormMethod.Post, new Dictionary<string, object>() { { "rs-form", "" } });
        }
        public static MvcForm BeginRazorSharpForm(this HtmlHelper htmlHelper, string actionName, string controllerName, FormMethod method, IDictionary<string, object> htmlAttributes)
        {
            htmlAttributes.Add("rs-form","");
            return FormExtensions.BeginForm(htmlHelper, actionName, controllerName, method, htmlAttributes);
        }
        public static MvcForm BeginRazorSharpForm(this HtmlHelper htmlHelper, string actionName, string controllerName, FormMethod method, object htmlAttributes)
        {
            return FormExtensions.BeginForm(htmlHelper, actionName, controllerName, method, htmlAttributes.AddProperty("rs-form", ""));
        }
        public static MvcForm BeginRazorSharpForm(this HtmlHelper htmlHelper, string actionName, string controllerName, object routeValues, FormMethod method)
        {
            return FormExtensions.BeginForm(htmlHelper, actionName, controllerName, new RouteValueDictionary(routeValues), method, new Dictionary<string, object>() { { "rs-form", "" } });
        }
        public static MvcForm BeginRazorSharpForm(this HtmlHelper htmlHelper, string actionName, string controllerName, RouteValueDictionary routeValues, FormMethod method)
        {
            return FormExtensions.BeginForm(htmlHelper, actionName, controllerName, routeValues, method, new Dictionary<string, object>() { { "rs-form", "" } });
        }
        public static MvcForm BeginRazorSharpForm(this HtmlHelper htmlHelper, string actionName, string controllerName, object routeValues, FormMethod method, object htmlAttributes)
        {
            return FormExtensions.BeginForm(htmlHelper, actionName, controllerName, new RouteValueDictionary(routeValues), method, htmlAttributes.AddProperty("rs-form", ""));
        }
        public static MvcForm BeginRazorSharpForm(this HtmlHelper htmlHelper, string actionName, string controllerName, RouteValueDictionary routeValues, FormMethod method, IDictionary<string, object> htmlAttributes)
        {
            htmlAttributes.Add("rs-form", "");
            return FormExtensions.BeginForm(htmlHelper, actionName, controllerName, routeValues, method, htmlAttributes);
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace RazorSharp
{
    public static class RazorSharpRedirect
    {
        public static ActionResult RedirectToAction(string actionName)
        {
            UrlHelper urlHelper = new UrlHelper(HttpContext.Current.Request.RequestContext);
            string url = "#" + urlHelper.Action(actionName);
            JsonResult result = new JsonResult() { Data = new { RazorSharpJSRedirectTo = url } };
            return result;
        }
        public static ActionResult RedirectToAction(string actionName, object routeValues)
        {
            UrlHelper urlHelper = new UrlHelper(HttpContext.Current.Request.RequestContext);
            string url = "#" + urlHelper.Action(actionName,routeValues);
            JsonResult result = new JsonResult() { Data = new { RazorSharpJSRedirectTo = url } };
            return result;
        }
        public static ActionResult RedirectToAction(string actionName, string controllerName)
        {
            UrlHelper urlHelper = new UrlHelper(HttpContext.Current.Request.RequestContext);
            string url = "#" + urlHelper.Action(actionName,controllerName);
            JsonResult result = new JsonResult() { Data = new { RazorSharpJSRedirectTo = url } };
            return result;
        }
        public static ActionResult RedirectToAction(string actionName, string controllerName, object routeValues)
        {
            UrlHelper urlHelper = new UrlHelper(HttpContext.Current.Request.RequestContext);
            string url = "#" + urlHelper.Action(actionName,controllerName,routeValues);
            JsonResult result = new JsonResult() { Data = new { RazorSharpJSRedirectTo = url } };
            return result;
        }

        public static ActionResult Redirect(string url)
        {
            string finalUrl = "#/" + (url.TrimStart('/').TrimStart('#').TrimStart('/'));
            JsonResult result = new JsonResult() { Data = new { RazorSharpJSRedirectTo = url } };
            return result;
        }
    }
}

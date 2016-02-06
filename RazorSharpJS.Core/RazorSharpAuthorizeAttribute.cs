using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
using System.Web;

namespace RazorSharp
{
    public class RazorSharpAuthorizeAttribute : AuthorizeAttribute
    {
        private string LoginUrl { get; set; }

        private string ConvertUrl(string url)
        {
            return "#/" + (url.TrimStart('/').TrimStart('#').TrimStart('/'));
        }

        public RazorSharpAuthorizeAttribute()
        {
            if(RazorSharpConfiguration.LoginUrl == null)
            {
                throw new ArgumentException("You must set a login path at the RazorSharpConfiguration.LoginUrl property or use the constructor with the loginUrl argument");
            }
            this.LoginUrl = this.ConvertUrl(RazorSharpConfiguration.LoginUrl);
        }

        public RazorSharpAuthorizeAttribute(string loginUrl)
        {
            this.LoginUrl = this.ConvertUrl(loginUrl);
        }

        protected override void HandleUnauthorizedRequest(AuthorizationContext context)
        {
            if (context.HttpContext.Request.IsAjaxRequest())
            {
                var urlHelper = new UrlHelper(context.RequestContext);
                context.HttpContext.Response.StatusCode = 403;
                string urlParameters = null;
                if (context.HttpContext.Request.RawUrl.Contains("?"))
                {
                    urlParameters = Uri.UnescapeDataString(context.HttpContext.Request.RawUrl.Split('?')[1]);
                }
                string returnUrl = null;
                if (urlParameters== null || urlParameters.ToLower().Contains("returnurl") == false)
                {
                    returnUrl = "ReturnUrl=" + Uri.EscapeDataString(this.ConvertUrl(context.HttpContext.Request.RawUrl));
                }

                context.Result = new JsonResult
                {
                    Data = new
                    {
                        Error = "NotAuthorized",
                        RazorSharpJSLoginUrl = returnUrl == null ? this.LoginUrl : (this.LoginUrl.TrimEnd('/') + "?" + returnUrl)
                    },
                    JsonRequestBehavior = JsonRequestBehavior.AllowGet
                };
            }
            else
            {
                base.HandleUnauthorizedRequest(context);
            }
        }

    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SharpJS.Controllers
{
    public class ApplicationStartController : Controller
    {
        // GET: ApplicationStart
        public ActionResult Main()
        {
            return View();
        }

        public ActionResult MenuLoginPartial()
        {
            return PartialView();
        }
    }
}
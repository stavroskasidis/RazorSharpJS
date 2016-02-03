# RazorSharpJS - v0.1-alpha
Create Single Page Applications (SPA) using ASP.Net MVC and Razor engine views (.cshtml)

# Description
RazorSharpJS is a javascript library that allows you to use ASP MVC controllers and views to create Single Page applications or to easily convert an existing ASP MVC application into one.

# How it works ?
RazorSharpJS hooks into your page's DOM using javascript, handles anchors and form submits (that you decorate with directives) and converts them to ajax calls.

# Tutorial
### Create a main entry point
Create a controller that has the action that will be the main entry point of your application. This action will be the **only one** that does not return a partial view.


  **Controllers\ApplicationStartController.cs**
  ```
  public class ApplicationStartController : Controller
  {
      public ActionResult Main()
      {
          return View();
      }
  }
  ```
  **App_Start\RouteConfig.cs**
  ```
  public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "ApplicationStart", action = "Main", id = UrlParameter.Optional }
            );
        }
    }
  ```
### Create the main view 
Create the main view that will serve as a layout for our other views. Notice the `rs-body` directive. This directive instructs RazorSharpJS that the decorated element will be the placeholder for our partial views.


  **Views\ApplicationStart\Main.cshtml**
  

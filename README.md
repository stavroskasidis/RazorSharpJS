# RazorSharpJS - v0.1-alpha
Create Single Page Applications (SPA) using ASP.Net MVC and Razor engine views (.cshtml)

# Description
RazorSharpJS is a javascript library that allows you to use ASP MVC controllers and views to create Single Page applications or to easily convert an existing ASP MVC application into one.

# How it works ?
RazorSharpJS hooks into your page's DOM using javascript, handles anchors and form submits (that you decorate with directives) and converts them into ajax calls.

# Tutorial
### 1. Create a main entry point
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
### 2. Create the main view 
Create the main view that will serve as a layout for our other views. Notice the `rs-body` directive. This directive instructs RazorSharpJS that the decorated element will be the placeholder for our partial views.


  **Views\ApplicationStart\Main.cshtml**
  ```
  <head>
   @Scripts.Render("~/bundles/jquery") @*jquery is required*@
   <script src="~/Scripts/razorsharp.js"></script>
  </head>
  <body>
  ...
  <div class="container body-content">
        <div rs-body>
            @Html.Partial("../Home/Index")
        </div>
  </div>
  ...
  </body>
 ```
### 3. Adding links to navigate to your website
 You can now start adding links to your other controllers and views and use the power and features of ASP MVC, all you have to do is prefix your urls with '#' (or use the optional provided extensions) and razorsharp will automatically convert them to Ajax calls to your controllers. Just remember to always return parial views on your other controllers !
 
 
#####For example
```
<a href="/#/Home/Index">Home</a>
```
##### or
```
@Html.RazorSharpActionLink("Home", "Index", "Home")
```


 **Views\ApplicationStart\Main.cshtml**
 ```
 ...
 <body>
 ...
  <!-- LAYOUT MENU -->
  <div class="navbar-collapse collapse">
      <ul class="nav navbar-nav">
          <li>@Html.RazorSharpActionLink("Home", "Index", "Home")</li>@*Or <a href="/#/Home/Index">Home</a>*@
          <li>@Html.RazorSharpActionLink("About", "About", "Home")@*Or <a href="/#/Home/About">About</a>*@</li>
          <li>@Html.RazorSharpActionLink("Contact", "Contact", "Home")@*Or <a href="/#/Home/Contact">Contact</a>*@</li>
      </ul>
      @Html.Partial("_LoginPartial")
  </div>
   ...
 ```
 
 
 
 **Controllers\HomeController.cs**
 ```
 public class HomeController : Controller
 {
     public ActionResult Index()
     {
         return PartialView();
     }

     public ActionResult About()
     {
         return PartialView();
     }

     public ActionResult Contact()
     {
         return PartialView();
     }
 }
 ```

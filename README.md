# RazorSharpJS - v0.1-alpha
Create Single Page Applications (SPA) using ASP.Net MVC and Razor engine views (.cshtml)

# Description
RazorSharpJS is a javascript library that allows you to use ASP MVC controllers and views to create Single Page applications or to easily convert an existing ASP MVC application into one.

# How it works ?
RazorSharpJS hooks into your page's DOM using javascript, handles anchors and form submits and converts them into ajax calls.

# Tutorial
### 1. Create a main entry point
Create a controller that has the action that will be the main entry point of your application. This action will be the **only one** that does not return a partial view.


  **Controllers\ApplicationStartController.cs**
  ```C#
  public class ApplicationStartController : Controller
  {
      public ActionResult Main()
      {
          return View();
      }
  }
  ```
  **App_Start\RouteConfig.cs**
  ```C#
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
Create the main view that will serve as a layout for our other views and add the script for jquery (prerequisite) and razorsharp.js. Notice the `rs-body` directive. This directive instructs RazorSharpJS that the decorated element will be the placeholder for our views.


  **Views\ApplicationStart\Main.cshtml**
  ``` html
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
You can now start adding links to your other controllers and views and use the full power and features of ASP MVC, all you have to do is prefix your urls with '/#' (or use the provided extensions) and razorsharp will automatically convert them to Ajax calls to your controllers. Just remember to always return parial views on your other controllers !
 
 
##### The html way
``` html
<a href="/#/Home/Index">Home</a>
```
##### The Razor way, using the provided extensions (recommended)
``` c#
@Html.RazorSharpActionLink("Home", "Index", "Home")
```

####  3.1. Creating a menu

 **Views\ApplicationStart\Main.cshtml**
 ``` html
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
 ``` c#
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
### 4. Adding forms
You can add forms to your application and let razorsharp handle them by decorating them with the `rs-form` directive.

##### The html way
``` html
<form action="/UsersAdmin/Create" class="form-horizontal" method="post" role="form" rs-form>
...
</form>
```
##### The Razor way, by using the provided extensions (recommended)
``` c#
@using (Html.BeginRazorSharpForm("Create", "UsersAdmin", FormMethod.Post, new { @class = "form-horizontal", role = "form" }))
{
...
}
```
### 5. Redirecting from a controller
To redirect to an other action from your controller you will have to use the provided extension methods. 
``` c#
return RazorSharpRedirect.RedirectToAction("Login");
```

### 6. Using Authorization
To use the ASP's authorization in combination with razorsharp you will have to use the provided authorization attribute (or use it as the base class if your have custom authorization attributes).


##### Using a default login path and the attribute
``` c#
 public partial class Startup
 {
     public void ConfigureAuth(IAppBuilder app)
     {
         RazorSharpConfiguration.LoginUrl = "/Account/Login";
         ...
```

``` c#
[RazorSharpAuthorize]
public class UsersAdminController : Controller
{
...
```

##### Setting the login path at the attribute
``` c#
[RazorSharpAuthorize("/Account/Login")]
public class UsersAdminController : Controller
{
...
```

### 7. Client-side events
You have access to some client side events, so that for example you can show a loading animation.

``` js
 RazorSharp.Configuration.OnBeforeActionExecuted = function (url, data) {
     $(".spinner").show();
 }

 RazorSharp.Configuration.OnAfterActionExecuted = function (ajaxResult) {
     $(".spinner").hide();
 }
 ```

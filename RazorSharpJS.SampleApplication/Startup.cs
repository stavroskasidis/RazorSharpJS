using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(SharpJS.Startup))]
namespace SharpJS
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}

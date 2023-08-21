using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace PayMe.API.Controllers
{
    [AllowAnonymous]
    public class FallbackController : Controller
    {
        public IActionResult Index()
        {
            var filePath = Path.Combine(Directory.GetCurrentDirectory(),
                "wwwroot", "index.html");

            return PhysicalFile(filePath, "text/HTML");
        }
    }
}
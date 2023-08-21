using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PayMe.Application.CheckPayments;
using PayMe.Application.Services;

namespace PayMe.API.Controllers
{
    /// <summary>
    /// We use FromQuery attribute
    /// </summary>
    public class AdminController : BaseApiController
    {
        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllCheckPayments([FromQuery] CheckPaymentParams param)
        {
            var result = await Mediator!.Send(new ListAllCheckPayments.Query { Params = param });

            return HandlePagedResult(result);
        }
    }
}
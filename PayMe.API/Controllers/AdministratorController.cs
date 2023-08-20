using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PayMe.Application.CheckPayments;
using PayMe.Application.Services;

namespace PayMe.API.Controllers
{
    /// <summary>
    /// We use FromQuery attribute
    /// </summary>
    public class AdministratorController : BaseApiController
    {
        [HttpGet]
        [Authorize(Roles = "Child, Adult, Student")]
        public async Task<IActionResult> GetCheckPaymentsForRole([FromQuery] CheckPaymentParams param)
        {
            var result = await Mediator!.Send(new ListForRoleData.Query { Params = param });

            return HandlePagedResult(result);
        }
    }
}
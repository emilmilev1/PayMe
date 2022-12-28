using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PayMe.Application.CheckPayments;
using PayMe.Domain;

namespace PayMe.API.Controllers
{
    /// <summary>
    /// We use FromQuery attribute
    /// </summary>
    public class PaymentsController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetCheckPayments([FromQuery] CheckPaymentParams param)
        {
            return HandlePagedResult(await Mediator!.Send(new List.Query { Params = param }));
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult> GetCheckPayment(Guid id)
        {
            var result = await Mediator!.Send(new Details.Query { Id = id });

            return HandleResult(result);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateCheckPayment(CheckPayment checkPayment)
        {
            return HandleResult(await Mediator!.Send(new Create.Command { CheckPayment = checkPayment }));
        }

        // [Authorize(Policy = "")]
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> EditCheckPayment(Guid id, CheckPayment checkPayment)
        {
            checkPayment.Id = id;

            return HandleResult(await Mediator!.Send(new Edit.Command { CheckPayment = checkPayment }));
        }

        // [Authorize(Policy = "")]
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteCheckPayment(Guid id)
        {
            return HandleResult(await Mediator!.Send(new Delete.Command { Id = id }));
        }
    }
}
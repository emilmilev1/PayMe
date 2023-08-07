using Microsoft.AspNetCore.Mvc;
using PayMe.Application.CheckPayments;
using PayMe.Application.Services;
using PayMe.Domain.Entities;

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
        public async Task<IActionResult> GetCheckPayment(Guid id)
        {
            var result = await Mediator!.Send(new Details.Query { Id = id });

            return HandleResult(result);
        }

        [HttpPost]
        public async Task<IActionResult> CreateCheckPayment(CheckPayment checkPayment)
        {
            return HandleResult(await Mediator!.Send(new Create.Command { CheckPayment = checkPayment }));
        }

        [HttpGet("total")]
        public async Task<ActionResult<double>> GetTotalPayments()
        {
            var result = await Mediator!.Send(new CheckPaymentTotal.Query());
            
            return HandleResult(result);
        }

        // [Authorize(Policy = "")]
        [HttpPut("{id}")]
        public async Task<IActionResult> EditCheckPayment(Guid id, CheckPayment checkPayment)
        {
            checkPayment.Id = id;

            return HandleResult(await Mediator!.Send(new Edit.Command { CheckPayment = checkPayment }));
        }

        // [Authorize(Policy = "")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCheckPayment(Guid id)
        {
            return HandleResult(await Mediator!.Send(new Delete.Command { Id = id }));
        }
    }
}
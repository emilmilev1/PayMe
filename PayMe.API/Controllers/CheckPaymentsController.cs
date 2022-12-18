using System.Diagnostics;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PayMe.Application.CheckPayments;
using PayMe.Application.Core;
using PayMe.Core;
using PayMe.Domain;

namespace PayMe.API.Controllers
{
    /// <summary>
    /// We use FromQuery attribute
    /// </summary>
    
    public class CheckPaymentsController : BaseApiController
    {
        private readonly List _list = null;
        
        [HttpGet]
        public Task<List<CheckPaymentDto>> GetCheckPayments()
        {
            var data = _list.GetAllCheckPayments();
            
            return data;
        }

        [HttpPost]
        public async Task<IActionResult> CreateCheckPayment(CheckPayment checkPayment)
        {
            return HandleResult(await Mediator!.Send(new Create.Command { CheckPayment = checkPayment }));
        }

        [Authorize(Policy = "IsHost")]
        [HttpPut("{id}")]
        public async Task<IActionResult> EditCheckPayment(Guid id, CheckPayment checkPayment)
        {
            checkPayment.Id = id;

            return HandleResult(await Mediator!.Send(new Edit.Command { CheckPayment = checkPayment }));
        }

        [Authorize(Policy = "IsActivityHost")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCheckPayment(Guid id)
        {
            return HandleResult(await Mediator!.Send(new Delete.Command { Id = id }));
        }
    }
}
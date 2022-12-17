using MediatR;
using Microsoft.AspNetCore.Mvc;
using PayMe.Application.Core;

namespace PayMe.API.Controllers
{
    /// <summary>
    /// Make base api controller
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController : ControllerBase
    {
        private IMediator? _mediator;

        protected IMediator? Mediator => _mediator ??= HttpContext.RequestServices
            .GetService<IMediator>();
        
        protected ActionResult HandleResult<T>(Result<T> result)
        {
            if (result == null) return NotFound();

            if (result.IsSuccess && result.Value != null) return Ok(result.Value);

            if (result.IsSuccess && result.Value == null) return NotFound();

            return BadRequest(result.Error);
        }
    }
}

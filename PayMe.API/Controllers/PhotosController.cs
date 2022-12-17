using Microsoft.AspNetCore.Mvc;
using PayMe.Application.Photos;

namespace PayMe.API.Controllers
{
    public class PhotosController : BaseApiController
    {
        [HttpPost]
        public async Task<IActionResult> Add([FromForm] AddImage.Command command)
        {
            return HandleResult(await Mediator!.Send(command));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            return HandleResult(await Mediator!.Send(new DeleteImage.Command { Id = id }));
        }

        [HttpPost("{id}/setMain")]
        public async Task<IActionResult> SetMain(string id)
        {
            return HandleResult(await Mediator!.Send(new SetMainImageOnProfile.Command { Id = id }));
        }
    }
}
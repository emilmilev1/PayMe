using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PayMe.API.Models;
using PayMe.Application.Administrator;
using PayMe.Application.CheckPayments;
using PayMe.Application.Services;
using PayMe.Domain.Entities;

namespace PayMe.API.Controllers
{
    /// <summary>
    /// We use FromQuery attribute
    /// </summary>
    [ApiController]
    //[Authorize(Policy = "RequireChildRole, RequireAdultRole, RequireStudentRole")]
    [Authorize(Roles = "Child, Adult, Student")]
    [Route("api/[controller]")]
    public class AdministratorController : BaseApiController
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly AdministratorRolesService _administratorRolesService;

        public AdministratorController(UserManager<AppUser> userManager,
            AdministratorRolesService administratorRolesService)
        {
            _userManager = userManager;
            _administratorRolesService = administratorRolesService;
        }

        [HttpGet]
        [Authorize(Roles = "Child, Adult, Student")]
        public async Task<IActionResult> GetCheckPaymentsForRole([FromQuery] CheckPaymentParams param)
        {
            var result = await Mediator!.Send(new ListForRoleData.Query { Params = param });

            return HandlePagedResult(result);
        }

        [HttpPost("createAdministrator")]
        [Authorize(Roles = "Child, Adult, Student")]
        public async Task<IActionResult> CreateAdministrator([FromBody] RegisterDto adminDto, string roleName)
        {
            var administratorUser = new AppUser()
            {
                UserName = adminDto.Username,
                Email = adminDto.Email,
                FirstName = adminDto.FirstName,
                LastName = adminDto.LastName
            };

            var result = await _userManager.CreateAsync(administratorUser, adminDto.Password);

            if (result.Succeeded)
            {
                await _administratorRolesService.CreateAdministratorRoles();

                if (!await _userManager.IsInRoleAsync(administratorUser, roleName))
                {
                    await _userManager.AddToRoleAsync(administratorUser, roleName);
                }

                return Ok($"{roleName} administrator created successfully.");
            }

            return BadRequest(result.Errors);
        }
    }
}
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PayMe.API.Models;
using PayMe.Application.Admin;
using PayMe.Application.CheckPayments;
using PayMe.Application.Services;
using PayMe.Domain.Entities;

namespace PayMe.API.Controllers
{
    /// <summary>
    /// We use FromQuery attribute
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : BaseApiController
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly AdminRoleService _adminRoleService;

        public AdminController(UserManager<AppUser> userManager, AdminRoleService adminRoleService)
        {
            _userManager = userManager;
            _adminRoleService = adminRoleService;
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllCheckPayments([FromQuery] CheckPaymentParams param)
        {
            var result = await Mediator!.Send(new ListAllCheckPayments.Query { Params = param });

            return HandlePagedResult(result);
        }

        [HttpPost("createAdmin")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateAdmin([FromBody] RegisterDto adminDto, string roleName)
        {
            var adminUser = new AppUser
            {
                UserName = adminDto.Username,
                Email = adminDto.Email,
                FirstName = adminDto.FirstName,
                LastName = adminDto.LastName,
            };

            var result = await _userManager.CreateAsync(adminUser, adminDto.Password);

            if (result.Succeeded)
            {
                await _adminRoleService.CreateAdminRoles();

                if (!await _userManager.IsInRoleAsync(adminUser, roleName))
                {
                    await _userManager.AddToRoleAsync(adminUser, roleName);
                }

                return Ok("Admin user created successfully.");
            }

            return BadRequest(result.Errors);
        }
    }
}
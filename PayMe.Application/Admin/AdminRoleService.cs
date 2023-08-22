using Microsoft.AspNetCore.Identity;

namespace PayMe.Application.Admin
{
    public class AdminRoleService
    {
        private readonly RoleManager<IdentityRole> _roleManager;

        public AdminRoleService(RoleManager<IdentityRole> roleManager)
        {
            _roleManager = roleManager;
        }

        public async Task CreateAdminRoles()
        {
            await CreateRoleIfNotExists("Admin");
        }

        private async Task CreateRoleIfNotExists(string roleName)
        {
            if (!await _roleManager.RoleExistsAsync(roleName))
            {
                await _roleManager.CreateAsync(new IdentityRole(roleName));
            }
        }
    }
}
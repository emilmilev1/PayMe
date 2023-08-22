using Microsoft.AspNetCore.Identity;

namespace PayMe.Application.Administrator
{
    public class AdministratorRolesService
    {
        private readonly RoleManager<IdentityRole> _roleManager;

        public AdministratorRolesService(RoleManager<IdentityRole> roleManager)
        {
            _roleManager = roleManager;
        }

        public async Task CreateAdministratorRoles()
        {
            await CreateRoleIfNotExists("Child");
            await CreateRoleIfNotExists("Adult");
            await CreateRoleIfNotExists("Student");
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
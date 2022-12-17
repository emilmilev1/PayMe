using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using PayMe.Application.Interfaces;

namespace PayMe.Infrastructure.Security
{
    public class UserAccessor : IUserAccessor
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public UserAccessor(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public string GetUsername()
        {
            return _httpContextAccessor.HttpContext!.User.FindFirstValue(ClaimTypes.Name);
        }
    }
}
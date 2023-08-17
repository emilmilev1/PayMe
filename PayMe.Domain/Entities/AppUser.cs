using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace PayMe.Domain.Entities
{
    /// <summary>
    /// Entity AppUser
    /// </summary>
    public class AppUser : IdentityUser
    {
        public string FirstName { get; set; } = null!;

        public string LastName { get; set; } = null!;

        public string Bio { get; set; } = null!;

        public ICollection<Photo> Photos { get; set; } = null!;

        public ICollection<CheckAttendee> CheckPaymentsUsers { get; set; } = null!;

        public ICollection<RefreshToken> RefreshTokens { get; set; } = new List<RefreshToken>();
    }
}
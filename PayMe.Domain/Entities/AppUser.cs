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

        public int Age { get; set; }

        public string Bio { get; set; } = null!;

        public string RoleName { get; set; }

        public ICollection<Photo> Photos { get; set; } = new List<Photo>();

        public ICollection<CheckAttendee> CheckPaymentsUsers { get; set; } = null!;

        public ICollection<RefreshToken> RefreshTokens { get; set; } = new List<RefreshToken>();
    }
}
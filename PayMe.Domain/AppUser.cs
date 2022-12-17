using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace PayMe.Domain
{
    /// <summary>
    /// Entity AppUser
    /// </summary>
    public class AppUser : IdentityUser
    {
        public string FirstName { get; set; } = null!;

        public string LastName { get; set; } = null!;

        public ICollection<Photo> Photos { get; set; }= new List<Photo>();

        public IEnumerable<CheckAttendee>? CheckAttendees { get; set; }= new List<CheckAttendee>();
        
        public IEnumerable<CheckPayment>? CheckPayments { get; set; }= new List<CheckPayment>();

        public ICollection<RefreshToken> RefreshTokens { get; set; } = new List<RefreshToken>();
    }
}
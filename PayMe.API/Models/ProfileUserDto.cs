using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PayMe.API.Models
{
    public class ProfileUserDto
    {
        public string Username { get; set; } = null!;
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string Token { get; set; } = null!;
        public string Image { get; set; } = null!;
    }
}
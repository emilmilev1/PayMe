using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PayMe.API.Models
{
    public class ResetPasswordUserDto
    {
        [Required] [EmailAddress] public string Email { get; set; } = null!;

        [Required]
        [RegularExpression("^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[@$!%*#?&])[A-Za-z0-9@$!%*#?&]{8,}$",
            ErrorMessage = "Minimum eight characters, at least one letter, one number and one special character")]
        public string Password { get; set; } = null!;
    }
}
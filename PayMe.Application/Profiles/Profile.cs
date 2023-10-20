using PayMe.Domain.Entities;

namespace PayMe.Application.Profiles
{
    public class Profile
    {
        public string Username { get; set; } = null!;
        public string RoleName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public int Age { get; set; }
        public string Bio { get; set; } = null!;
        public string Image { get; set; } = null!;
        public ICollection<Photo> Photos { get; set; } = null!;
    }
}
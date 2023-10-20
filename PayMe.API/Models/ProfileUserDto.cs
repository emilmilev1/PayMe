namespace PayMe.API.Models
{
    public class ProfileUserDto
    {
        public string Username { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public int Age { get; set; }
        public string Bio { get; set; } = null!;
        public string? RoleName { get; set; } = null!;
        public string Token { get; set; } = null!;
        public string Image { get; set; } = null!;
    }
}
using PayMe.Domain;

namespace PayMe.Application.Profiles
{
    public class Profile
    {
        public string Username { get; set; } = null!;
        public string FirstName { get; set; } = null!;
        
        public string LastName { get; set; } = null!;

        public string Image { get; set; }= null!;

        public ICollection<Photo> Photos { get; set; } = new List<Photo>();
    }
}
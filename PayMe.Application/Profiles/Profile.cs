using PayMe.Domain;

namespace PayMe.Application.Profile
{
    public class Profile
    {
        public string Username { get; set; } = null!;

        public string DisplayName { get; set; }= null!;
        
        public string Bio { get; set; }= null!;
        
        public string Image { get; set; }= null!;
        
        public ICollection<Photo> Photos { get; set; }
    }
}
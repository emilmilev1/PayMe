namespace PayMe.Application.CheckPayments
{
    public class CheckAttendeeDto
    {
        public string Username { get; set; } = null!;
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public int Age { get; set; }
        public string Bio { get; set; } = null!;
        public string Image { get; set; } = null!;
    }
}
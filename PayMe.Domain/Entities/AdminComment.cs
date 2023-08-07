using System;

namespace PayMe.Domain.Entities
{
    /// <summary>
    /// Entity AdminComment
    /// </summary>
    public class AdminComment
    {
        public int Id { get; set; }
        
        public string Body { get; set; } = null!;

        public AppUser Author { get; set; } = null!;

        public CheckPayment CheckPayment { get; set; } = null!;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
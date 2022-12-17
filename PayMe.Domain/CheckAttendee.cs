using System;

namespace PayMe.Domain
{
    /// <summary>
    /// Entity CheckAttendee
    /// </summary>
    public class CheckAttendee
    {
        public Guid CheckPaymentId { get; set; }

        public string AppUserId { get; set; } = null!;

        public AppUser AppUser { get; set; } = null!;

        public CheckPayment CheckPayment { get; set; } = null!;

        public bool IsHost { get; set; }
    }
}
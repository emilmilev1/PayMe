using System;

namespace PayMe.Domain.Entities
{
    /// <summary>
    /// Entity CheckAttendee
    /// </summary>
    public class CheckAttendee
    {
        public Guid CheckPaymentId { get; set; }

        public string AppUserId { get; set; } = null!;

        public AppUser? AppUser { get; set; }

        public CheckPayment CheckPayment { get; set; } = null!;
    }
}
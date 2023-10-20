using System;
using System.Collections.Generic;

namespace PayMe.Domain.Entities
{
    /// <summary>
    /// Entity CheckPayment
    /// </summary>
    public class CheckPayment
    {
        public Guid Id { get; set; }

        public int PaymentNumber { get; set; }

        public DateTime Date { get; set; }

        public string Title { get; set; } = null!;

        public string FirstName { get; set; } = null!;

        public string LastName { get; set; } = null!;

        public string Address { get; set; } = null!;

        public string Country { get; set; } = null!;

        public int ZipCode { get; set; }

        public double Total { get; set; }

        public ICollection<CheckAttendee> CheckPaymentsUsers { get; set; } = new List<CheckAttendee>();
    }
}
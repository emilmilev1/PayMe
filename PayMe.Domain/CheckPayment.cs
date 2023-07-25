using System;
using System.Collections.Generic;

namespace PayMe.Domain
{
    /// <summary>
    /// Entity CheckPayment
    /// </summary>
    public class CheckPayment
    {
        public Guid Id { get; set; }

        public DateTime Date { get; set; }
        
        public string Title { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; } 

        public string Address { get; set; } 

        public string Country { get; set; }
        
        public int ZipCode { get; set; }

        public double Total { get; set; }

        public ICollection<CheckAttendee> CheckPaymentsUsers { get; set; } = new List<CheckAttendee>();

        public ICollection<AdminComment> AdminComments { get; set; } = new List<AdminComment>();
    }
}
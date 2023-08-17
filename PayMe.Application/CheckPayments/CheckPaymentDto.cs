using System.ComponentModel.DataAnnotations;
using PayMe.Domain.Entities;

namespace PayMe.Application.CheckPayments
{
    public class CheckPaymentDto
    {
        [Key]
        [Required]
        public Guid Id { get; set; }
        
        [Required]
        public int PaymentNumber { get; set; }

        [Required]
        public DateTime? Date { get; set; }
        
        [Required]
        [StringLength(30, MinimumLength = 5)]
        public string Title { get; set; } = null!;

        [Required]
        [StringLength(40, MinimumLength = 3)]
        public string FirstName { get; set; } = null!;

        [Required]
        [StringLength(40, MinimumLength = 3)]
        public string LastName { get; set; } = null!;

        [Required]
        [StringLength(100, MinimumLength = 5)]
        public string Address { get; set; } = null!;

        [Required]
        [Display(Name = "Country Category")]
        public string Country { get; set; } = null!;
        
        [Required]
        [Display(Name = "Zip Code")]
        public int ZipCode { get; set; }

        [Required]
        [Range(0.00, 100000.00, ErrorMessage = "Total should be a positive number!")]
        public double Total { get; set; }
        
        public ICollection<CheckAttendee> CheckAttendees { get; set; } = new List<CheckAttendee>();
    }
}
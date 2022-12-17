using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;
using PayMe.Domain;

namespace PayMe.Application.CheckPayments
{
    public class CheckPaymentDto
    {
        [Key]
        [Required]
        public Guid Id { get; set; }

        [Required]
        public DateTimeFormat Date { get; set; }
        
        [Required]
        [MaxLength(30)]
        public string Title { get; set; } = null!;

        [Required]
        [MaxLength(40)]
        public string FirstName { get; set; } = null!;

        [Required]
        [MaxLength(40)]
        public string LastName { get; set; } = null!;

        [Required]
        [MaxLength(100)]
        public string Address { get; set; } = null!;

        [Required]
        [MaxLength(60)]
        public string Country { get; set; } = null!;

        [Required]
        [Range(0.00, 100000.00)]
        public double Total { get; set; }
        
        public string HostUsername { get; set; } = null!;
    }
}
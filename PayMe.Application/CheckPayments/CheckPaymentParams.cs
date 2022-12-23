using PayMe.Application.Core;

namespace PayMe.Application.CheckPayments
{
    public class CheckPaymentParams : PagedParams
    {
        public DateTime StartDate { get; set; } = DateTime.UtcNow;
    }
}
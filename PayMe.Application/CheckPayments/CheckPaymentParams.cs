using PayMe.Application.Core;

namespace PayMe.Application.CheckPayments
{
    public class CheckPaymentParams : PagedParams
    {
        public string OrderBy { get; set; } = "total";
        public bool IsDescending { get; set; } = true;
    }
}
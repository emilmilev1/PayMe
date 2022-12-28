using FluentValidation;
using PayMe.Domain;

namespace PayMe.Application.CheckPayments
{
    public class CheckPaymentValidator : AbstractValidator<CheckPayment>
    {
        public CheckPaymentValidator()
        {
            RuleFor(x => x.Date).NotEmpty();
            RuleFor(x => x.Title).NotEmpty();
            RuleFor(x => x.FirstName).NotEmpty();
            RuleFor(x => x.LastName).NotEmpty();
            RuleFor(x => x.Address).NotEmpty();
            RuleFor(x => x.Country).NotEmpty();
            RuleFor(x => x.ZipCode).NotEmpty();
            RuleFor(x => x.Total).NotEmpty();
        }
    }
}
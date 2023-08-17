using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using PayMe.Application.CheckPayments;
using PayMe.Application.Core;
using PayMe.Application.Interfaces;
using PayMe.Core;
using PayMe.Domain.Entities;

namespace PayMe.Application.Services
{
    /// <summary>
    /// We use "Unit" - We do not return any check Payments from this
    /// </summary>
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public CheckPayment CheckPayment { get; set; } = null!;
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.CheckPayment).SetValidator(new CheckPaymentValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.FirstOrDefaultAsync(x =>
                    x.UserName == _userAccessor.GetUsername(), cancellationToken: cancellationToken);

                var paymentNumbers = await _context.CheckPayments
                    .Where(cp => cp.CheckPaymentsUsers.Any(cu => cu.AppUserId == user!.Id))
                    .Select(cp => cp.PaymentNumber)
                    .ToListAsync(cancellationToken: cancellationToken);

                int nextPaymentNumber = paymentNumbers.DefaultIfEmpty(0).Max() + 1;

                var attendee = new CheckAttendee
                {
                    AppUser = user,
                    CheckPayment = request.CheckPayment
                };

                request.CheckPayment.Date = DateTime.Now;
                request.CheckPayment.PaymentNumber = nextPaymentNumber;

                request.CheckPayment.CheckPaymentsUsers.Add(attendee);

                _context.CheckPayments.Add(request.CheckPayment);

                var result = await _context.SaveChangesAsync(cancellationToken) > 0;

                if (!result)
                {
                    return Result<Unit>.Failure("Failed to create a check payment!");
                }

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
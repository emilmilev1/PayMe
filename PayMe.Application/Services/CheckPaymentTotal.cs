using MediatR;
using Microsoft.EntityFrameworkCore;
using PayMe.Application.Core;
using PayMe.Application.Interfaces;
using PayMe.Core;

namespace PayMe.Application.Services
{
    public abstract class CheckPaymentTotal
    {
        public class Query : IRequest<Result<double>>
        {
        }

        public class Handler : IRequestHandler<Query, Result<double>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Result<double>> Handle(Query request, CancellationToken cancellationToken)
            {
                var totalAmount = await _context.CheckPayments
                    .Where(chP =>
                        chP.CheckPaymentsUsers
                            .Any(cpu =>
                                cpu.AppUserId == _userAccessor.GetUserId()))
                    .SumAsync(chP =>
                        chP.Total, cancellationToken);

                return Result<double>.Success(totalAmount);
            }
        }
    }
}
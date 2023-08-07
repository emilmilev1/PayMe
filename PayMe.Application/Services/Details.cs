using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using PayMe.Application.CheckPayments;
using PayMe.Application.Core;
using PayMe.Application.Interfaces;
using PayMe.Core;

namespace PayMe.Application.Services
{
    public abstract class Details
    {
        public class Query : IRequest<Result<CheckPaymentDto>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<CheckPaymentDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<CheckPaymentDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var payment = await _context.CheckPayments
                    .ProjectTo<CheckPaymentDto>(_mapper.ConfigurationProvider)
                    .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken: cancellationToken);

                if (payment == null)
                {
                    return Result<CheckPaymentDto>.Failure("CheckPayment not found");
                }

                return Result<CheckPaymentDto>.Success(payment);
            }
        }
    }
}
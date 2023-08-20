using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using PayMe.Application.CheckPayments;
using PayMe.Application.Core;
using PayMe.Application.Interfaces;
using PayMe.Core;

namespace PayMe.Application.Services
{
    public abstract class ListUserData
    {
        public class Query : IRequest<Result<PagedList<CheckPaymentDto>>>
        {
            public CheckPaymentParams Params { get; set; } = null!;
        }

        public class Handler : IRequestHandler<Query, Result<PagedList<CheckPaymentDto>>>
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

            public async Task<Result<PagedList<CheckPaymentDto>>> Handle(Query request,
                CancellationToken cancellationToken)
            {
                var query = _context.CheckPayments
                    .Where(chP => chP.CheckPaymentsUsers.Any(
                        cpu => cpu.AppUserId == _userAccessor.GetUserId()))
                    .ProjectTo<CheckPaymentDto>(_mapper.ConfigurationProvider)
                    .AsQueryable();

                if (!string.IsNullOrEmpty(request.Params.OrderBy))
                {
                    switch (request.Params.OrderBy.ToLower())
                    {
                        case "date":
                            query = request.Params.IsDescending.HasValue && request.Params.IsDescending.Value
                                ? query.OrderByDescending(payment => payment.Date)
                                : query.OrderBy(payment => payment.Date);
                            break;
                        case "total":
                            query = request.Params.IsDescending.HasValue && request.Params.IsDescending.Value
                                ? query.OrderByDescending(payment => payment.Total)
                                : query.OrderBy(payment => payment.Total);
                            break;
                    }
                }

                return Result<PagedList<CheckPaymentDto>>.Success(
                    await PagedList<CheckPaymentDto>.CreateAsync(
                        query,
                        request.Params.PageNumber,
                        request.Params.PageSize)
                );
            }
        }
    }
}
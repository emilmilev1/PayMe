using System.Collections.ObjectModel;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using PayMe.Application.Core;
using PayMe.Application.Interfaces;
using PayMe.Core;
using PayMe.Domain;

namespace PayMe.Application.CheckPayments
{
    public class List
    {
        public class Query : IRequest<Result<PagedList<CheckPaymentDto>>>
        {
            public CheckPaymentParams Params { get; set; }
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
                    .OrderBy(d => d.Date)
                    .ProjectTo<CheckPaymentDto>(_mapper.ConfigurationProvider)
                    .AsQueryable();

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
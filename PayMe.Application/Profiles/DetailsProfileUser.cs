using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using PayMe.Application.Core;
using PayMe.Application.Interfaces;
using PayMe.Core;

namespace PayMe.Application.Profiles
{
    /// <summary>
    /// Service which shows Profile user data
    /// Anything that doesn't update the database is going to be a Query
    /// </summary>
    public abstract class DetailsProfileUser
    {
        public class Query : IRequest<Result<Profile>>
        {
            public string Username { get; set; } = null!;
        }

        public class Handler : IRequestHandler<Query, Result<Profile>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<Profile>> Handle(Query request, CancellationToken cancellationToken)
            {
                var currentUser = _userAccessor.GetUsername();

                if (currentUser == null)
                {
                    return Result<Profile>.Failure("No logged-in user.");
                }

                var profile = await _context.Users
                    .ProjectTo<Profile>(_mapper.ConfigurationProvider,
                        new { currentUsername = _userAccessor.GetUsername() })
                    .SingleOrDefaultAsync(x => x.Username == request.Username,
                        cancellationToken: cancellationToken);

                if (profile == null)
                {
                    return Result<Profile>.Failure("Profile not found.");
                }

                return Result<Profile>.Success(profile);
            }
        }
    }
}
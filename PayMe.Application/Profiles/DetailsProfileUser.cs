using System.Security.Claims;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using PayMe.Application.Core;
using PayMe.Application.Interfaces;
using PayMe.Core;

namespace PayMe.Application.Profiles
{
    /// <summary>
    /// Service which shows Profile user data
    /// Anything that doesn't update the database is going to be a Query
    /// </summary>
    public class DetailsProfileUser
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
            private readonly ILogger<Handler> _logger;

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor, ILogger<Handler> logger)
            {
                _userAccessor = userAccessor;
                _mapper = mapper;
                _context = context;
                _logger = logger;
            }

            public async Task<Result<Profile>> Handle(Query request, CancellationToken cancellationToken)
            {
                var currentUser = _userAccessor.GetUsername();

                if (currentUser == null)
                {
                    _logger.LogInformation("No logged-in user.");
                    return Result<Profile>.Failure("No logged-in user.");
                }

                var profile = await _context.Users
                    .ProjectTo<Profile>(_mapper.ConfigurationProvider)
                    .SingleOrDefaultAsync(x => x.Username == currentUser,
                        cancellationToken: cancellationToken);

                if (profile == null)
                {
                    _logger.LogWarning("Profile not found for user: {Username}", currentUser);
                    return Result<Profile>.Failure("Profile not found.");
                }

                _logger.LogInformation("Current user profile retrieved: {@Profile}", profile);
                return Result<Profile>.Success(profile);
            }
        }
    }
}
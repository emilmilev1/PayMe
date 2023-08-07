using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PayMe.Application.Core;
using PayMe.Application.Interfaces;
using PayMe.Core;

namespace PayMe.Application.Photos
{
    public abstract class SetMainImageOnProfile
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string Id { get; set; } = null!;
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users
                    .Include(p => p.Photos)
                    .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername(),
                        cancellationToken: cancellationToken);
                if (user == null)
                {
                    return null!;
                }

                var photo = user.Photos.FirstOrDefault(x => x.Id == request.Id);
                if (photo == null)
                {
                    return null!;
                }

                var currentMain = user.Photos.FirstOrDefault(x => x.IsMain);
                if (currentMain != null)
                {
                    currentMain.IsMain = false;
                }

                photo.IsMain = true;

                var success = await _context.SaveChangesAsync(cancellationToken) > 0;

                if (success)
                {
                    return Result<Unit>.Success(Unit.Value);
                }

                return Result<Unit>.Failure("Problem setting main photo");
            }
        }
    }
}
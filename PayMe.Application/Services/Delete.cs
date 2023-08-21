using MediatR;
using PayMe.Application.Core;
using PayMe.Core;

namespace PayMe.Application.Services
{
    public abstract class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; init; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                if (request.Id == Guid.Empty)
                {
                    return Result<Unit>.Failure("Invalid Id value.");
                }

                var checkPayment = await _context.CheckPayments
                    .FindAsync(new object?[] { request.Id },
                        cancellationToken);
                if (checkPayment == null)
                {
                    return Result<Unit>.Failure("Check payment not found.");
                }

                _context.Remove(checkPayment);

                var result = await _context.SaveChangesAsync(cancellationToken) > 0;

                if (!result)
                {
                    return Result<Unit>.Failure("Failed to delete the check payment!");
                }

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
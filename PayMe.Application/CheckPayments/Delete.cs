using MediatR;
using PayMe.Application.Core;
using PayMe.Core;

namespace PayMe.Application.CheckPayments
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
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
                var checkPayment = await _context.CheckPayments.FindAsync(request.Id);

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
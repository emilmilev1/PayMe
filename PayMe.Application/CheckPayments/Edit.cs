using System.Diagnostics;
using AutoMapper;
using FluentValidation;
using MediatR;
using PayMe.Application.Core;
using PayMe.Core;
using PayMe.Domain;

namespace PayMe.Application.CheckPayments
{
    public class Edit
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
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                if (request.CheckPayment.Id == Guid.Empty)
                    return Result<Unit>.Failure("Invalid Check payment ID!");

                var checkPayment = await _context.CheckPayments.FindAsync(request.CheckPayment.Id);

                if (checkPayment == null)
                {
                    return Result<Unit>.Failure("Check payment not found!");
                }

                request.CheckPayment.Date = DateTime.Now;

                _mapper.Map(request.CheckPayment, checkPayment);

                var result = await _context.SaveChangesAsync(cancellationToken) > 0;

                if (!result)
                {
                    return Result<Unit>.Failure("Failed to update the check payment!");
                }

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
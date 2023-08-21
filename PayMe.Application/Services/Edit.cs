using AutoMapper;
using FluentValidation;
using MediatR;
using PayMe.Application.CheckPayments;
using PayMe.Application.Core;
using PayMe.Core;
using PayMe.Domain.Entities;

namespace PayMe.Application.Services
{
    public abstract class Edit
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
                
                var originalPaymentId = request.CheckPayment.Id;

                var checkPayment = await _context.CheckPayments.FindAsync(new object?[] { originalPaymentId },
                    cancellationToken: cancellationToken);

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
                
                UpdatePaymentInList(originalPaymentId, request.CheckPayment);

                return Result<Unit>.Success(Unit.Value);
            }
            
            private void UpdatePaymentInList(Guid originalPaymentId, CheckPayment updatedPayment)
            {
                var paymentToUpdate = _context.CheckPayments.FirstOrDefault(p => p.Id == originalPaymentId);

                _mapper.Map(paymentToUpdate, updatedPayment);
                
                if (paymentToUpdate != null)
                {
                    paymentToUpdate.PaymentNumber = updatedPayment.PaymentNumber;
                    paymentToUpdate.Date = updatedPayment.Date;
                    paymentToUpdate.Title = updatedPayment.Title;
                    paymentToUpdate.FirstName = updatedPayment.FirstName;
                    paymentToUpdate.LastName = updatedPayment.LastName;
                    paymentToUpdate.Address = updatedPayment.Address;
                    paymentToUpdate.Country = updatedPayment.Country;
                    paymentToUpdate.ZipCode = updatedPayment.ZipCode;
                    paymentToUpdate.Total = updatedPayment.Total;
                }
            }
        }
    }
}
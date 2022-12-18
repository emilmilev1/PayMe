using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using PayMe.Application.Core;
using PayMe.Application.Interfaces;
using PayMe.Core;

namespace PayMe.Application.CheckPayments
{
    public class List
    {
        private readonly DataContext _context;

        public List(DataContext context)
        {
            _context = context;
        }

        public async Task<List<CheckPaymentDto>> GetAllCheckPayments()
        {
            var checkPayments = new List<CheckPaymentDto>();
            var allCheckPayments = await _context.CheckPayments.ToListAsync();

            if (allCheckPayments?.Any() == true)
            {
                foreach (var checkPayment in allCheckPayments)
                {
                    checkPayments.Add(new CheckPaymentDto()
                    {
                        Id = checkPayment.Id,
                        Date = checkPayment.Date,
                        Title = checkPayment.Title,
                        FirstName = checkPayment.FirstName,
                        LastName = checkPayment.LastName,
                        Address = checkPayment.Address,
                        Country = checkPayment.Country,
                        Total = checkPayment.Total
                    });
                }
            }

            return checkPayments;
        }
    }
}
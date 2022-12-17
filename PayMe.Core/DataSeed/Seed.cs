using System.Diagnostics;
using Microsoft.AspNetCore.Identity;
using PayMe.Domain;

namespace PayMe.Core.DataSeed
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any() && !context.CheckPayments!.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        FirstName = "Bob",
                        LastName = "Brown",
                        Email = "bob@test.com"
                    },
                    new AppUser
                    {
                        FirstName = "Tom",
                        LastName = "White",
                        Email = "tommy@test.com"
                    },
                    new AppUser
                    {
                        FirstName = "Bobby",
                        LastName = "Bones",
                        Email = "bobby@test.com"
                    },
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "QWErty123!");
                }

                var checkPayments = new List<CheckPayment>
                {
                    new CheckPayment
                    {
                        Date = DateTime.Now.AddMonths(-2),
                        Title = "Payment 1",
                        FirstName = "Peter",
                        LastName = "Petrov",
                        Address = "London, 123",
                        Country = "London",
                        Total = 1234.45,
                    },
                    new CheckPayment                      
                    {                                     
                        Date = DateTime.Now.AddMonths(-4),
                        Title = "Payment 2",              
                        FirstName = "Peter1",              
                        LastName = "Petrov1",              
                        Address = "London, 1234",          
                        Country = "London",               
                        Total = 34234.45,                  
                    },
                    new CheckPayment                      
                    {                                     
                        Date = DateTime.Now.AddMonths(-5),
                        Title = "Payment 3",              
                        FirstName = "Peter2",             
                        LastName = "Petrov2",             
                        Address = "London, 1234",         
                        Country = "London",               
                        Total = 3423443.45,                 
                    },   
                    new CheckPayment                      
                    {                                     
                        Date = DateTime.Now.AddMonths(-4),
                        Title = "Payment 4",              
                        FirstName = "Peter3",             
                        LastName = "Petrov3",             
                        Address = "London, 1234",         
                        Country = "London",               
                        Total = 456456.45,                 
                    },   
                    new CheckPayment                      
                    {                                     
                        Date = DateTime.Now.AddMonths(-4),
                        Title = "Payment 5",              
                        FirstName = "Peter4",             
                        LastName = "Petrov4",             
                        Address = "London, 123444",         
                        Country = "London",               
                        Total = 99994.45,                 
                    },    
                };

                await context.CheckPayments!.AddRangeAsync(checkPayments);
                await context.SaveChangesAsync();
            }
        }
    }
}
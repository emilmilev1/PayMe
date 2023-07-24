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
                        UserName = "Bob",
                        FirstName = "Bob",
                        LastName = "Brown",
                        Email = "bob@test.com"
                    },
                    new AppUser
                    {
                        UserName = "Tom",
                        FirstName = "Tom",
                        LastName = "White",
                        Email = "tommy@test.com"
                    },
                    new AppUser
                    {
                        UserName = "Bobby",
                        FirstName = "Bobby",
                        LastName = "Bones",
                        Email = "bobby@test.com"
                    },
                    new AppUser
                    {
                        UserName = "Ivan",
                        FirstName = "Ivan",
                        LastName = "Sprite",
                        Email = "ivan@test.com"
                    },
                    new AppUser
                    {
                        UserName = "Light",
                        FirstName = "Light",
                        LastName = "Runner",
                        Email = "light@test.com"
                    }
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "QWErty123!");
                }
                
                foreach (var user in users)
                {
                    user.EmailConfirmed = true;
                }

                var checkPayments = new List<CheckPayment>
                {
                    new CheckPayment
                    {
                        Date = DateTime.Now.AddMonths(-2).AddDays(-6).AddHours(-7),
                        Title = "Payment 1",
                        FirstName = "Peter",
                        LastName = "Petrov",
                        Address = "London, 123",
                        Country = "London",
                        Total = 1234.45,
                        ZipCode = 2343,
                        CheckAttendees = new List<CheckAttendee> { },
                    },
                    new CheckPayment
                    {
                        Date = DateTime.Now.AddMonths(-3).AddDays(-5).AddHours(-6),
                        Title = "Payment 2",
                        FirstName = "Peter1",
                        LastName = "Petrov1",
                        Address = "Essen, 1234",
                        Country = "Germany",
                        Total = 34234.45,
                        ZipCode = 2344,
                        CheckAttendees = new List<CheckAttendee> { }
                    },
                    new CheckPayment
                    {
                        Date = DateTime.Now.AddMonths(-5).AddDays(-8).AddHours(-2),
                        Title = "Payment 3",
                        FirstName = "Peter2",
                        LastName = "Petrov2",
                        Address = "USA, 1234",
                        Country = "USA",
                        Total = 3423443.45,
                        ZipCode = 2324,
                        CheckAttendees = new List<CheckAttendee> { }
                    },
                    new CheckPayment
                    {
                        Date = DateTime.Now.AddMonths(-4).AddDays(-2).AddHours(-1),
                        Title = "Payment 4",
                        FirstName = "Peter3",
                        LastName = "Petrov3",
                        Address = "London, 1234",
                        Country = "London",
                        Total = 456456.45,
                        ZipCode = 4078,
                        CheckAttendees = new List<CheckAttendee> { }
                    },
                    new CheckPayment
                    {
                        Date = DateTime.Now.AddMonths(-7).AddDays(-9).AddHours(-9),
                        Title = "Payment 5",
                        FirstName = "Peter4",
                        LastName = "Petrov4",
                        Address = "Sofia, 123444",
                        Country = "Bulgaria",
                        Total = 99994.45,
                        ZipCode = 4543,
                        CheckAttendees = new List<CheckAttendee> { }
                    },
                };

                await context.CheckPayments.AddRangeAsync(checkPayments);
                await context.SaveChangesAsync();
            }
        }
    }
}
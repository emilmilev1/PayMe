using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using PayMe.Domain.Entities;

namespace PayMe.Core.DataSeed
{
    public abstract class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any() && !context.CheckPayments.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        UserName = "Bob",
                        FirstName = "Bob",
                        LastName = "Brown",
                        Bio =
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                        Email = "bob@test.com"
                    },
                    new AppUser
                    {
                        UserName = "Tom",
                        FirstName = "Tom",
                        LastName = "White",
                        Bio =
                            "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",

                        Email = "tommy@test.com"
                    },
                    new AppUser
                    {
                        UserName = "Bobby",
                        FirstName = "Bobby",
                        LastName = "Bones",
                        Bio =
                            "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",

                        Email = "bobby@test.com"
                    },
                    new AppUser
                    {
                        UserName = "Ivan",
                        FirstName = "Ivan",
                        LastName = "Sprite",
                        Bio =
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",

                        Email = "ivan@test.com"
                    },
                    new AppUser
                    {
                        UserName = "Light",
                        FirstName = "Light",
                        LastName = "Runner",
                        Bio =
                            "Ipsum dolor sit amet, consectetur, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",

                        Email = "light@test.com"
                    },
                    new AppUser
                    {
                        UserName = "peshkata23",
                        FirstName = "Pesho",
                        LastName = "Peshev",
                        Bio =
                            "Ipsum dolor sit amet, consectetur, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                        // TODO: Add your demo email here
                        Email = "demo email"
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
                        PaymentNumber = 1,
                        Date = DateTime.Now.AddMonths(-2).AddDays(-6).AddHours(-7),
                        Title = "Payment 1",
                        FirstName = "Peter",
                        LastName = "Petrov",
                        Address = "London, 123",
                        Country = "London",
                        Total = 1234.45,
                        ZipCode = 2343,
                        CheckPaymentsUsers = new List<CheckAttendee>
                        {
                            new CheckAttendee
                            {
                                AppUser = users[0],
                            }
                        }
                    },
                    new CheckPayment
                    {
                        PaymentNumber = 1,
                        Date = DateTime.Now.AddMonths(-3).AddDays(-5).AddHours(-6),
                        Title = "Payment 2",
                        FirstName = "Peter1",
                        LastName = "Petrov1",
                        Address = "Essen, 1234",
                        Country = "Germany",
                        Total = 34234.45,
                        ZipCode = 2344,
                        CheckPaymentsUsers = new List<CheckAttendee>
                        {
                            new CheckAttendee
                            {
                                AppUser = users[1],
                            }
                        }
                    },
                    new CheckPayment
                    {
                        PaymentNumber = 1,
                        Date = DateTime.Now.AddMonths(-5).AddDays(-8).AddHours(-2),
                        Title = "Payment 3",
                        FirstName = "Peter2",
                        LastName = "Petrov2",
                        Address = "USA, 1234",
                        Country = "USA",
                        Total = 3423443.45,
                        ZipCode = 2324,
                        CheckPaymentsUsers = new List<CheckAttendee>
                        {
                            new CheckAttendee
                            {
                                AppUser = users[2],
                            }
                        }
                    },
                    new CheckPayment
                    {
                        PaymentNumber = 1,
                        Date = DateTime.Now.AddMonths(-4).AddDays(-2).AddHours(-1),
                        Title = "Payment 4",
                        FirstName = "Peter3",
                        LastName = "Petrov3",
                        Address = "London, 1234",
                        Country = "London",
                        Total = 456456.45,
                        ZipCode = 4078,
                        CheckPaymentsUsers = new List<CheckAttendee>
                        {
                            new CheckAttendee
                            {
                                AppUser = users[3],
                            }
                        }
                    },
                    new CheckPayment
                    {
                        PaymentNumber = 1,
                        Date = DateTime.Now.AddMonths(-7).AddDays(-9).AddHours(-9),
                        Title = "Payment 5",
                        FirstName = "Peter4",
                        LastName = "Petrov4",
                        Address = "Sofia, 123444",
                        Country = "Bulgaria",
                        Total = 99994.45,
                        ZipCode = 4543,
                        CheckPaymentsUsers = new List<CheckAttendee>
                        {
                            new CheckAttendee
                            {
                                AppUser = users[4],
                            }
                        }
                    },
                };

                var newCheckPayments = new List<CheckPayment>();

                for (int i = 1; i <= 85; i++)
                {
                    double updatedTotal = 100 + i;
                    int updatedZipCode = 1000 + i;

                    var newCheckPayment = new CheckPayment
                    {
                        PaymentNumber = i,
                        Date = DateTime.Now,
                        Title = $"Payment {i}",
                        FirstName = "John",
                        LastName = "Doe",
                        Address = $"New York, 5678{i}",
                        Country = "USA",
                        Total = updatedTotal,
                        ZipCode = updatedZipCode,
                        CheckPaymentsUsers = new List<CheckAttendee>
                        {
                            new CheckAttendee
                            {
                                AppUser = users[5],
                            }
                        }
                    };

                    newCheckPayments.Add(newCheckPayment);
                }

                await context.CheckPayments.AddRangeAsync(newCheckPayments);

                await context.CheckPayments.AddRangeAsync(checkPayments);
                await context.SaveChangesAsync();
            }
        }
    }
}
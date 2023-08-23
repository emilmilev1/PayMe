using Microsoft.AspNetCore.Identity;
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
                        Age = 25,
                        Bio =
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                        Email = "bob@test.com",
                        RoleName = "Student"
                    },
                    new AppUser
                    {
                        UserName = "Tom",
                        FirstName = "Tom",
                        LastName = "White",
                        Age = 26,
                        Bio =
                            "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",

                        Email = "tommy@test.com",
                        RoleName = "Adult"
                    },
                    new AppUser
                    {
                        UserName = "Bobby",
                        FirstName = "Bobby",
                        LastName = "Bones",
                        Age = 27,
                        Bio =
                            "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",

                        Email = "bobby@test.com",
                        RoleName = "Child"
                    },
                    new AppUser
                    {
                        UserName = "Ivan",
                        FirstName = "Ivan",
                        LastName = "Sprite",
                        Age = 28,
                        Bio =
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",

                        Email = "ivan@test.com",
                        RoleName = "Child"
                    },
                    new AppUser
                    {
                        UserName = "Light",
                        FirstName = "Light",
                        LastName = "Runner",
                        Age = 29,
                        Bio =
                            "Ipsum dolor sit amet, consectetur, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",

                        Email = "light@test.com",
                        RoleName = "Student"
                    },
                    new AppUser
                    {
                        UserName = "peshkata23",
                        FirstName = "Pesho",
                        LastName = "Peshev",
                        Age = 30,
                        Bio =
                            "Ipsum dolor sit amet, consectetur, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                        Email = "emo.2012012@gmail.com",
                        RoleName = "Adult"
                    }
                    // TODO: Add your demo email here
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

        public static async Task SeedAdminUser(UserManager<AppUser> userManager)
        {
            var adminUser = new AppUser
            {
                UserName = "admin23",
                Email = "admin@example.com",
                FirstName = "Admin",
                LastName = "User",
                Bio = "",
                Age = 99,
                RoleName = "Admin"
            };

            var existingAdmin = await userManager.FindByNameAsync(adminUser.UserName);

            if (existingAdmin == null)
            {
                await userManager.CreateAsync(adminUser, "AdminPassword123");
                await userManager.AddToRoleAsync(adminUser, adminUser.RoleName);
            }
        }

        public static async Task SeedAdministratorsUsers(UserManager<AppUser> userManager)
        {
            var adminUsers = new List<AppUser>
            {
                new AppUser
                {
                    UserName = "child",
                    Email = "admin_child@example.com",
                    FirstName = "Admin",
                    LastName = "Child",
                    Bio = "",
                    Age = 99,
                    RoleName = "Child"
                },
                new AppUser
                {
                    UserName = "adult",
                    Email = "admin_adult@example.com",
                    FirstName = "Admin",
                    LastName = "Adult",
                    Bio = "",
                    Age = 99,
                    RoleName = "Adult"
                },
                new AppUser
                {
                    UserName = "student",
                    Email = "admin_student@example.com",
                    FirstName = "Admin",
                    LastName = "Student",
                    Bio = "",
                    Age = 99,
                    RoleName = "Student"
                }
            };

            foreach (var adminUser in adminUsers)
            {
                var existingAdmin = await userManager.FindByNameAsync(adminUser.UserName);

                if (existingAdmin == null)
                {
                    await userManager.CreateAsync(adminUser, "AdministratorsPassword123");
                    await userManager.AddToRoleAsync(adminUser, adminUser.RoleName);
                }
            }
        }

        public static async Task SeedAdminData(RoleManager<IdentityRole> roleManager)
        {
            var roleNames = new[] { "Admin", "Child", "Adult", "Student" };
            foreach (var roleName in roleNames)
            {
                var roleExists = await roleManager.RoleExistsAsync(roleName);
                if (!roleExists)
                {
                    await roleManager.CreateAsync(new IdentityRole(roleName));
                }
            }
        }
    }
}
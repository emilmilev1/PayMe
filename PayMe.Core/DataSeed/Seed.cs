using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using PayMe.Domain.Entities;

namespace PayMe.Core.DataSeed
{
    public abstract class Seed
    {
        public static async Task SeedData(
            DataContext context,
            RoleManager<IdentityRole> roleManager,
            UserManager<AppUser> userManager)
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
                        RoleName = "Student",
                        EmailConfirmed = true
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
                        RoleName = "Adult",
                        EmailConfirmed = true
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
                        RoleName = "Child",
                        EmailConfirmed = true
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
                        RoleName = "Child",
                        EmailConfirmed = true
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
                        RoleName = "Student",
                        EmailConfirmed = true
                    },
                    new AppUser
                    {
                        UserName = "peshkata239",
                        FirstName = "Pesho",
                        LastName = "Peshev",
                        Age = 30,
                        Bio =
                            "Ipsum dolor sit amet, consectetur, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                        Email = "peshoTest9999888@test.com",
                        RoleName = "Adult",
                        EmailConfirmed = true
                    },
                    new AppUser
                    {
                        UserName = "vankata239",
                        FirstName = "Vanko",
                        LastName = "Vanchev",
                        Age = 7,
                        Bio =
                            "Ipsum dolor sit amet, consectetur, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                        Email = "peshoTest9999888@test.com",
                        RoleName = "Child",
                        EmailConfirmed = true
                    }
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "QWErty123!");
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
                        FirstName = "Peter5",
                        LastName = "Petrov5",
                        Address = "Sofia, 55",
                        Country = "Bulgaria",
                        Total = 55655.45,
                        ZipCode = 5543,
                        CheckPaymentsUsers = new List<CheckAttendee>
                        {
                            new CheckAttendee
                            {
                                AppUser = users[4],
                            }
                        }
                    },
                    new CheckPayment
                    {
                        PaymentNumber = 1,
                        Date = DateTime.Now.AddMonths(-7).AddDays(-9).AddHours(-9),
                        Title = "Payment 6",
                        FirstName = "Peter6",
                        LastName = "Petrov6",
                        Address = "Sofia, 1234446",
                        Country = "Bulgaria",
                        Total = 6666.45,
                        ZipCode = 66667,
                        CheckPaymentsUsers = new List<CheckAttendee>
                        {
                            new CheckAttendee
                            {
                                AppUser = users[5],
                            }
                        }
                    },
                };

                await context.CheckPayments.AddRangeAsync(checkPayments);

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
                                AppUser = users[6],
                            }
                        }
                    };

                    newCheckPayments.Add(newCheckPayment);
                }

                await context.CheckPayments.AddRangeAsync(newCheckPayments);

                // Seed the roles
                await SeedRoles(roleManager);

                // Seed the main admin user
                await SeedAdminUser(userManager);

                // Seed the administrators for each role
                await SeedAdministratorsUsers(userManager);

                await context.SaveChangesAsync();
            }
        }

        private static async Task SeedRoles(RoleManager<IdentityRole> roleManager)
        {
            String[] roleNames = new[] { "Admin", "Child", "Adult", "Student" };
            IdentityResult roleResult;

            foreach (var roleName in roleNames)
            {
                var roleExists = await roleManager.RoleExistsAsync(roleName);
                if (!roleExists)
                {
                    roleResult = await roleManager.CreateAsync(new IdentityRole(roleName));
                    
                    if (roleResult.Succeeded)
                    {
                        var newlyCreatedRole = await roleManager.FindByNameAsync(roleName);
                        await roleManager.AddClaimAsync(newlyCreatedRole, new Claim(ClaimTypes.Role, roleName));
                    }
                }
            }
        }

        private static async Task SeedAdminUser(UserManager<AppUser> userManager)
        {
            var adminUser = await userManager.FindByEmailAsync("admin@example.com");

            if (adminUser == null)
            {
                var newAdmin = new AppUser
                {
                    UserName = "admin23",
                    Email = "admin@example.com",
                    FirstName = "Admin",
                    LastName = "User",
                    Bio = "",
                    Age = 99,
                    RoleName = "Admin",
                    EmailConfirmed = true,
                };

                var createAdminResult = await userManager.CreateAsync(newAdmin, "YourAdminPassword123!");

                if (createAdminResult.Succeeded)
                {
                    await userManager.AddToRoleAsync(newAdmin, "Admin");
                }
            }
        }

        private static async Task SeedAdministratorsUsers(UserManager<AppUser> userManager)
        {
            var roleAdministrators = new List<AppUser>
            {
                new AppUser
                {
                    UserName = "Child_Admin_1",
                    Email = "child_admin@example.com",
                    FirstName = "Child_Admin_2",
                    LastName = "Child_Admin_3",
                    Bio = "",
                    Age = 5,
                    RoleName = "Child",
                    EmailConfirmed = true
                },
                new AppUser
                {
                    UserName = "Student_Admin_1",
                    Email = "student_admin@example.com",
                    FirstName = "Student_Admin_2",
                    LastName = "Student_Admin_3",
                    Bio = "",
                    Age = 24,
                    RoleName = "Student",
                    EmailConfirmed = true
                },
                new AppUser
                {
                    UserName = "Adult_Admin_1",
                    Email = "adult_admin@example.com",
                    FirstName = "Adult_Admin_2",
                    LastName = "Adult_Admin_3",
                    Bio = "",
                    Age = 56,
                    RoleName = "Adult",
                    EmailConfirmed = true
                }
            };

            foreach (var roleAdministrator in roleAdministrators)
            {
                var existingAdministrator = await userManager.FindByEmailAsync(roleAdministrator.Email);

                if (existingAdministrator == null)
                {
                    var createUserResult = await userManager.CreateAsync(roleAdministrator, "AdministratorPass123!");

                    if (createUserResult.Succeeded)
                    {
                        await userManager.AddToRoleAsync(roleAdministrator, roleAdministrator.RoleName);
                    }
                }
            }
        }
    }
}
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using PayMe.Application.Core;
using PayMe.Application.Interfaces;
using PayMe.Application.Profiles;
using PayMe.Application.Services;
using PayMe.Core;
using PayMe.Infrastructure.Email;
using PayMe.Infrastructure.Photos;
using PayMe.Infrastructure.Security;

namespace PayMe.API.AppExtensions
{
    public static class ApplicationServiceExtension
    {
        public static IServiceCollection AddApplicationServices(
            this IServiceCollection services,
            IConfiguration config)
        {
            services.AddDbContext<DataContext>(options =>
            {
                options.UseSqlServer(config.GetConnectionString("DefaultConnection")!);
            });

            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy", policy =>
                {
                    policy
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials()
                        .WithExposedHeaders("www-authenticate", "pagination")
                        .WithOrigins("http://localhost:3000");
                });
            });

            services.AddMediatR(typeof(ListUserData.Handler).Assembly);
            services.AddMediatR(typeof(DetailsProfileUser.Handler).Assembly);
            services.AddAutoMapper(typeof(MappedProfiles).Assembly);
            services.AddScoped<IUserAccessor, UserAccessor>();
            services.AddScoped<IPhotoAccessor, PhotoAccessor>();
            services.AddScoped<EmailSender>();
            services.Configure<CloudinaryData>(config.GetSection("Cloudinary"));
            services.AddIdentity<IdentityUser, IdentityRole>()
                .AddEntityFrameworkStores<DataContext>()
                .AddDefaultTokenProviders();

            return services;
        }
    }
}
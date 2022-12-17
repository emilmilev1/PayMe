﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CloudinaryDotNet;
using Microsoft.EntityFrameworkCore;
using PayMe.Application.Core;
using PayMe.Application.Interfaces;
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

            services.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy", policy =>
                {
                    policy
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials()
                        .WithExposedHeaders("WWW-Authenticate")
                        .WithOrigins("http://localhost:3000");
                });
            });

            services.AddAutoMapper(typeof(MappedProfiles).Assembly);
            services.AddScoped<IUserAccessor, UserAccessor>();
            services.AddScoped<IPhotoAccessor, PhotoAccessor>();
            services.AddScoped<EmailSender>();
            services.Configure<CloudinaryData>(config.GetSection("Cloudinary"));

            return services;
        }
    }
}
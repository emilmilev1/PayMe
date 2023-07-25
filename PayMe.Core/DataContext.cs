using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PayMe.Domain;

namespace PayMe.Core
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<CheckPayment> CheckPayments { get; set; }

        public DbSet<CheckAttendee> CheckPaymentsUsers { get; set; }

        public DbSet<Photo> Photos { get; set; }

        public DbSet<AdminComment> AdminComments { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<CheckAttendee>(x =>
                x.HasKey(a => new { a.AppUserId, a.CheckPaymentId }));

            builder.Entity<CheckAttendee>()
                .HasOne(x => x.AppUser)
                .WithMany(b => b.CheckPaymentsUsers)
                .HasForeignKey(c => c.AppUserId);
            
            builder.Entity<CheckAttendee>()
                .HasOne(a => a.CheckPayment)
                .WithMany(b => b.CheckPaymentsUsers)
                .HasForeignKey(c => c.CheckPaymentId);

            builder.Entity<AdminComment>()
                .HasOne(a => a.CheckPayment)
                .WithMany(b => b.AdminComments)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
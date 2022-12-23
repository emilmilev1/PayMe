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

        public DbSet<CheckAttendee> CheckAttendees { get; set; }

        public DbSet<Photo> Photos { get; set; } = null!;

        public DbSet<AdminComment> AdminComments { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<CheckAttendee>(x =>
                x.HasKey(a => new { a.AppUserId, a.CheckPaymentId }));

            builder.Entity<CheckAttendee>()
                .HasOne(x => x.AppUser)
                .WithMany(b => b.CheckAttendees)
                .HasForeignKey(c => c.AppUserId);

            builder.Entity<CheckAttendee>()
                .HasOne(a => a.CheckPayment)
                .WithMany(b => b.CheckAttendees)
                .HasForeignKey(c => c.CheckPaymentId);

            builder.Entity<AdminComment>()
                .HasOne(a => a.CheckPayment)
                .WithMany(b => b.AdminComments)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
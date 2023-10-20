using System;

namespace PayMe.Domain.Entities
{
    /// <summary>
    /// Entity RefreshToken
    /// </summary>
    public class RefreshToken
    {
        public int Id { get; set; }
        public AppUser AppUser { get; set; } = null!;
        public string Token { get; set; } = null!;
        private DateTime Expires { get; set; } = DateTime.UtcNow.AddDays(7);
        private bool IsExpired => DateTime.UtcNow >= Expires;
        public DateTime? Revoked { get; set; }

        public bool IsActive => Revoked == null &&
                                !IsExpired &&
                                DateTime.UtcNow <= Expires;
    }
}
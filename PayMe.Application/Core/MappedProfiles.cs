using PayMe.Application.CheckPayments;
using PayMe.Application.Profiles;
using PayMe.Domain.Entities;

namespace PayMe.Application.Core
{
    public class MappedProfiles : AutoMapper.Profile
    {
        public MappedProfiles()
        {
            CreateMap<CheckPayment, CheckPayment>();

            CreateMap<CheckPayment, CheckPaymentDto>()
                .ForMember(x => x.CheckAttendees, o =>
                    o.MapFrom(y => y.CheckPaymentsUsers));

            CreateMap<CheckAttendee, CheckAttendeeDto>()
                .ForMember(d => d.RoleName, o => 
                    o.MapFrom(s => s.AppUser!.RoleName))
                .ForMember(d => d.Username, o =>
                    o.MapFrom(s => s.AppUser!.UserName))
                .ForMember(x => x.FirstName, o =>
                    o.MapFrom(y => y.AppUser!.FirstName))
                .ForMember(x => x.LastName, o =>
                    o.MapFrom(y => y.AppUser!.LastName))
                .ForMember(d => d.Age, o =>
                    o.MapFrom(s => s.AppUser!.Age))
                .ForMember(d => d.Bio, o =>
                    o.MapFrom(s => s.AppUser!.Bio))
                .ForMember(x => x.Image, o =>
                    o.MapFrom(y => y.AppUser!.Photos.FirstOrDefault(x => x.IsMain)!.Url));

            CreateMap<CheckAttendee, CheckPaymentDto>()
                .ForMember(x => x.Id, o =>
                    o.MapFrom(y => y.CheckPayment!.Id))
                .ForMember(x => x.PaymentNumber, o =>
                    o.MapFrom(y => y.CheckPayment!.PaymentNumber))
                .ForMember(x => x.Date, o =>
                    o.MapFrom(y => y.CheckPayment!.Date))
                .ForMember(x => x.Title, o =>
                    o.MapFrom(y => y.CheckPayment!.Title))
                .ForMember(x => x.FirstName, o =>
                    o.MapFrom(y => y.CheckPayment!.FirstName))
                .ForMember(x => x.LastName, o =>
                    o.MapFrom(y => y.CheckPayment!.LastName))
                .ForMember(x => x.Address, o =>
                    o.MapFrom(y => y.CheckPayment!.Address))
                .ForMember(x => x.Country, o =>
                    o.MapFrom(y => y.CheckPayment!.Country))
                .ForMember(x => x.ZipCode, o =>
                    o.MapFrom(y => y.CheckPayment!.ZipCode))
                .ForMember(x => x.Total, o =>
                    o.MapFrom(y => y.CheckPayment!.Total))
                .ForMember(x => x.CheckAttendees, o =>
                    o.MapFrom(p => p.CheckPayment!.CheckPaymentsUsers));

            CreateMap<AppUser, Profile>()
                .ForMember(d => d.RoleName, o => 
                    o.MapFrom(s => s.RoleName))
                .ForMember(x => x.Email, o =>
                    o.MapFrom(y => y.Email))
                .ForMember(x => x.Username, o =>
                    o.MapFrom(y => y.UserName))
                .ForMember(x => x.FirstName, o =>
                    o.MapFrom(y => y.FirstName))
                .ForMember(x => x.LastName, o =>
                    o.MapFrom(y => y.LastName))
                .ForMember(x => x.Bio, o =>
                    o.MapFrom(y => y.Bio))
                .ForMember(x => x.Age, o =>
                    o.MapFrom(y => y.Age))
                .ForMember(x => x.Image, o =>
                    o.MapFrom(y => y.Photos.FirstOrDefault(x => x.IsMain)!.Url))
                .ForMember(dest => dest.Photos, o =>
                    o.MapFrom(src => src.Photos));
        }
    }
}
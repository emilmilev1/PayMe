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
                .ForMember(d => d.Username, o =>
                    o.MapFrom(s => s.AppUser!.UserName))
                .ForMember(x => x.FirstName, o =>
                    o.MapFrom(y => y.AppUser!.FirstName))
                .ForMember(x => x.LastName, o =>
                    o.MapFrom(y => y.AppUser!.LastName))
                .ForMember(x => x.Image, o =>
                    o.MapFrom(y => y.AppUser!.Photos.FirstOrDefault(x => x.IsMain)!.Url));

            CreateMap<CheckAttendee, CheckPaymentDto>()
                .ForMember(x => x.Id, o =>
                    o.MapFrom(y => y.CheckPayment!.Id))
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
                .ForMember(x => x.Username, o =>
                    o.MapFrom(y => y.UserName))
                .ForMember(x => x.LastName, o =>
                    o.MapFrom(y => y.FirstName))
                .ForMember(x => x.FirstName, o =>
                    o.MapFrom(y => y.LastName))
                .ForMember(x => x.Image, o =>
                    o.MapFrom(y => y.Photos.FirstOrDefault(x => x.IsMain)!.Url));
        }
    }
}
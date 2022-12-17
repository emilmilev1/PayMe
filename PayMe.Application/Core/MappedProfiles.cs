using PayMe.Application.CheckPayments;
using PayMe.Application.Profiles;
using PayMe.Domain;

namespace PayMe.Application.Core
{
    public class MappedProfiles : AutoMapper.Profile
    {
        public MappedProfiles()
        {
            CreateMap<CheckPayment, CheckPayment>();

            CreateMap<CheckAttendee, CheckAttendeeDto>()
                .ForMember(x => x.FirstName, o =>
                    o.MapFrom(y => y.AppUser.FirstName))
                .ForMember(x => x.LastName, o =>
                    o.MapFrom(y => y.AppUser.LastName))
                .ForMember(x => x.Image, o =>
                    o.MapFrom(y => y.AppUser.Photos.FirstOrDefault(x => x.IsMain)!.Url));

            CreateMap<AppUser, Profile>()
                .ForMember(x => x.FirstName, o =>
                    o.MapFrom(y => y.FirstName))
                .ForMember(x => x.LastName, o =>
                    o.MapFrom(y => y.LastName))
                .ForMember(x => x.Image, o =>
                    o.MapFrom(y => y.Photos.FirstOrDefault(x => x.IsMain)!.Url));
        }
    }
}
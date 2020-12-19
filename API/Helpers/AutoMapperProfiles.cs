using System.Linq;
using API.DTOs;
using API.Entities;
using API.Extensions;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<AppUser, MemberDto>()
            //dest is destination property, opt is where we wanna map from and we're getting the first photo that is main and its url 
                .ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(src =>
                    src.Photos.FirstOrDefault(x => x.IsMain).Url))
                    .ForMember(dest => dest.Age, opt => opt.MapFrom(src => src.DateOfBirth.CalculateAge()));
            CreateMap<Photo, PhotoDto>();
            //there is a reverse map but we don;t need it here, just a note that it exists
            CreateMap<MemberUpdateDto, AppUser>();
            CreateMap<RegisterDto, AppUser>();
            CreateMap<ProjectDto, AppProject>();
            CreateMap<AppProject, ProjectDto>();
            CreateMap<MemberDto, AppUser>();
                // .ForMember(dest => dest.User, opt => opt.MapFrom(src =>
                // src.User.FirstOrDefault(x => )))

        }
    }
}
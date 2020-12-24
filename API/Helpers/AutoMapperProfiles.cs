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

                .ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(src =>
                    src.Photos.FirstOrDefault(x => x.IsMain).Url))
                    .ForMember(dest => dest.Age, opt => opt.MapFrom(src => src.DateOfBirth.CalculateAge()));
            CreateMap<Photo, PhotoDto>();
            CreateMap<PhotoDto[], Photo>();

            CreateMap<MemberUpdateDto, AppUser>();
            CreateMap<RegisterDto, AppUser>();
            CreateMap<ProjectDto, AppProject>();
            CreateMap<AppProject, ProjectDto>();
            CreateMap<MemberDto, AppUser>();

            CreateMap<TaskDto, AppTask>();
            CreateMap<AppTask, TaskDto>();
            CreateMap<AppTask, TaskUpdateDto>();
            CreateMap<TaskUpdateDto, AppTask>();
            CreateMap<ProjectUpdateDto, AppProject>();

        }
    }
}
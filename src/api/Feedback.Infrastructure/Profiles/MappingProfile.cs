using AutoMapper;
using Feedback.Application.Contracts.DTOs;
using Feedback.Application.Contracts.DTOs.Feedback.Application.DTOs;
using Feedback.Core.Entities;

namespace Feedback.Infrastructure.Profiles;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<User, UserDto>()
            .ForMember(dest => dest.Teams, opt => opt.MapFrom(src => src.Teams));
        CreateMap<Team, TeamDto>().ReverseMap();
        CreateMap<Project, ProjectDto>().ReverseMap();
        CreateMap<Company, CompanyDto>().ReverseMap();
    }
}
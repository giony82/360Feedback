using AutoMapper;
using Feedback.Application.Contracts.DTOs;
using Feedback.Application.Contracts.DTOs.Feedback.Application.DTOs;
using Feedback.Core.Entities;

namespace Feedback.Infrastructure.Profiles;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<User, UserDto>().ReverseMap();
        CreateMap<Team, TeamDto>().ReverseMap();
        CreateMap<Project, ProjectDto>().ReverseMap();
        CreateMap<Company, CompanyDto>().ReverseMap();

        CreateMap<Company, IdName>().ReverseMap();
        CreateMap<Project, IdName>().ReverseMap();

        CreateMap<SubscriptionPlan, SubscriptionPlanDto>().ReverseMap();
    }
}
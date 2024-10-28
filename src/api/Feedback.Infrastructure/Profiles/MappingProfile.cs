using AutoMapper;
using Feedback.Application.DTOs;

namespace Feedback.Infrastructure.Profiles;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<User, UserDto>();
    }
}
using AutoMapper;
using Feedback.Application.Interfaces;
using Feedback.Core.Entities;
using Feedback.Core.Interfaces;
using Feedback.Application.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

internal class UserService(IUserRepository userRepository, IMapper mapper) : IUserService
{
    public async Task<IEnumerable<UserDto>> GetAllUsers()
    {
        var users = await userRepository.GetAllUsers();
        return mapper.Map<IEnumerable<UserDto>>(users);
    }

    public async Task<UserDto> GetUserById(int id)
    {
        var user = await userRepository.GetUserById(id);
        return mapper.Map<UserDto>(user);
    }
}
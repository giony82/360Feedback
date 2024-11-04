using AutoMapper;
using Feedback.Application.Contracts.DTOs;
using Feedback.Application.Contracts.Interfaces;
using Feedback.Core.Interfaces;

namespace Feedback.Application.Services;

internal class UserService(IUserRepository userRepository, IWebUser webUser, IMapper mapper) : IUserService
{
    public async Task<IEnumerable<UserDto>> GetAllUsersAsync()
    {
        var users = await userRepository.GetAllUsers();
        return mapper.Map<IEnumerable<UserDto>>(users);
    }

    public async Task<UserDto?> GetUserByIdAsync(int id)
    {
        if (id == 0)
        {
            id = webUser.UserId;
        }
        User? user = await userRepository.GetUserById(id);
        return mapper.Map<UserDto>(user);
    }
}
using Feedback.Application.Contracts.DTOs;

namespace Feedback.Application.Contracts.Interfaces;

public interface IUserService
{
    Task<IEnumerable<UserDto>> GetAllUsersAsync();
    Task<UserDto> GetUserByIdAsync(int id);
}
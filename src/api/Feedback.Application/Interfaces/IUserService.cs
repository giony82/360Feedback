using Feedback.Application.DTOs;

namespace Feedback.Application.Interfaces;

public interface IUserService
{
    Task<IEnumerable<UserDto>> GetAllUsers();
    Task<UserDto> GetUserById(int id);
}
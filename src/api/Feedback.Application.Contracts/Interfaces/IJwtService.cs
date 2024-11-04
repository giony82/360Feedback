using Feedback.Application.Contracts.DTOs;

namespace Feedback.Application.Contracts.Interfaces;

public interface IJwtService
{
    string GenerateToken(UserDto user);
}
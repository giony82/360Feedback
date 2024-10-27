namespace Feedback.Core.Interfaces;

// src/GoogleAuthAPI.Core/Interfaces/IJwtService.cs
public interface IJwtService
{
    string GenerateToken(User user);
}
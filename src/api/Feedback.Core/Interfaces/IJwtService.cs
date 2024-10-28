namespace Feedback.Core.Interfaces;

public interface IJwtService
{
    string GenerateToken(User user);
}
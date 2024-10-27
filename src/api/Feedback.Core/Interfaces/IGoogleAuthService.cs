using Feedback.WebAPI.Models;

public interface IGoogleAuthService
{
    Task<User> AuthenticateAsync(string credential);
}
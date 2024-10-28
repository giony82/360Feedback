namespace Feedback.Core.Interfaces;

public interface IGoogleAuthService
{
    Task<GoogleAuthPayload> AuthenticateAsync(string credential);
}
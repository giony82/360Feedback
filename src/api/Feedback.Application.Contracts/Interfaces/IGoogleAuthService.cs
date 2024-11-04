using Feedback.Application.Contracts.DTOs.Authentication;

namespace Feedback.Application.Contracts.Interfaces;

public interface IGoogleAuthService
{
    Task<GoogleAuthPayload> AuthenticateAsync(string credential);
}
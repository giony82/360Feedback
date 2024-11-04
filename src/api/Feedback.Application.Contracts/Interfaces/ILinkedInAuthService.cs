using Feedback.Application.Contracts.DTOs.Authentication;

namespace Feedback.Application.Contracts.Interfaces;

public interface ILinkedInAuthService
{
    Task<LinkedInAuthPayloadDto> AuthenticateAsync(string code);
}
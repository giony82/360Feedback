using Feedback.Core.Interfaces;

namespace Feedback.Application.Interfaces;

public interface ILinkedInAuthService
{
    Task<LinkedInAuthPayload> AuthenticateAsync(string code);
}
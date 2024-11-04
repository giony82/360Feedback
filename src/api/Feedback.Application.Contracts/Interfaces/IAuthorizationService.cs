using Feedback.Application.Contracts.DTOs.Authentication;

namespace Feedback.Application.Contracts.Interfaces
{
    public interface IAuthorizationService
    {
        Task<AuthResponseDTO> AuthenticateGoogleUserAsync(string token);
        Task<AuthResponseDTO> AuthenticateLinkedInUserAsync(string code);
    }
}
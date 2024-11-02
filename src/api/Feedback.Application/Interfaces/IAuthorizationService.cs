using System.Threading.Tasks;
using Feedback.Application.DTOs;

namespace Feedback.Application.Interfaces
{
    public interface IAuthorizationService
    {
        Task<AuthResponseDTO> AuthenticateGoogleUserAsync(string token);
        Task<AuthResponseDTO> AuthenticateLinkedInUserAsync(string code);
    }
}
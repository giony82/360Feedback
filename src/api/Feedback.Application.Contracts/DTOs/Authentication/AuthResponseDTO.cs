namespace Feedback.Application.Contracts.DTOs.Authentication
{
    public class AuthResponseDTO
    {
        public string Token { get; set; }
        public UserDto User { get; set; }
    }
}

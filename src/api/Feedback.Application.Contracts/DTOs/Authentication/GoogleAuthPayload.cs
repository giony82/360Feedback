namespace Feedback.Application.Contracts.DTOs.Authentication;

public class GoogleAuthPayload
{
    public string Email { get; set; }
    public string Name { get; set; }
    public string Picture { get; set; }
}
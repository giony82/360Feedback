using System.Text.Json.Serialization;

namespace Feedback.WebAPI.Models;

public class GoogleLoginRequest
{
    [JsonPropertyName("token")]
    public string Token
    {
        get; set;
    }
}
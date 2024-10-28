using System.Text.Json.Serialization;

namespace Feedback.Core.Models;

public class GoogleLoginRequest
{
    [JsonPropertyName("token")]
    public string Token
    {
        get; set;
    }
}
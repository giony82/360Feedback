using System.Text.Json.Serialization;


public class GoogleLoginRequest
{
    [JsonPropertyName("token")]
    public string Token
    {
        get; set;
    }
}
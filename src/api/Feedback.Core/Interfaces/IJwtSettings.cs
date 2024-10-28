namespace Feedback.Core.Interfaces;

public interface IJwtSettings
{
    string Key { get; }
    string Issuer { get; }
    string Audience { get; }
    int ExpiryMinutes { get; }
}
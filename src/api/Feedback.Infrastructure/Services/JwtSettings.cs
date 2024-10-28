using Feedback.Core.Interfaces;
using Microsoft.Extensions.Configuration;

namespace Feedback.Infrastructure.Services;

public class JwtSettings(IConfiguration configuration) : IJwtSettings
{
    public string Key => configuration["Jwt:Key"] ?? throw new InvalidOperationException();
    public string Issuer => configuration["Jwt:Issuer"] ?? throw new InvalidOperationException();
    public string Audience => configuration["Jwt:Audience"] ?? throw new InvalidOperationException();
    public int ExpiryMinutes => int.Parse(configuration["Jwt:ExpiryMinutes"] ?? "60");
}
using Feedback.Application.Contracts.DTOs.Authentication;
using Feedback.Application.Contracts.Interfaces;
using Feedback.Core.Interfaces;
using Google.Apis.Auth;
using Microsoft.Extensions.Configuration;

namespace Feedback.Infrastructure.Services;

public class GoogleAuthService(IConfiguration configuration)
    : IGoogleAuthService
{
    private readonly string _clientId = configuration["GoogleAuth:ClientId"] ?? throw new InvalidOperationException();

    public async Task<GoogleAuthPayload> AuthenticateAsync(string credential)
    {
        try
        {
            var settings = new GoogleJsonWebSignature.ValidationSettings
            {
                Audience = [_clientId]
            };

            GoogleJsonWebSignature.Payload? payload = await GoogleJsonWebSignature.ValidateAsync(credential, settings);

            return new GoogleAuthPayload { Email = payload.Email, Name = payload.Name };
        }
        catch (InvalidJwtException)
        {
            throw new UnauthorizedAccessException("Invalid Google token");
        }
    }
}
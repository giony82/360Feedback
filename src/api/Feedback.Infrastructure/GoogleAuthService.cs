using Google.Apis.Auth;

namespace Feedback.Infrastructure;

public class GoogleAuthService(IUserRepository userRepository) : IGoogleAuthService
{
    public async Task<User> AuthenticateAsync(string credential)
    {
        try
        {
            var settings = new GoogleJsonWebSignature.ValidationSettings
            {
                Audience = new[] { "267290604478-isbfioq88reo776r3o9abcv5ec9kcqjo.apps.googleusercontent.com" } // Replace with your actual Google Client ID
            };

            var payload = await GoogleJsonWebSignature.ValidateAsync(credential, settings);

            // If validation passes, get or create the user
            return await userRepository.GetOrCreateUserAsync(payload.Email, payload.Name, payload.Picture);
        }
        catch (InvalidJwtException)
        {
            throw new UnauthorizedAccessException("Invalid Google token");
        }
    }
}
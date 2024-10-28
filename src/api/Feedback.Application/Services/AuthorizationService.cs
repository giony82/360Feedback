using AutoMapper;
using Feedback.Application.DTOs;
using Feedback.Application.Interfaces;
using Feedback.Core.Interfaces;

namespace Feedback.Application.Services;

public class AuthorizationService(
    IGoogleAuthService googleAuthService,
    IUserRepository userRepository,
    IJwtService jwtService,
    IMapper mapper)
    : IAuthorizationService
{
    public async Task<AuthResponseDTO> AuthenticateGoogleUserAsync(string token)
    {
        GoogleAuthPayload googleUser = await googleAuthService.AuthenticateAsync(token);

        User user = await userRepository.GetOrCreateUserAsync(googleUser.Email, googleUser.Name, googleUser.Picture);

        var userDto = mapper.Map<UserDto>(user);

        string appToken = jwtService.GenerateToken(user);

        return new AuthResponseDTO()
        {
            Token = appToken,
            User = userDto
        };
    }
}
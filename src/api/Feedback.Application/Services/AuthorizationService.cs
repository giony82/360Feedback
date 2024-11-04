using AutoMapper;
using Feedback.Application.Contracts.DTOs;
using Feedback.Application.Contracts.DTOs.Authentication;
using Feedback.Application.Contracts.Interfaces;
using Feedback.Core.Interfaces;

namespace Feedback.Application.Services;

internal class AuthorizationService(
    IGoogleAuthService googleAuthService,
    IUserRepository userRepository,
    IJwtService jwtService,
    IMapper mapper,
    ILinkedInAuthService linkedInAuthService)
    : IAuthorizationService
{
    public async Task<AuthResponseDTO> AuthenticateGoogleUserAsync(string token)
    {
        GoogleAuthPayload googleUser = await googleAuthService.AuthenticateAsync(token);

        User user = await userRepository.GetOrCreateUserAsync(googleUser.Email, googleUser.Name, googleUser.Picture);

        var userDto = mapper.Map<UserDto>(user);

        var appToken = jwtService.GenerateToken(userDto);

        return new AuthResponseDTO
        {
            Token = appToken,
            User = userDto
        };
    }

    public async Task<AuthResponseDTO> AuthenticateLinkedInUserAsync(string code)
    {
        LinkedInAuthPayloadDto linkedInUser = await linkedInAuthService.AuthenticateAsync(code);

        User user = await userRepository.GetOrCreateUserAsync(linkedInUser.Email, linkedInUser.Name,
            linkedInUser.Picture);

        var userDto = mapper.Map<UserDto>(user);

        var appToken = jwtService.GenerateToken(userDto);

        return new AuthResponseDTO
        {
            Token = appToken,
            User = userDto
        };
    }
}
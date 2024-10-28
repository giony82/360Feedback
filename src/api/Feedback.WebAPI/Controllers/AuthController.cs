using AutoMapper;
using Feedback.Application.DTOs;
using Feedback.Application.Interfaces;
using Feedback.Core.Models;
using Microsoft.AspNetCore.Mvc;

namespace Feedback.WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController(IAuthorizationService authorizationService)
        : ControllerBase
    {
        [HttpPost("google")]
        public async Task<IActionResult> GoogleLogin([FromBody] GoogleLoginRequest request)
        {
            try
            {
                AuthResponseDTO responseDto = await authorizationService.AuthenticateGoogleUserAsync(request.Token);

                return Ok(responseDto);

            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(ex.Message);
            }
        }
    }
}
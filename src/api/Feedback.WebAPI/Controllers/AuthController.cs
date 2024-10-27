using Feedback.Core.Interfaces;
using Feedback.WebAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace Feedback.WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IGoogleAuthService _googleAuthService;
        private readonly IJwtService _jwtService;

        public AuthController(IGoogleAuthService googleAuthService, IJwtService jwtService)
        {
            _googleAuthService = googleAuthService;
            _jwtService = jwtService;
        }

        [HttpPost("google")]
        public async Task<IActionResult> GoogleLogin([FromBody] GoogleLoginRequest request)
        {
            try
            {
                var user = await _googleAuthService.AuthenticateAsync(request.Credential);
                var token = _jwtService.GenerateToken(user);
                return Ok(new
                {
                    Token = token,
                    User = user
                });
            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
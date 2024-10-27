using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Feedback.WebAPI.Controllers
{
    [Route("api/[controller]")]
    public class ProfileController: ControllerBase
    {
        [Authorize]
        [HttpGet]
        public IActionResult GetProfile()
        {
            // Access the authenticated user's claims
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userId == null)
            {
                return NotFound("User not found");
            }

            // Fetch and return user profile
            // Example: return Ok(userProfile);
            return Ok(new
            {
                UserId = userId,
                Name = "Name",
                Email= "email",
            });
        }
    }
}

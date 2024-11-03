using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using GraphQL;
using GraphQL.Types;

namespace Feedback.WebAPI.Controllers
{
    [Route("api/[controller]")]
    public class ProfileController: ControllerBase
    {
        private readonly IDocumentExecuter _documentExecuter;

        public ProfileController(IDocumentExecuter documentExecuter)
        {
            _documentExecuter = documentExecuter;
        }

        [Microsoft.AspNetCore.Authorization.Authorize]
        [HttpGet]
        public async Task<IActionResult> GetProfile()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userId == null)
            {
                return NotFound("User not found");
            }

            var query = "{ user(id: \"" + userId + "\") { id, name, email } }";
            var result = await _documentExecuter.ExecuteAsync(new ExecutionOptions
            {
                Query = query,
                // Add any necessary context or variables here
            });

            if (result.Errors?.Count > 0)
            {
                return BadRequest(result.Errors);
            }

            return Ok(result.Data);
        }
    }
}

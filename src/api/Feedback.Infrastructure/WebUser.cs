using Feedback.Application.Contracts;
using Feedback.Application.Contracts.Interfaces;
using System.Net.Http;
using System.Web;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;


namespace Feedback.Infrastructure
{
    public class WebUser(IHttpContextAccessor contextAccessor) : IWebUser
    {
        public int UserId
        {
            get {
                Claim? userIdClaim = contextAccessor.HttpContext?.User?.FindFirst(ClaimTypes.NameIdentifier);
                return userIdClaim != null ? int.Parse(userIdClaim.Value) : 0; // Handle null or invalid cases
            }
        }


        public string? Name => contextAccessor.HttpContext?.User?.Identity?.Name;
    }
} 
namespace Feedback.Core.Interfaces
{
    public class LinkedInAuthPayload
    {
        public string Email { get; set; } // User's email address
        public string Name { get; set; } // User's full name
        public string Picture { get; set; } // URL to the user's profile picture
    }
} 
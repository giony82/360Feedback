namespace Feedback.Application.Contracts.DTOs
{
    namespace Feedback.Application.DTOs
    {
        public class TeamDto : IdName
        {
            public string Description { get; set; }

            public int ProjectId { get; set; }
            public DateTime CreatedAt { get; set; }
            public DateTime? UpdatedAt { get; set; }
            public List<UserDto> Users { get; set; }
            public IdName Project { get; set; }
        }
    }
}

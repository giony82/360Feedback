using Feedback.Application.Contracts.DTOs.Feedback.Application.DTOs;

namespace Feedback.Application.Contracts.DTOs;

public class ProjectDto
{
    public int Id
    {
        get; set;
    }

    public string Name
    {
        get; set;
    }

    public string Description
    {
        get; set;
    }

    public ICollection<TeamDto> Teams
    {
        get; set;
    }

    public int CompanyId
    {
        get; set;
    }

    //public ICollection<FeedbackSession> FeedbackSessions { get; set; } = new List<FeedbackSession>();
}
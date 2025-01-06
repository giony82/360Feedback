namespace Feedback.Core.Entities;

public class Project: Entity
{
    public int Id { get; set; }

    public string Name { get; set; }

    public string Description { get; set; }

    public ICollection<Team> Teams { get; set; }

    public int CompanyId { get; set; }

    public Company Company { get; set; }

    public ICollection<FeedbackSession> FeedbackSessions { get; set; } = new List<FeedbackSession>();
}
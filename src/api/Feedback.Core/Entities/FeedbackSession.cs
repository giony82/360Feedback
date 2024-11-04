namespace Feedback.Core.Entities;

public class FeedbackSession
{
    public int Id
    {
        get; set;
    }

    public string Name
    {
        get; set;
    }

    public DateTime StartDate
    {
        get; set;
    }

    public DateTime EndDate
    {
        get; set;
    }

    /// <summary>
    /// (self, peer, manager, direct report)
    /// </summary>
    public int SessionType { get; set; }

    public int ProjectId
    {
        get; set;
    }

    public Project Project
    {
        get; set;
    }

    public ICollection<Feedback> Feedbacks { get; set; } = new List<Feedback>();
}
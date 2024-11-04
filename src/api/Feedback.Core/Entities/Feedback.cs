namespace Feedback.Core.Entities;

public class Feedback
{
    public int Id { get; set; }

    public string FeedbackText { get; set; }

    public int Rating { get; set; }

    public DateTime FeedbackDate { get; set; }

    public int FeedbackSessionId { get; set; }

    public int UserGiverId { get; set; }

    public int UserReceivedId { get; set; }

    public FeedbackSession FeedbackSession { get; set; }
}
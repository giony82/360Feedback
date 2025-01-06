namespace Feedback.Core.Entities;

public class Entity
{
    public DateTime CreatedAt
    {
        get; set;
    }

    public DateTime? UpdatedAt
    {
        get; set;
    }

    public int CreatedBy
    {
        get; set;
    }

    public int? UpdatedBy
    {
        get; set;
    }
}
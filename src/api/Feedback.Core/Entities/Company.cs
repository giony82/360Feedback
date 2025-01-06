namespace Feedback.Core.Entities;

public class Company:Entity
{
    public int Id
    {
        get; set;
    }

    public string Name
    {
        get; set;
    }

    public ICollection<Project> Projects
    {
        get; set;
    }

    public int SubscriptionPlanId {get;set;}

    public bool IsActive {get;set;}

    public SubscriptionPlan SubscriptionPlan { get; set; }
}
namespace Feedback.Core.Entities;

public class Company
{
    public int Id
    {
        get; set;
    }

    public DateTime CreatedDate {get;set;}
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
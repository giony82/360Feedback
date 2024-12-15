namespace Feedback.Application.Contracts.DTOs;

public class SubscriptionPlanDto
{
    public int Id
    {
        get; set;
    }
    public string Name
    {
        get; set;
    }
    public int MaxUsers
    {
        get; set;
    }
    public int MaxProjects
    {
        get; set;
    }
    //(Serialized list or table for detailed features)
    public string Features
    {
        get; set;
    }
    public decimal Price
    {
        get; set;
    }
}
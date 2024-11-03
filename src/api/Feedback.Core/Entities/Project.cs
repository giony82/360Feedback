namespace Feedback.Core.Entities;

public class Project
{
    public int Id
    {
        get; set;
    }
    public string Name
    {
        get; set;
    }

    // Navigation property to associate project with multiple teams
    public ICollection<Team> Teams
    {
        get; set;
    }

    // Navigation property to associate project with a company
    public int CompanyId
    {
        get; set;
    }
    public Company Company
    {
        get; set;
    }
}
namespace Feedback.Core.Entities;

public class Company
{
    public int Id
    {
        get; set;
    }
    public string Name
    {
        get; set;
    }

    // Navigation property to associate company with multiple projects
    public ICollection<Project> Projects
    {
        get; set;
    }
}


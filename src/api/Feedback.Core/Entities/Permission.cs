namespace Feedback.Core.Entities;

public class Permission
{
    public int Id
    {
        get; set;
    }
    public string Name
    {
        get; set;
    }

    // Navigation property to associate permission with multiple roles
    public ICollection<Role> Roles
    {
        get; set;
    }
}


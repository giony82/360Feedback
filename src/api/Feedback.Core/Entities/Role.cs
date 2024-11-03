using System.Security;

namespace Feedback.Core.Entities;

public class Role
{
    public int Id
    {
        get; set;
    }
    public string Name
    {
        get; set;
    }

    // Navigation property to associate role with multiple permissions
    public ICollection<Permission> Permissions
    {
        get; set;
    }
}
using Feedback.Core.Entities;

public class User
{
    public int Id { get; set; }

    public string Email { get; set; }

    public string Name { get; set; }

    public string Picture { get; set; }

    // Navigation property to associate user with multiple teams
    public ICollection<Team> Teams { get; set; }=new List<Team>();

    // Navigation property to associate user with multiple roles
    public ICollection<UserRole> UserRoles { get; set; }
}
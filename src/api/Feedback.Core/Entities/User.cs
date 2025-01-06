using Feedback.Core.Entities;

public class User : Entity
{
    public int Id { get; set; }

    public string Email { get; set; }

    public string Name { get; set; }

    public string Picture { get; set; }

    public ICollection<Team> Teams { get; set; } = new List<Team>();

    public ICollection<UserRole> UserRoles { get; set; }

    public bool IsVerified { get; set; }

    public int CompanyId { get; set; }
}
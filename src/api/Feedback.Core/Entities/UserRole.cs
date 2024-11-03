using System.ComponentModel.DataAnnotations;

namespace Feedback.Core.Entities;

public class UserRole
{
    [Key]
    public int Id
    {
        get; set;
    }

    public int UserId { get; set; }

    public User User { get; set; }

    public int RoleId { get; set; }

    public Role Role { get; set; }

    // Optional: Associate the role with a specific company or project
    public int? CompanyId { get; set; }

    public Company Company { get; set; }

    public int? ProjectId { get; set; }

    public Project Project { get; set; }
}
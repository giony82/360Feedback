namespace Feedback.Core.Entities;

public class Team: Entity
{
    public int Id { get; set; }

    public string Name { get; set; }

    public ICollection<User> Users { get; set; }

    public int ProjectId { get; set; }

    public Project Project { get; set; }
}
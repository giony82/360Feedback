using Feedback.Application.Contracts.DTOs.Feedback.Application.DTOs;

namespace Feedback.Application.Contracts.DTOs;

public class CompanyDto
{
    public int Id { get; set; }

    public DateTime CreatedDate { get; set; }
    public string Name { get; set; }

    public ICollection<ProjectDto> Projects { get; set; }

    public ICollection<TeamDto> Teams
    {
        get; set;
    }

    public int SubscriptionPlanId { get; set; }

    public bool IsActive { get; set; }
}
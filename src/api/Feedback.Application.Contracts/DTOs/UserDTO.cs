using Feedback.Application.Contracts.DTOs.Feedback.Application.DTOs;

namespace Feedback.Application.Contracts.DTOs;

public class UserDto
{
    public int Id { get; set; }
    public string Email { get; set; }
    public string Name { get; set; }
    public string Picture { get; set; }
    public ICollection<TeamDto> Teams { get; set; } = new List<TeamDto>();
}
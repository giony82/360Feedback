using Feedback.Application.Contracts.DTOs.Feedback.Application.DTOs;
using GraphQL.Types;

namespace Feedback.GraphQL.Types;

public class TeamType : ObjectGraphType<TeamDto>
{
    public TeamType()
    {
        Field(t => t.Id);
        Field(t => t.Name);
        Field(t => t.Description);
        Field(t => t.CreatedAt);
        Field(t => t.UpdatedAt);
        Field(t => t.ProjectId);
        Field(m => m.Project, type: typeof(IdNameType))
            .Description("The project to which the team belongs");
        Field(m => m.Users, type: typeof(ListGraphType<UserType>))
            .Resolve(c => c.Source.Users)
            .Description("All teams");
    }
}
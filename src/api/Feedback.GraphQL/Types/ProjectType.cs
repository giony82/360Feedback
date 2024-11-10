using Feedback.Application.Contracts.DTOs;
using GraphQL.Types;

namespace Feedback.GraphQL.Types;

public class ProjectType : ObjectGraphType<ProjectDto>
{
    public ProjectType()
    {
        Field(x => x.Id).Description("The ID of the project.");
        Field(x => x.Name).Description("The name of the project.");
        Field(x => x.Description, nullable: true).Description("The description of the project.");
    }
}
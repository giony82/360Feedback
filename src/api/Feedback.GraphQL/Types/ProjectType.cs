using Feedback.Application.Contracts.DTOs;
using GraphQL.Types;

namespace Feedback.GraphQL.Types;

public class ProjectType : ObjectGraphType<ProjectDto>
{
    public ProjectType()
    {
        Field(x => x.Id).Description("The ID of the project.");
        Field(x => x.Name).Description("The name of the project.");
        Field(x => x.CompanyId).Description("The company ID of the project.");
        Field(m => m.Company, type: typeof(IdNameType))
            .Description("The company to which the project belongs");
        Field(x => x.Description, nullable: true).Description("The description of the project.");
    }
}


public class IdNameType : ObjectGraphType<IdName>
{
    public IdNameType()
    {
        Field(x => x.Id).Description("The ID of the entity.");
        Field(x => x.Name).Description("The name of the entity.");
    }
}

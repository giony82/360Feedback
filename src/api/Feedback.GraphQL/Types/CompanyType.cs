using Feedback.Application.Contracts.DTOs;
using Feedback.GraphQL.Types;
using GraphQL.Types;

public class CompanyType : ObjectGraphType<CompanyDto>
{
    public CompanyType()
    {
        Field(x => x.Id);
        Field(x => x.Name);
        Field(x => x.SubscriptionPlanId);
        Field(m => m.Projects, type: typeof(ListGraphType<ProjectType>))
            .Resolve(c => c.Source.Projects)
            .Description("Projects of the company");
        Field(m => m.Teams, type: typeof(ListGraphType<TeamType>))
            .Resolve(c => c.Source.Teams)
            .Description("All teams");
    }
}
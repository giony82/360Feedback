using GraphQL.Types;

namespace Feedback.GraphQL.Mutations;

public class AppMutations : ObjectGraphType
{
    public AppMutations()
    {
        Field<CompanyMutations>("companyMutations").Resolve(context => new { });
        Field<ProjectMutations>("projectMutations").Resolve(context => new { });
        Field<TeamMutations>("teamMutations").Resolve(context => new { });
    }
}
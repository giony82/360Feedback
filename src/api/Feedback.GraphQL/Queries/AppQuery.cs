using GraphQL.Types;

namespace Feedback.GraphQL.Queries
{
    public class AppQuery : ObjectGraphType
    {
        public AppQuery()
        {
            Field<UserQuery>("userQueries").Resolve(context => new { });
            Field<CompanyQuery>("companyQueries").Resolve(context => new { });
            Field<SubscriptionPlanQuery>("subscriptionPlanQueries").Resolve(context => new { });
            Field<ProjectQuery>("projectQueries").Resolve(context => new { });
            Field<TeamQuery>("teamQueries").Resolve(context => new { });
        }
    }
}
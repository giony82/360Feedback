using Feedback.Application.Contracts.Interfaces;
using GraphQL.Types;

public class AppQuery : ObjectGraphType
{
    public AppQuery(IUserService userService)
    {
        Field<UserQuery>("userQueries").Resolve(context => new UserQuery(userService));
        Field<CompanyQuery>("companyQueries").Resolve(context => new { });
        Field<SubscriptionPlanQuery>("subscriptionPlanQueries").Resolve(context => new { });

    }
}
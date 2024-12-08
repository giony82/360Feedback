using Feedback.Application.Contracts.DTOs;
using Feedback.Application.Contracts.Interfaces;
using Feedback.GraphQL.Types;
using GraphQL.Resolvers;
using GraphQL.Types;

public class SubscriptionPlanQuery : ObjectGraphType
{
    public SubscriptionPlanQuery(ISubscriptionPlanService subscriptionPlanService)
    {
        AddField(new FieldType
        {
            Name = "plans",
            Type = typeof(ListGraphType<SubscriptionPlanType>),
            Resolver = new FuncFieldResolver<IEnumerable<SubscriptionPlanDto>>(async context =>
            {
                var plans = await subscriptionPlanService.GetAllSubscriptionPlansAsync();
                return plans;
            })
        });
    }
}
using Feedback.Application.Contracts.DTOs;
using GraphQL.Types;

namespace Feedback.GraphQL.Types
{
    public class SubscriptionPlanType : ObjectGraphType<SubscriptionPlanDto>
    {
        public SubscriptionPlanType()
        {
            Field(x => x.Id);
            Field(x => x.Name);;
            Field(x => x.Price);
            Field(x => x.MaxProjects);
            Field(x => x.MaxUsers);
            Field(x => x.Features);
        }
    }
}
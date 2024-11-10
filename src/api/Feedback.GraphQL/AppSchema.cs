using Feedback.GraphQL.Mutations;
using GraphQL.Types;
using Microsoft.Extensions.DependencyInjection;

namespace Feedback.GraphQL;

public class AppSchema : Schema
{
    public AppSchema(IServiceProvider provider) : base(provider)
    {
        Query = provider.GetRequiredService<AppQuery>();
        Mutation = provider.GetRequiredService<AppMutations>();
    }
}
using GraphQL.Types;
using Microsoft.Extensions.DependencyInjection;

namespace Feedback.GraphQL;

public class AppSchema : Schema
{
    public AppSchema(IServiceProvider provider) : base(provider)
    {
        Query = provider.GetRequiredService<UserQuery>();
        // Add Mutation = provider.GetRequiredService<YourMutation>(); if you have mutations
    }
}
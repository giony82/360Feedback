using Feedback.GraphQL.Types;
using GraphQL.Types;
using Microsoft.Extensions.DependencyInjection;

namespace Feedback.GraphQL;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddGraphQlServices(this IServiceCollection services)
    {
        // Register GraphQL types and schema
        services.AddScoped<UserQuery>();
        services.AddScoped<UserType>();
        services.AddScoped<TeamType>();
        services.AddScoped<ISchema, AppSchema>();
        return services;
    }
}
using Feedback.GraphQL.Mutations;
using Feedback.GraphQL.Queries;
using Feedback.GraphQL.Types;
using GraphQL.Types;
using Microsoft.Extensions.DependencyInjection;
using Scrutor;
namespace Feedback.GraphQL;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddGraphQlServices(this IServiceCollection services)
    {
        services.Scan(scan => scan
            .FromCallingAssembly()
            .AddClasses(publicOnly: true)
            .UsingRegistrationStrategy(RegistrationStrategy.Skip)
            .AsSelf()
            .WithScopedLifetime());

        services.AddScoped<ISchema, AppSchema>();
        return services;
    }
}
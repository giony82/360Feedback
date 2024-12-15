using Feedback.GraphQL.Mutations;
using Feedback.GraphQL.Types;
using GraphQL.Types;
using Microsoft.Extensions.DependencyInjection;

namespace Feedback.GraphQL;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddGraphQlServices(this IServiceCollection services)
    {
        services.AddScoped<UserQuery>();
        services.AddScoped<UserType>();
        services.AddScoped<SubscriptionPlanType>();
        services.AddScoped<TeamType>();
        services.AddScoped<CompanyType>();
        services.AddScoped<ProjectType>();
        services.AddScoped<CompanyQuery>();
        services.AddScoped<AppQuery>();
        services.AddScoped<AppMutations>();
        services.AddScoped<SubscriptionPlanQuery>();
        services.AddScoped<CompanyInputType>();
        services.AddScoped<CompanyMutations>();
        services.AddScoped<ISchema, AppSchema>();
        return services;
    }
}
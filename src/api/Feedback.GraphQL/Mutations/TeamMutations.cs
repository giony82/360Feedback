using Feedback.Application.Contracts.DTOs.Feedback.Application.DTOs;
using Feedback.Application.Contracts.Interfaces;
using Feedback.GraphQL.Types;
using GraphQL;
using GraphQL.Resolvers;
using GraphQL.Types;

namespace Feedback.GraphQL.Mutations;

public class TeamMutations : ObjectGraphType
{
    public TeamMutations(ITeamService teamService)
    {
        AddField(new FieldType
        {
            Name = "addTeam",
            Type = typeof(TeamType),
            Arguments = new QueryArguments(new QueryArgument<NonNullGraphType<TeamInputType>> { Name = "team" }),
            Resolver = new FuncFieldResolver<TeamDto>(async context =>
            {
                var teamInput = context.GetArgument<TeamDto>("team");
                return await teamService.CreateTeamAsync(teamInput);
            })
        });
    }
}
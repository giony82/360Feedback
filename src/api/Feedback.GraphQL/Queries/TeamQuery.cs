using Feedback.Application.Contracts.DTOs;
using Feedback.Application.Contracts.DTOs.Feedback.Application.DTOs;
using Feedback.Application.Contracts.Interfaces;
using Feedback.GraphQL.Types;
using GraphQL;
using GraphQL.Resolvers;
using GraphQL.Types;

namespace Feedback.GraphQL.Queries
{
    public class TeamQuery : ObjectGraphType
    {
        public TeamQuery(ITeamService teamService)
        {
            AddField(new FieldType
            {
                Name = "teams",
                Type = typeof(ListGraphType<TeamType>),
                Resolver = new FuncFieldResolver<IEnumerable<TeamDto>>(async context =>
                {
                    var users = await teamService.GetAllTeamsAsync();
                    return users;
                })
            });
        }
    }
}
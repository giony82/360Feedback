namespace Feedback.WebAPI.GraphQL.Types
{
    using Feedback.Application.DTOs;
    using Feedback.Application.DTOs.Feedback.Application.DTOs;
    using global::GraphQL.Types;
    using GraphQL.Types;

    public class TeamType : ObjectGraphType<TeamDto>
    {
        public TeamType()
        {
            Field(x => x.Id).Description("The ID of the team.");
            Field(x => x.Name).Description("The name of the team.");
            Field(x => x.Description, nullable: true).Description("The description of the team.");
        }
    }
}

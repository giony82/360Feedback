using Feedback.Application.DTOs;
using Feedback.WebAPI.GraphQL.Types;
using GraphQL.Types;

public class UserType : ObjectGraphType<UserDto>
{
    public UserType()
    {
        Field(x => x.Id).Description("The ID of the user.");
        Field(x => x.Email).Description("The email of the user.");
        Field(x => x.Name).Description("The name of the user.");
        Field(x => x.Picture).Description("The picture of the user.");
        Field<ListGraphType<TeamType>>("teams", "The teams the user belongs to.");
    }
}
using GraphQL.Types;

public class TeamInputType : InputObjectGraphType
{
    public TeamInputType()
    {
        Name = "TeamInput";
        Field<NonNullGraphType<StringGraphType>>("name");
        Field<NonNullGraphType<StringGraphType>>("description");
        Field<NonNullGraphType<IntGraphType>>("projectId");
    }
}
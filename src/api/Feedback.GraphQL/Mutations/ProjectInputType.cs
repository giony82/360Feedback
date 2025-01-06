using GraphQL.Types;

public class ProjectInputType : InputObjectGraphType
{
    public ProjectInputType()
    {
        Name = "ProjectInput";
        Field<NonNullGraphType<StringGraphType>>("name");
        Field<NonNullGraphType<StringGraphType>>("description");
        Field<NonNullGraphType<IntGraphType>>("companyId");
    }
}
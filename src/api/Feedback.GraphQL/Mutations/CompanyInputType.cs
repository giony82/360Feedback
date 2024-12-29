using GraphQL.Types;

public class CompanyInputType : InputObjectGraphType
{
    public CompanyInputType()
    {
        Name = "CompanyInput";
        Field<NonNullGraphType<StringGraphType>>("name");
        Field<NonNullGraphType<IntGraphType>>("subscriptionPlanId");
    }
}

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
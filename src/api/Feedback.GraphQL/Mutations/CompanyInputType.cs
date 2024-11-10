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
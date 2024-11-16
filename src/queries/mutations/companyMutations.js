import { gql } from '@apollo/client';

// Define the GraphQL query to fetch plans
export const ADD_COMPANY = gql`
    mutation AddCompany($company: CompanyInput!) {
        companyMutations {
            addCompany(company: $company) {            
                name,
                subscriptionPlanId            
            }
        }
    }
`;
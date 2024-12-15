import { gql } from '@apollo/client';

// Define the GraphQL query to fetch plans
export const GET_PLANS = gql`
    query GetPlans {
        subscriptionPlanQueries {
            plans {
                id
                name
            }
        }
    }
`;

// Define the GraphQL query to fetch companies
export const GET_COMPANIES = gql`
    query GetCompanies {
        companyQueries {
            companies {
                id
                name
                projects{
                    id
                    name
                }
                teams {
                    id
                    name
                }
            }
        }   
    }
`;
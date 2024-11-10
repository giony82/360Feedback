import { gql } from '@apollo/client';

// Define the GraphQL query to fetch plans
export const GET_PLANS = gql`
    query GetPlans {
        subscriptionQueries {
            plans {
                id
                name
            }
        }
    }
`;
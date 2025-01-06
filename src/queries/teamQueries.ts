import { gql } from '@apollo/client';

export const GET_TEAMS = gql`
    query GetTeams {
        teamQueries{
            teams {
                id
                name
                description
                projectId
                project {
                    id
                    name
                }
            }
        }   
    }
`;
import { gql } from '@apollo/client';

export const GET_PROJECTS = gql`
  query GetProjects {
        projectQueries {
            projects {
                id
                name
                company {
                    id
                    name
                }               
            }
        }
    }
`; 
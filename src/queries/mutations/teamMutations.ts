import { gql } from '@apollo/client';

export const ADD_TEAM = gql`
    mutation AddTeam($team: TeamInput!) {
        teamMutations {
            addTeam(team: $team) {
                id
                name
                description
                projectId
            }
        }
    }
`; 
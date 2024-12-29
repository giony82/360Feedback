import { gql } from '@apollo/client';

export const ADD_PROJECT = gql`
  mutation AddProject($project: ProjectInput!) {
   projectMutations {
      addProject(project: $project) {
        id
        name
        description
        companyId
      }
    }
  }
`; 
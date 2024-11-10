// src/queries/userQueries.js
import { gql } from '@apollo/client';

export const GET_USER_PROFILE = gql`
  query GetUserProfile($id: Int!) {
    userQueries{
      user(id: $id) {
        id
        name
        email
        picture      
        teams {
         id
         name
        }
      }
    }
  }
`;
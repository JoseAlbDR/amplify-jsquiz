/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getNotes = /* GraphQL */ `
  query GetNote($id: ID!) {
    getNote(id: $id) {
      id
      question
      code
      options
      correctOption
      points
      answer
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listNotes = /* GraphQL */ `
  query ListNotes(
    $filter: ModelNoteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        question
        code
        options
        correctOption
        points
        answer
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;

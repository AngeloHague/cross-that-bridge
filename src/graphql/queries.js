/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getMyTodos = /* GraphQL */ `
  query GetMyTodos {
    getMyTodos {
      id
      name
      description
      userId
      projectID
      parentTask
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const getMyProjects = /* GraphQL */ `
  query GetMyProjects {
    getMyProjects {
      id
      name
      description
      userId
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const getProject = /* GraphQL */ `
  query GetProject($id: ID!) {
    getProject(id: $id) {
      id
      name
      description
      userId
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const listProjects = /* GraphQL */ `
  query ListProjects(
    $filter: ModelProjectFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProjects(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        userId
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getTodo = /* GraphQL */ `
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
      id
      name
      description
      userId
      projectID
      parentTask
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const listTodos = /* GraphQL */ `
  query ListTodos(
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        userId
        projectID
        parentTask
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;

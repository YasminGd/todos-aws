/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getWeather = /* GraphQL */ `
  query GetWeather($id: ID!) {
    getWeather(id: $id) {
      id
      temprature
      image
      cityName
      lastUpdated
      createdAt
      updatedAt
    }
  }
`;
export const listWeathers = /* GraphQL */ `
  query ListWeathers(
    $filter: ModelWeatherFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listWeathers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        temprature
        image
        cityName
        lastUpdated
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getTodo = /* GraphQL */ `
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
      id
      description
      byUserId
      cityName
      isCompleted
      createdAt
      updatedAt
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
        description
        byUserId
        cityName
        isCompleted
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

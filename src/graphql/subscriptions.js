/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateWeather = /* GraphQL */ `
  subscription OnCreateWeather($filter: ModelSubscriptionWeatherFilterInput) {
    onCreateWeather(filter: $filter) {
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
export const onUpdateWeather = /* GraphQL */ `
  subscription OnUpdateWeather($filter: ModelSubscriptionWeatherFilterInput) {
    onUpdateWeather(filter: $filter) {
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
export const onDeleteWeather = /* GraphQL */ `
  subscription OnDeleteWeather($filter: ModelSubscriptionWeatherFilterInput) {
    onDeleteWeather(filter: $filter) {
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
export const onCreateTodo = /* GraphQL */ `
  subscription OnCreateTodo(
    $filter: ModelSubscriptionTodoFilterInput
    $owner: String
  ) {
    onCreateTodo(filter: $filter, owner: $owner) {
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
export const onUpdateTodo = /* GraphQL */ `
  subscription OnUpdateTodo(
    $filter: ModelSubscriptionTodoFilterInput
    $owner: String
  ) {
    onUpdateTodo(filter: $filter, owner: $owner) {
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
export const onDeleteTodo = /* GraphQL */ `
  subscription OnDeleteTodo(
    $filter: ModelSubscriptionTodoFilterInput
    $owner: String
  ) {
    onDeleteTodo(filter: $filter, owner: $owner) {
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

/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createWeather = /* GraphQL */ `
  mutation CreateWeather(
    $input: CreateWeatherInput!
    $condition: ModelWeatherConditionInput
  ) {
    createWeather(input: $input, condition: $condition) {
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
export const updateWeather = /* GraphQL */ `
  mutation UpdateWeather(
    $input: UpdateWeatherInput!
    $condition: ModelWeatherConditionInput
  ) {
    updateWeather(input: $input, condition: $condition) {
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
export const deleteWeather = /* GraphQL */ `
  mutation DeleteWeather(
    $input: DeleteWeatherInput!
    $condition: ModelWeatherConditionInput
  ) {
    deleteWeather(input: $input, condition: $condition) {
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
export const createTodo = /* GraphQL */ `
  mutation CreateTodo(
    $input: CreateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    createTodo(input: $input, condition: $condition) {
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
export const updateTodo = /* GraphQL */ `
  mutation UpdateTodo(
    $input: UpdateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    updateTodo(input: $input, condition: $condition) {
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
export const deleteTodo = /* GraphQL */ `
  mutation DeleteTodo(
    $input: DeleteTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    deleteTodo(input: $input, condition: $condition) {
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

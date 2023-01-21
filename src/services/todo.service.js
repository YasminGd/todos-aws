import { API } from "aws-amplify"
import { listTodos } from "../graphql/queries"
import {
    createTodo as createTodoMutation,
    deleteTodo as deleteTodoMutation,
    updateTodo as updateTodoMutation
} from "../graphql/mutations"
import { geocodingService } from "./geocoding.service"

export const todoService = {
    query,
    remove,
    save,
}

async function query(filter = {}) {
    const criteria = _buildCriteria(filter)
    try {
        const apiData = await API.graphql({
            query: listTodos,
            variables: { filter: criteria }
        })
        const  todosFromAPI = apiData.data.listTodos.items
        return todosFromAPI
    } catch (err) {
        console.log(err)
        throw err
    }
}

async function remove(id) {
    try {
        await API.graphql({
            query: deleteTodoMutation,
            variables: { input: { id } },
        })
    } catch (err) {
        console.log(err)
        throw err
    }
    return
}

async function save(todo) {
    // let weather = await geocodingService.getCityWeather(`${todo.title} ${todo.description}`)
    if (todo.id) {
        try {
            delete todo.createdAt
            delete todo.updatedAt
            const updatedTodoData = await API.graphql({
                query: updateTodoMutation,
                variables: { input: todo },
            })
            const updatedTodo = updatedTodoData.data.updateTodo
            return updatedTodo
        } catch (err) {
            console.error(err)
            throw err
        }
    } else {
        try {
            const addedTodoData = await API.graphql({
                query: createTodoMutation,
                variables: { input: todo },
            })
            const addedTodo = addedTodoData.data.createTodo
            return addedTodo
        } catch (err) {
            console.error(err)
            throw err
        }
    }
}

function _buildCriteria(filter) {
    const criteria = {}
    if (filter.byUserId) criteria.byUserId = { eq: filter.byUserId }
    return criteria
}
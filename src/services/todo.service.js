import { API, Storage } from "aws-amplify"
import { listTodos } from "../graphql/queries"
import {
    createTodo as createTodoMutation,
    deleteTodo as deleteTodoMutation,
} from "../graphql/mutations"

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
        const todosFromAPI = apiData.data.listTodos.items
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
    if (todo.id) {
        try {

        } catch (err) {
            console.error(err)
            throw err
        }
    } else {
        try {
            const addedTodo = await API.graphql({
                query: createTodoMutation,
                variables: { input: todo },
            })
            return addedTodo.data.createTodo
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
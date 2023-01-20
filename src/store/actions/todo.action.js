import { Auth } from "aws-amplify"
import { todoService } from "../../services/todo.service"

export function loadTodos() {
    return async (dispatch) => {
        try {
            const user = await Auth.currentUserInfo()
            const todos = await todoService.query({ byUserId: user.id })
            dispatch({
                type: 'SET_TODOS',
                todos: [...todos],
            })
        } catch (err) {
            console.log('Cannot load todos', err)
            throw err
        }
    }
}

export function addTodo(todo) {
    return async (dispatch) => {
        try {
            const addedTodo = await todoService.save(todo)
            dispatch({
                type: 'ADD_TODO',
                todo: { ...addedTodo },
            })
        }
        catch (err) {
            console.log('Cannot add todo', err)
            throw err
        }
    }
}

export function updateTodo(todo) {
    return async (dispatch) => {
        try {
            const updatedTodo = await todoService.save(todo)
            dispatch({
                type: 'UPDATE_TODO',
                todo: updatedTodo,
            })
        } catch (err) {
            console.error('Cannot update todo', err)
            throw err        }
    }
}

export function removeTodo(todoId) {
    return async (dispatch) => {
        try {
            await todoService.remove(todoId)
            dispatch({
                type: 'REMOVE_TODO',
                todoId,
            })
        } catch (err) {
            console.error('Cannot remove todo', err)
            throw err
        }
    }
}

export function removeTodosFromState(todoId) {
    return async (dispatch) => {
        try {
            dispatch({
                type: 'SET_TODOS',
                todos: [],
            })
        } catch (err) {
            console.error('Cannot remove todo', err)
            throw err
        }
    }
}
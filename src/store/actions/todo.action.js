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
            const savedTodo = await todoService.save(todo)
            dispatch({
                type: 'ADD_TODO',
                todo: { ...savedTodo },
            })
        }
        catch (err) {
            console.log('Cannot add todo', err)
            throw err
        }
    }
}

// export function updateTodo(todo) {
//     return async (dispatch) => {
//         dispatch(getActionUpdateBoard({ ...board }))
//         try {
//             await boardService.save(board)
//         } catch (err) {
//             dispatch(getActionUpdateBoard(prevBoard))
//             console.log('Cannot update board', err)
//         }
//     }
// }

export function removeTodo(todoId) {
    return async (dispatch) => {
        try {
            await todoService.remove(todoId)
            dispatch({
                type: 'REMOVE_TODO',
                todoId,
            })
        } catch (err) {
            console.log('Cannot remove todo', err)
            throw err
        }
    }
}
const initialState = {
    todos: [],
}

export function todoReducer(state = initialState, action) {

    switch (action.type) {
        case 'SET_TODOS':
            state = { ...state, todos: action.todos }
            break
        case 'ADD_TODO':
            state = { ...state, todos: [...state.todos, action.todo] }
            break
        case 'REMOVE_TODO':
            state = { ...state, todos: state.todos.filter(todo => todo.id !== action.todoId) }
            break
        case 'UPDATE_TODO':
            console.log(action.todo);
            console.log(state.todos[0]);
            state = { ...state, todos: state.todos.map(todo => todo.id === action.todo.id ? action.todo : todo) }
            break
        default:
            return state
    }
    // For debug:
    window.state = state
    return state
}
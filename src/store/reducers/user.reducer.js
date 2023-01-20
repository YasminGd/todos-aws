import { userService } from "../../services/user.service"

const initialState = {
    user: userService.getLoggedInUser() || null,
}

export function userReducer(state = initialState, action) {

    switch (action.type) {
        case 'SET_USER':
            state = { ...state, user: action.user }
            break
        default:
            return state
    }
    // For debug:
    window.state = state
    return state
}
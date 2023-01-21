import { userService } from "../../services/user.service"

export function login(credentials) {
    return async (dispatch) => {
        try {
            const user = await userService.login(credentials)
            console.log(user);
            dispatch({ type: "SET_USER", user })
        } catch (err) {
            console.error(err)
            throw err
        }
    }
}

export function signup(credentials) {
    return async (dispatch) => {
        try {
            const user = await userService.signup(credentials)
            dispatch({ type: "SET_USER", user })
        } catch (err) {
            console.error(err)
            throw err
        }
    }
}

export function logout() {
    return async (dispatch) => {
        try {
            await userService.logout()
            dispatch({ type: "SET_USER", user: null })
        } catch (err) {
            console.error(err)
            throw err
        }
    }
}

export function confirmEmail(username, code) {
    return async (dispatch) => {
        try {
            await userService.confirmEmail(username, code)
        } catch (err) {
            dispatch({ type: "SET_USER", user: null })
            console.error(err)
            throw err
        }
    }
}
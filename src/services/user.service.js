import { Auth } from "aws-amplify"

export const userService = {
    login,
    signup,
    logout,
    confirmEmail,
    getLoggedInUser
}

const STORAGE_KEY_LOGGEDIN = 'loggedInUser'

async function login({ username, password }) {
    try {
        const user = await Auth.signIn(username, password)
        const miniUser = {
            username: user.username,
            id: user.attributes.sub,
            isConfirmed: true
        }
        sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(miniUser))
        return miniUser
    } catch (err) {
        console.error(err)
        throw err
    }
}

async function signup({ username, password, email }) {
    try {
        const user = await Auth.signUp({
            username, password, attributes: {
                email
            }
        })
        const miniUser = {
            username: user.user.username,
            id: user.userSub,
            isConfirmed: false
        }
        sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(miniUser))
        return miniUser
    } catch (err) {
        console.error(err)
        throw err
    }
}

async function logout() {
    try {
        await Auth.signOut()
        sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
    } catch (err) {
        console.error(err)
        throw err
    }
}

async function confirmEmail(username, code) {
    try {
        await Auth.confirmSignUp(username, code)
        return
    } catch (err) {
        console.error(err)
        throw err
    }
}

function getLoggedInUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}
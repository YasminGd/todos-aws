import { Auth } from "aws-amplify"

export const userService = {
    login,
    signup,
    logout,
    getLoggedInUser
}

const STORAGE_KEY_LOGGEDIN = 'loggedInUser'

async function login({ username, password }) {
    try {
        const user = await Auth.signIn(username, password)
        const miniUser = {
            username: user.username,
            id: user.attributes.sub
        }
        sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(miniUser))
        return miniUser
    } catch (err) {
        console.error(err)
        throw err
    }
}

async function signup(credentials) {
    try {
        const user = await Auth.signUp({
            ...credentials, attributes: {
                email: 'example3@gmail.com'
            }
        })
        const miniUser = {
            username: user.cognitoUser.username,
            id: user.userSub
        }
        sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(miniUser))
        console.log(miniUser)
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
    } catch(err) {
        console.error(err)
        throw err
    }
}

function getLoggedInUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN)) 
  }
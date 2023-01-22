import { API } from "aws-amplify"
import { listTodos } from "../graphql/queries"
import {
    createTodo as createTodoMutation,
    deleteTodo as deleteTodoMutation,
    updateTodo as updateTodoMutation
} from "../graphql/mutations"
import { geocodingService } from "./geocoding.service"
import { DBService } from "./db.service"
import { utilService } from "./util.service"

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
        const todosWithWeather = await Promise.all(todosFromAPI.map(async (todo) => {
            if (todo.cityName) {
                let weather = await DBService.getFromDB(todo.cityName)
                if (weather) {
                    if (utilService.isMoreThenADayAgo(weather.lastUpdated)) weather = await geocodingService.getCityWeather(weather.cityName)
                    todo.weather = weather
                }
            }
            return todo
        }))
        return todosWithWeather
    } catch (err) {
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
        throw err
    }
    return
}

async function save(todo) {
    let weather = await geocodingService.getCityWeather(todo.description)
    if (todo.id) {
        try {
            delete todo.createdAt
            delete todo.updatedAt
            if (todo.weather) delete todo.weather
            todo.cityName = weather ? weather.cityName : null
            const updatedTodoData = await API.graphql({
                query: updateTodoMutation,
                variables: { input: todo },
            })
            const updatedTodo = updatedTodoData.data.updateTodo
            if (weather) updatedTodo.weather = weather
            return updatedTodo
        } catch (err) {
            console.error(err)
            throw err
        }
    } else {
        try {
            if (weather) todo.cityName = weather.cityName
            const addedTodoData = await API.graphql({
                query: createTodoMutation,
                variables: { input: todo },
            })
            const addedTodo = addedTodoData.data.createTodo
            if (weather) addedTodo.weather = weather
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
import React, { useState, useEffect } from "react"
import "@aws-amplify/ui-react/styles.css"
import {
  Button,
  Flex,
  Heading,
  Image,
  Text,
  TextField,
  View,
} from "@aws-amplify/ui-react"
import { todoService } from "../services/todo.service"
import { Auth } from "aws-amplify"
import { TodoList } from "../components/todo-list"

export const TodoApp = ({ signOut }) => {
  const [todos, setTodos] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    ;(async () => {
      const loggedIUser = await Auth.currentUserInfo()
      setUser(loggedIUser)
      fetchTodos({ byUserId: loggedIUser.id })
    })()
  }, [])

  const fetchTodos = async (filter) => {
    try {
      const todosFromAPI = await todoService.query(filter)
      setTodos(todosFromAPI)
    } catch (err) {
      console.error(err)
    }
  }

  const createTodo = async (event) => {
    event.preventDefault()
    const form = new FormData(event.target)
    const todo = {
      title: form.get("title").trim(),
      description: form.get("description").trim(),
      byUserId: user.id,
    }
    try {
      const addedTodo = await todoService.save(todo)
      setTodos((prevTodos) => [...prevTodos, addedTodo])
    } catch (err) {
      console.error(err)
    }
    event.target.reset()
  }

  const deleteTodo = async (id) => {
    try {
      await todoService.remove(id)
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id))
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <section className='todos'>
      <View as='form' margin='3rem 0' onSubmit={createTodo}>
        <Flex direction='row' justifyContent='center'>
          <TextField
            name='title'
            placeholder='Todo Title'
            label='Todo Title'
            labelHidden
            variation='quiet'
            required
          />
          <TextField
            name='description'
            placeholder='Todo Description'
            label='Todo Description'
            labelHidden
            variation='quiet'
            required
          />
          <Button type='submit' variation='primary'>
            Create Todo
          </Button>
        </Flex>
      </View>
      <Heading level={2}>Current Todo</Heading>
      <TodoList todos={todos} deleteTodo={deleteTodo} />
    </section>
  )
}

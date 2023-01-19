import React, { useState, useEffect } from "react"
import "@aws-amplify/ui-react/styles.css"
import { API, Storage } from "aws-amplify"
import {
  Button,
  Flex,
  Heading,
  Image,
  Text,
  TextField,
  View,
} from "@aws-amplify/ui-react"
import { createTodo as createTodoMutation } from "../graphql/mutations"
import { todoService } from "../services/todo.service"
import { Auth } from "aws-amplify"

export const Todos = () => {
  const [todos, setTodos] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    fetchTodos()
    getUser()
  }, [])

  const fetchTodos = async () => {
    try {
      const todosFromAPI = await todoService.query()
      setTodos(todosFromAPI)
    } catch (err) {
      console.error(err)
    }
  }

  const getUser = async () => {
    setUser(await Auth.currentUserInfo())
  }

  const createTodo = async (event) => {
    event.preventDefault()
    const form = new FormData(event.target)
    const todo = {
      title: form.get("title"),
      description: form.get("description"),
      byUserId: user.id,
    }
    try {
      const addedTodo = await todoService.save(todo)
      setTodos(prevTodos => [...prevTodos, addedTodo])
    } catch(err) {
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
      <Heading level={1}>
        My Todo App
        {user && (
          <span style={{ marginLeft: "68px" }}>Hello {user.username}</span>
        )}
      </Heading>
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
      <View margin='3rem 0'>
        {todos.map((todo) => (
          <Flex
            key={todo.id}
            direction='row'
            justifyContent='center'
            alignItems='center'
          >
            <Text as='strong' fontWeight={700}>
              {todo.title}
            </Text>
            <Text as='span'>{todo.description}</Text>
            <Button variation='link' onClick={() => deleteTodo(todo.id)}>
              Delete todo
            </Button>
          </Flex>
        ))}
      </View>
    </section>
  )
}

import React, { useState, useEffect } from "react"
import "@aws-amplify/ui-react/styles.css"
import { API } from "aws-amplify"
import {
  Button,
  Flex,
  Heading,
  Text,
  TextField,
  View,
  withAuthenticator,
} from "@aws-amplify/ui-react"
import { listTodos } from "../graphql/queries"
import {
  createTodo as createTodoMutation,
  deleteTodo as deleteTodoMutation,
} from "../graphql/mutations"

export const Todos = () => {
  const [Todo, setTodo] = useState([])

  useEffect(() => {
    fetchTodo()
  }, [])

  async function fetchTodo() {
    const apiData = await API.graphql({ query: listTodos })
    const TodoFromAPI = apiData.data.listTodos.items
    setTodo(TodoFromAPI)
  }

  async function createTodo(event) {
    event.preventDefault()
    const form = new FormData(event.target)
    const data = {
      name: form.get("name"),
      description: form.get("description"),
    }
    await API.graphql({
      query: createTodoMutation,
      variables: { input: data },
    })
    fetchTodo()
    event.target.reset()
  }

  async function deleteTodo({ id }) {
    const newTodo = Todo.filter((note) => note.id !== id)
    setTodo(newTodo)
    await API.graphql({
      query: deleteTodoMutation,
      variables: { input: { id } },
    })
  }

  return (
    <section className='todos'>
      <Heading level={1}>My Todo App</Heading>
      <View as='form' margin='3rem 0' onSubmit={createTodo}>
        <Flex direction='row' justifyContent='center'>
          <TextField
            name='name'
            placeholder='Todo Name'
            label='Todo Name'
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
        {Todo.map((note) => (
          <Flex
            key={note.id || note.name}
            direction='row'
            justifyContent='center'
            alignItems='center'
          >
            <Text as='strong' fontWeight={700}>
              {note.name}
            </Text>
            <Text as='span'>{note.description}</Text>
            <Button variation='link' onClick={() => deleteTodo(note)}>
              Delete note
            </Button>
          </Flex>
        ))}
      </View>
    </section>
  )
}

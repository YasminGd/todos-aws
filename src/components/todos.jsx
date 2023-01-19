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
import { listTodos } from "../graphql/queries"
import {
  createTodo as createTodoMutation,
  deleteTodo as deleteTodoMutation,
} from "../graphql/mutations"

export const Todos = () => {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    fetchTodos()
  }, [])

  async function fetchTodos() {
    const apiData = await API.graphql({ query: listTodos })
    const todosFromAPI = apiData.data.listTodos.items
    await Promise.all(
      todosFromAPI.map(async (todo) => {
        if (todo.image) {
            const url = await Storage.get(todo.name)
          todo.image = url
        }
        return todo
      })
    )
    setTodos(todosFromAPI)
  }

  async function createTodo(event) {
    event.preventDefault()
    const form = new FormData(event.target)
    const image = form.get("image")
    const data = {
      name: form.get("name"),
      description: form.get("description"),
      image: image.name,
    }
    if (data.image) await Storage.put(data.name, image)
    await API.graphql({
        query: createTodoMutation,
        variables: { input: data },
    })
    fetchTodos()
    event.target.reset()
  }

  async function deleteTodo({ id, name }) {
    const newTodo = todos.filter((note) => note.id !== id)
    setTodos(newTodo)
    await Storage.remove(name)
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
          <View
            name='image'
            as='input'
            type='file'
            style={{ alignSelf: "end" }}
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
            key={todo.id || todo.name}
            direction='row'
            justifyContent='center'
            alignItems='center'
          >
            <Text as='strong' fontWeight={700}>
              {todo.name}
            </Text>
            <Text as='span'>{todo.description}</Text>
            {todo.image && (
              <Image
                src={todo.image}
                alt={`visual aid for ${todos.name}`}
                style={{ width: 40, borderRadius: '50%' }}
              />
            )}
            <Button variation='link' onClick={() => deleteTodo(todo)}>
              Delete todo
            </Button>
          </Flex>
        ))}
      </View>
    </section>
  )
}

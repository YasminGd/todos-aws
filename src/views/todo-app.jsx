import "@aws-amplify/ui-react/styles.css"
import {
  Button,
  Flex,
  Heading,
  Image,
  Loader,
  Text,
  TextField,
  View,
} from "@aws-amplify/ui-react"
import { todoService } from "../services/todo.service"
import { TodoList } from "../components/todo-list"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { addTodo, loadTodos, removeTodo } from "../store/actions/todo.action"
import { useState } from "react"
import { Route, Routes } from "react-router-dom"
import { TodoEdit } from "./todo-edit"
import { PrivateRoute } from "../components/private-route"

export const TodoApp = () => {
  const todos = useSelector((state) => state.todoModule.todos)
  const user = useSelector((state) => state.userModule.user)
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    ;(async () => {
      try {
        setIsLoading(true)
        await dispatch(loadTodos())
        setIsLoading(false)
      } catch (err) {
        console.error(err)
      }
    })()
  }, [])

  const createTodo = async (event) => {
    event.preventDefault()
    const form = new FormData(event.target)
    const todo = {
      description: form.get("description").trim(),
      byUserId: user.id,
      isCompleted: false
    }
    try {
      dispatch(addTodo(todo))
    } catch (err) {
      console.error(err)
    }
    event.target.reset()
  }

  const deleteTodo = async (todoId) => {
    try {
      dispatch(removeTodo(todoId))
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <section className='todos'>
      <View as='form' margin='3rem 0' onSubmit={createTodo}>
        <Flex direction='row' justifyContent='center'>
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
      <Heading level={2} textAlign='center'>
        Todos
      </Heading>
      {isLoading ? (
        <Loader />
      ) : (
        <TodoList todos={todos} deleteTodo={deleteTodo} />
      )}
      <Routes>
        <Route
          path=':todoId'
          element={<PrivateRoute element={<TodoEdit />} />}
        />
      </Routes>
    </section>
  )
}

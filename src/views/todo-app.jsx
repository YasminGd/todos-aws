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
import { TodoList } from "../components/todo-list"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { addTodo, loadTodos, removeTodo } from "../store/actions/todo.action"

export const TodoApp = ({ user }) => {
  const todos = useSelector((state) => state.todoModule.todos)
  const dispatch = useDispatch()

  useEffect(() => {
    try {
      dispatch(loadTodos())
    } catch (err) {
      console.error(err)
    }
  }, [])

  const createTodo = async (event) => {
    event.preventDefault()
    const form = new FormData(event.target)
    const todo = {
      title: form.get("title").trim(),
      description: form.get("description").trim(),
      byUserId: user.id,
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
      <Heading level={2}>Todos</Heading>
      <TodoList todos={todos} deleteTodo={deleteTodo} />
    </section>
  )
}

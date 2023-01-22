import "@aws-amplify/ui-react/styles.css"
import { Heading, Text } from "@aws-amplify/ui-react"
import { TodoList } from "../components/todo-list"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { addTodo, loadTodos } from "../store/actions/todo.action"
import { useState } from "react"
import { Route, Routes } from "react-router-dom"
import { TodoEdit } from "./todo-edit"
import { PrivateRoute } from "../components/private-route"
import { Loader } from "../components/loader"
import { AddTodo } from "../components/add-todo"

export const TodoApp = () => {
  const todos = useSelector((state) => state.todoModule.todos)
  const user = useSelector((state) => state.userModule.user)
  const [isLoading, setIsLoading] = useState(false)
  const [isCantGetTodos, setIsCantGetTodos] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    ;(async () => {
      try {
        setIsLoading(true)
        await dispatch(loadTodos())
        setIsLoading(false)
      } catch (err) {
        setIsLoading(false)
        setIsCantGetTodos(true)
      }
    })()
  }, [])

  const getBody = () => {
    if (isCantGetTodos)
      return (
        <Text textAlign='center'>
          Can't get todos, please try again at a later date.
        </Text>
      )
    if (todos) return <TodoList todos={todos} />
    if (isLoading) return <Loader />
  }

  const body = getBody()

  return (
    <section className='todos'>
      <AddTodo user={user} />
      <Heading level={2} textAlign='center'>
        Todos
      </Heading>
      {body}
      <Routes>
        <Route
          path=':todoId'
          element={<PrivateRoute element={<TodoEdit />} />}
        />
      </Routes>
    </section>
  )
}

import {
  Button,
  Card,
  Flex,
  InAppMessageDisplay,
  Text,
  TextAreaField,
  TextField,
  View,
} from "@aws-amplify/ui-react"
import { useEffect } from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { loadTodos, updateTodo } from "../store/actions/todo.action"

export const TodoEdit = () => {
  const { todoId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const todos = useSelector((state) => state.todoModule.todos)
  const [todo, setTodo] = useState(
    structuredClone(todos.find((todo) => todo.id === todoId))
  )

  useEffect(() => {
    if (!todo) navigate("/todo")
  }, [])

  const onGoBack = () => {
    navigate("/todo")
  }

  const handleChange = ({ target: { name, value } }) => {
    setTodo((prevState) => ({ ...prevState, [name]: value }))
  }

  const onUpdateTodo = () => {
    try {
      dispatch(updateTodo(todo))
      navigate("/todo")
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      {todo && (
        <View className='screen' onClick={onGoBack}>
          <Card
            className='todo-edit'
            width='400px'
            margin='auto'
            onClick={(ev) => ev.stopPropagation()}
          >
            <form onSubmit={onUpdateTodo}>
              <Text fontSize='20px' marginBottom='12px'>
                Edit Todo
              </Text>
              <TextAreaField
                label='Description'
                marginBottom='12px'
                name='description'
                value={todo.description}
                onChange={handleChange}
              />
              <Button type='submit' variation='primary'>
                Save
              </Button>
            </form>
          </Card>
        </View>
      )}
    </>
  )
}

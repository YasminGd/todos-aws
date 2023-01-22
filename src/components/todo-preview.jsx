import {
  Button,
  CheckboxField,
  Flex,
  Text,
  View,
} from "@aws-amplify/ui-react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import { removeTodo, updateTodo } from "../store/actions/todo.action"
import { Loader } from "./loader"

export const TodoPreview = ({ todo }) => {
  const [isRemoving, setIsRemoving] = useState(true)
  const dispatch = useDispatch()

  const onRemoveTodo = async (todoId) => {
    try {
      setIsRemoving(true)
      await dispatch(removeTodo(todoId))
    } catch (err) {
      setIsRemoving(false)
      toast.error("Can't delete todo")
    }
  }

  const onToggleCompleted = async () => {
    try {
      todo.isCompleted = !todo.isCompleted
      await dispatch(updateTodo(todo))
    } catch (err) {
      toast.error("Can't toggle completed")
    }
  }

  return (
    <Flex
      className='todo-preview'
      direction='row'
      justifyContent='space-between'
      alignItems='center'
      variation='elevated'
      backgroundColor='LightBlue'
      padding='6px 12px'
      borderRadius='5px'
    >
      <Flex alignItems='center' justifyContent='center'>
        <CheckboxField
          checked={todo.isCompleted}
          onChange={onToggleCompleted}
        />
        <Text as='span' textDecoration={todo.isCompleted ? "line-through" : ""}>
          {todo.description}
        </Text>
      </Flex>
      <Flex alignItems='center' justifyContent='center'>
        <Link to={`${todo.id}`}>
          <Button variation='link'>Edit todo</Button>
        </Link>
        <Button
          variation='link'
          onClick={() => onRemoveTodo(todo.id)}
          width='124px'
          height='40px'
        >
          {isRemoving ? <Loader /> : "Delete todo"}
        </Button>
      </Flex>
    </Flex>
  )
}

import { Button, CheckboxField, Flex, Text, View } from "@aws-amplify/ui-react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import { removeTodo, updateTodo } from "../store/actions/todo.action"
import { Loader } from "./loader"

export const TodoPreview = ({ todo }) => {
  const [isRemoving, setIsRemoving] = useState(false)
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
      borderRadius='5px'
      padding={{ base: "3px 6px", small: "6px 12px" }}
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
      <Flex
        alignItems='center'
        justifyContent='end'
        gap={{ base: "2px" }}
        minWidth='135px'
      >
        {todo.weather && (
          <Flex justifyContent='center' alignItems='center' wrap='wrap' gap='4px'>
            <Text>{todo.weather.cityName}</Text>
            <Text>{todo.weather.temprature}°C</Text>
            <Flex height='40px' width='40px' justifyContent='center' alignItems='center'>
              <img src={todo.weather.image} />
            </Flex>
          </Flex>
        )}
        <Link to={`${todo.id}`}>
          <Button
            variation='link'
            padding={{ base: "4px", small: "8px 16px" }}
            fontSize={{ base: "12px", small: "16px" }}
          >
            Edit todo
          </Button>
        </Link>
        <Button
          variation='link'
          onClick={() => onRemoveTodo(todo.id)}
          padding={{ base: "4px", small: "8px 16px" }}
          height={{ base: "26px", small: "40px" }}
          fontSize={{ base: "12px", small: "16px" }}
        >
          {isRemoving ? <Loader /> : "Delete todo"}
        </Button>
      </Flex>
    </Flex>
  )
}

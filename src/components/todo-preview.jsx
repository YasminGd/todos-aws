import { Button, Flex, Loader, Text, View } from "@aws-amplify/ui-react"
import { useState } from "react"
import { Link } from "react-router-dom"

export const TodoPreview = ({ todo, deleteTodo }) => {
  const [isDeleting, setIsDeleting] = useState(false)

  const onDeleteTodo = async (todoId) => {
    try {
      setIsDeleting(true)
      await deleteTodo(todoId)
    } catch (err) {
      console.error(err)
      setIsDeleting(false)
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
      <View>
        <Text as='strong' fontWeight={700} fontSize='18px'>
          {todo.title}
        </Text>
        <br />
        <Text as='span'>{todo.description}</Text>
      </View>
      <View>
        <Link to={`${todo.id}`}>
          <Button variation='link'>Edit todo</Button>
        </Link>
        <Button
          variation='link'
          onClick={() => onDeleteTodo(todo.id)}
          width='124px'
          height='40px'
        >
          {isDeleting ? <Loader /> : "Delete todo"}
        </Button>
      </View>
    </Flex>
  )
}

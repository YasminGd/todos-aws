import { Button, Flex, TextField, View } from "@aws-amplify/ui-react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"
import { addTodo } from "../store/actions/todo.action"
import { Loader } from "./loader"

export const AddTodo = ({ user }) => {
  const [isAdding, setIsAdding] = useState(false)
  const dispatch = useDispatch()

  const onAddTodo = async (event) => {
    event.preventDefault()
    const form = new FormData(event.target)
    if(!form.get("description")) {
      toast.info('Please provide a description')
      return
    }
    const todo = {
      description: form.get("description").trim(),
      byUserId: user.id,
      isCompleted: false,
    }
    try {
      setIsAdding(true)
      await dispatch(addTodo(todo))
      setIsAdding(false)
    } catch (err) {
      setIsAdding(false)
      toast.error("can't add todo")
    }
    event.target.reset()
  }

  return (
    <View className='add-todo' padding='0 12px'>
      <View as='form' margin='3rem auto' onSubmit={onAddTodo} maxWidth='600px' >
        <Flex direction='row' justifyContent='center'>
          <TextField
            name='description'
            placeholder='Todo Description'
            label='Todo Description'
            labelHidden
            variation='quiet'
            require
            flex={1}
          />
          <Button type='submit' variation='primary' height='42px' >
            {isAdding ? <Loader /> : "Create todo"}
          </Button>
        </Flex>
      </View>
    </View>
  )
}

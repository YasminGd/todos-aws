import { Flex, Heading, Text, Button } from "@aws-amplify/ui-react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { removeTodosFromState } from "../store/actions/todo.action"
import { logout } from "../store/actions/user.action"
import { Loader } from "./loader"

export const AppHeader = () => {
  const user = useSelector((state) => state.userModule.user)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const dispatch = useDispatch()

  const onLogout = async () => {
    try {
      setIsLoggingOut(true)
      await dispatch(logout())
      await dispatch(removeTodosFromState())
    } catch (err) {
      setIsLoggingOut(false)
      toast.error("Couldn't correctly log out")
    }
  }

  return (
    <Heading className='app-header' height='64px'padding='0 12px'>
      <Flex
        className='main-content'
        maxWidth='1100px'
        margin='auto'
        justifyContent='space-between'
        alignItems='center'
        height='100%'
      >
        <Text fontSize='24px' fontWeight='500'>
          Todoz
        </Text>
        <Flex alignItems='center'>
          {user && (
            <>
              <Text fontSize='18px' fontWeight='500' textAlign='center'>
                {user && `Hello ${user.username}`}
              </Text>
              <Button onClick={onLogout} width='112px' height='42px'>
                {isLoggingOut ? <Loader /> : "Log out"}
              </Button>
            </>
          )}
        </Flex>
      </Flex>
    </Heading>
  )
}

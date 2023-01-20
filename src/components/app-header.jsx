import { Flex, Heading, View, Text, Button } from "@aws-amplify/ui-react"
import { useDispatch, useSelector } from "react-redux"
import { removeTodosFromState } from "../store/actions/todo.action"
import { logout } from "../store/actions/user.action"

export const AppHeader = () => {
  const user = useSelector((state) => state.userModule.user)
  const dispatch = useDispatch()

  const onLogout = () => {
    try {
      dispatch(logout())
      dispatch(removeTodosFromState())
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <Heading className='app-header' height='64px'>
      <Flex
        className='main-content'
        maxWidth='1100px'
        margin='auto'
        justifyContent='space-between'
        alignItems='center'
        height='100%'
      >
        <Text fontSize='18px' fontWeight='500'>
          Todoz
        </Text>
        <Flex alignItems='center'>
          {user && (
            <>
              <Text fontSize='18px' fontWeight='500'>
                {user && `Hello ${user.username}`}
              </Text>
              <Button onClick={onLogout}>Log out</Button>
            </>
          )}
        </Flex>
      </Flex>
    </Heading>
  )
}

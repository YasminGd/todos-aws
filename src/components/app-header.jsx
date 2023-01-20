import { Flex, Heading, View, Text, Button } from "@aws-amplify/ui-react"

export const AppHeader = ({ user, signOut }) => {
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
          <Text fontSize='18px' fontWeight='500'>
            {user && `Hello ${user.username}`}
          </Text>
          <Button onClick={signOut}>Sign out</Button>
        </Flex>
      </Flex>
    </Heading>
  )
}

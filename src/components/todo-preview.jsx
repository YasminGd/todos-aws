import { Button, Card, Flex, Text, View } from "@aws-amplify/ui-react"

export const TodoPreview = ({ todo, deleteTodo }) => {
  return (
    <Flex
      className='todo-preview'
      key={todo.id}
      direction='row'
      justifyContent='space-between'
      alignItems='center'
      variation='elevated'
    >
      <View>
        <Text as='strong' fontWeight={700} fontSize='18px'>
          {todo.title}
        </Text>
        <br />
        <Text as='span'>{todo.description}</Text>
      </View>
      <View>
        <Button variation='link'>
          Edit todo
        </Button>
        <Button variation='link' onClick={() => deleteTodo(todo.id)}>
          Delete todo
        </Button>
      </View>
    </Flex>
  )
}

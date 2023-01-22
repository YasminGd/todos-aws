import { Flex, Grid, View } from "@aws-amplify/ui-react"
import { TodoPreview } from "./todo-preview"

export const TodoList = ({ todos }) => {
  return (
    <Flex
      maxWidth="1100px"
      margin="3rem auto"
      alignItems="stretch"
      direction="column"
      padding="0 12px"
    >
      {todos.map((todo) => (
        <TodoPreview key={todo.id} todo={todo} />
      ))}
    </Flex>
  )
}

import './App.css'
import "@aws-amplify/ui-react/styles.css"
import {
  withAuthenticator,
  Button,
  Heading,
  Image,
  View,
  Card,
} from "@aws-amplify/ui-react"
import { TodoApp } from './components/todo-app'


function App({ signOut }) {
  return (
    <View className="App">
      <TodoApp/>
      <Button onClick={signOut}>Sign Out</Button>
    </View>
  )
}

export default withAuthenticator(App)

import logo from './logo.svg'
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
import { Todos } from './components/todos'


function App({ signOut }) {
  return (
    <View className="App">
      <Todos/>
      <Button onClick={signOut}>Sign Out</Button>
    </View>
  )
}

export default withAuthenticator(App)

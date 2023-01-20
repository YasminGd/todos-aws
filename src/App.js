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
import { TodoApp } from './views/todo-app'
import { Route, Routes } from 'react-router-dom'
import { AppHeader } from './components/app-header'
import { Auth } from 'aws-amplify'
import { useEffect, useState } from 'react'

function App({ signOut }) {

  const [loggedinUser, setLoggedinUser] = useState(null)

  useEffect(() => {
    ; (async () => {
      const user = await Auth.currentUserInfo()
      setLoggedinUser(user)
    })()
  }, [])

  return (
    <View className="App">
      <AppHeader signOut={signOut} user={loggedinUser} />
      <Routes>
        <Route path="/*" element={<TodoApp user={loggedinUser} />} />
      </Routes>
    </View>
  )
}

export default withAuthenticator(App)

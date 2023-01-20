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
import { LoginSignup } from './views/login-signup'
import { PrivateRoute } from './components/private-route'

function App() {

  return (
    <View className="App">
      <AppHeader />
      <Routes>
        <Route path="/*" element={<PrivateRoute element={<TodoApp />} />} />
        <Route path="/user/:status" element={<LoginSignup />} />
      </Routes>
    </View>
  )
}

export default App

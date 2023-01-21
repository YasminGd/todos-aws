import './assets/styles/main.scss'
import { TodoApp } from './views/todo-app'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AppHeader } from './components/app-header'
import { Login } from './views/login'
import { PrivateRoute } from './components/private-route'
import { View } from '@aws-amplify/ui-react'
import { Signup } from './views/signup'

function App() {

  return (
    <View className="App">
      <AppHeader />
      <Routes>
        <Route path='/' element={<Navigate to='/todo' replace />} />
        <Route path="/todo/*" element={<PrivateRoute element={<TodoApp />} />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/user/signup" element={<Signup />} />
        {/* <Route path="/user/signup" element={<LoginSignup />} /> */}
      </Routes>
    </View>
  )
}

export default App
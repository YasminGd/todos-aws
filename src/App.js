import './assets/styles/main.scss'
import "react-toastify/dist/ReactToastify.css"
import { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { View } from '@aws-amplify/ui-react'
import { TodoApp } from './views/todo-app'
import { Login } from './views/login'
import { Signup } from './views/signup'
import { AppHeader } from './components/app-header'
import { PrivateRoute } from './components/private-route'


function App() {
  const [isRenderHeader, setIsRenderHeader] = useState(false)
  const location = useLocation()

  useEffect(() => {
    if (location.pathname.includes("/login") || location.pathname.includes("/signup")) setIsRenderHeader(false)
    else setIsRenderHeader(true)
  }, [location.pathname])

  return (
    <View className="App">
      <ToastContainer />
      {
        isRenderHeader && <AppHeader />
      }
      <Routes>
        <Route path='/' element={<Navigate to='/todo' replace />} />
        <Route path="/todo/*" element={<PrivateRoute element={<TodoApp />} />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/user/signup" element={<Signup />} />
      </Routes>
    </View>
  )
}

export default App
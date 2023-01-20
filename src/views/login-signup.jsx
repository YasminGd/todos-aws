import { View } from "@aws-amplify/ui-react"
import { useEffect } from "react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { NavLink, useNavigate, useParams } from "react-router-dom"
import { login, signup } from "../store/actions/user.action"
import { RegisterForm, LoginForm } from "../ui-components"

export const LoginSignup = () => {
  const [loginError, setLoginError] = useState('')
  const { status } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // const handleChange = ({ target: { name, value } }) => {
  //   setCredentials((prevState) => ({ ...prevState, [name]: value }))
  // }

  const handleSubmit = async (credentials) => {
    try {
      if (status === "login") await dispatch(login(credentials))
      else await dispatch(signup(credentials))
      navigate("/")
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <View className='login-signup' padding='64px 700px'> 
      {status === "login" && <LoginForm onSubmit={handleSubmit}/>}
      {status === "signup" && <RegisterForm onSubmit={handleSubmit}/>}
      {/* { loginError && <Text>{}</Text>} */}
    </View>
  )
}

import {
  Button,
  Flex,
  PasswordField,
  Text,
  TextField,
  View,
} from "@aws-amplify/ui-react"
import { useEffect } from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, useNavigate } from "react-router-dom"
import { Loader } from "../components/loader"
import { login } from "../store/actions/user.action"

export const Login = () => {
  const user = useSelector((state) => state.userModule.user)
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  })
  const [errorMassage, setErrorMassage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (user) navigate("/todo")
  }, [])

  const handleChange = ({ target: { name, value } }) => {
    setCredentials((prevState) => ({ ...prevState, [name]: value }))
  }

  const onAttemptLogin = async (ev) => {
    ev.preventDefault()
    try {
      setErrorMassage("")
      setIsLoading(true)
      await dispatch(login(credentials))
      navigate("/todo")
    } catch (err) {
      setIsLoading(false)
      setErrorMassage("Incorrect username or password")
    }
  }

  // const handleSubmitConfirm = async (ev) => {
  //   ev.preventDefault()
  //   await dispatch(
  //     confirmRegister({
  //       username: register("email").value,
  //       code: register("code").value,
  //     })
  //   )
  //   await dispatch(loadTodos(register("email").value))
  //   navigate("/dashboard")
  // }

  return (
    <Flex
      className='login'
      justifyContent='center'
      alignItems='center'
      flex='1'
    >
      <Flex direction='column'>
        <form onSubmit={onAttemptLogin}>
          <Text textAlign='center'>Log in</Text>
          <TextField
            name='username'
            value={credentials.username}
            onChange={handleChange}
            required
          />
          <PasswordField
            name='password'
            value={credentials.password}
            onChange={handleChange}
            required
          />
          <Button variation='primary' type='submit' height='42px' width='258px'>
            {isLoading ? <Loader /> : "Log in"}
          </Button>
        </form>
        {errorMassage ? <Text>{errorMassage}</Text> : <Text>&nbsp;</Text>}
        <NavLink className='already-have-account' to={"/user/signup"}>
          Sign up for an account
        </NavLink>
      </Flex>
    </Flex>
  )
}

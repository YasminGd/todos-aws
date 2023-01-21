import {
  Button,
  Flex,
  PasswordField,
  Text,
  TextField,
  EmailField,
} from "@aws-amplify/ui-react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, useNavigate } from "react-router-dom"
import { confirmEmail, signup } from "../store/actions/user.action"

export const Signup = () => {
  const user = useSelector((state) => state.userModule.user)
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    email: "",
    code: "",
  })
  const [isConfirming, setIsConfirming] = useState(false)
  const [errorMassage, setErrorMassage] = useState("")

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (user) navigate("/todo")
  }, [])

  const handleChange = ({ target: { name, value } }) => {
    setCredentials((prevState) => ({ ...prevState, [name]: value }))
  }

  const onAttemptSignup = async (ev) => {
    ev.preventDefault()
    if (isConfirming) {
      try {
        await dispatch(confirmEmail(credentials.username, credentials.code))
        navigate("/todo")
      } catch (err) {
        setErrorMassage("confirmation code is incorrect")
      }
    } else {
      try {
        await dispatch(signup(credentials))
        setIsConfirming(true)
      } catch (err) {
        setErrorMassage("can't sign up")
      }
    }
  }

  return (
    <Flex
      className='signup'
      justifyContent='center'
      alignItems='center'
      flex='1'
    >
      <Flex direction='column'>
        <form onSubmit={onAttemptSignup}>
          {isConfirming ? (
            <>
              <Text textAlign='center'>
                Please enter the confirmation code you received in the mail
              </Text>
              <TextField
                name='code'
                value={credentials.code}
                onChange={handleChange}
                label='code'
                required
              />
            </>
          ) : (
            <>
              <Text textAlign='center'>Sign up</Text>
              <TextField
                name='username'
                value={credentials.username}
                onChange={handleChange}
                label='Username'
                required
              />
              <TextField
                name='email'
                value={credentials.email}
                onChange={handleChange}
                label='Email'
                required
              />
              <PasswordField
                name='password'
                value={credentials.password}
                onChange={handleChange}
                label='Password'
                required
              />
            </>
          )}
          <Button variation='primary' type='submit'>
            Sign up
          </Button>
        </form>
        {errorMassage ? <Text>{errorMassage}</Text> : <Text>&nbsp;</Text>}
        <NavLink className='already-have-account' to={"/user/login"}>
          Already have an account? Log In
        </NavLink>
      </Flex>
    </Flex>
  )
}

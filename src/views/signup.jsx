import {
  Button,
  Flex,
  PasswordField,
  Text,
  TextField,
} from "@aws-amplify/ui-react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, useNavigate } from "react-router-dom"
import { Loader } from "../components/loader"
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
  const [isLoading, setIsLoading] = useState(false)

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
    setIsLoading(true)
    if (isConfirming) {
      try {
        await dispatch(confirmEmail(credentials.username, credentials.code))
        navigate("/todo")
      } catch (err) {
        setIsLoading(false)
        setErrorMassage("confirmation code is incorrect")
      }
    } else {
      try {
        await dispatch(signup(credentials))
        setIsConfirming(true)
        setIsLoading(false)
        setErrorMassage("")
      } catch (err) {
        setIsLoading(false)
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
      <Flex direction='column' width='258px'>
        <Text textAlign='center' fontSize='32px' fontWeight={600}>
          Todoz
        </Text>
        <form onSubmit={onAttemptSignup}>
          {isConfirming ? (
            <>
              <Text textAlign='center' fontSize='20px'>
                Please enter the confirmation code you received in the mail
              </Text>
              <TextField
                name='code'
                value={credentials.code}
                onChange={handleChange}
                label='code'
                required
              />
              <Button variation='primary' type='submit' height='42px'>
                {isLoading ? <Loader /> : "Enter code"}
              </Button>
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
                placeholder='enter a username'
              />
              <TextField
                name='email'
                value={credentials.email}
                onChange={handleChange}
                label='Email'
                required
                placeholder='enter an email address'
              />
              <PasswordField
                name='password'
                value={credentials.password}
                onChange={handleChange}
                label='Password'
                required
                placeholder='enter a password'
              />
              <Button variation='primary' type='submit' height='42px'>
                {isLoading ? <Loader /> : "Sign up"}
              </Button>
            </>
          )}
        </form>
        {errorMassage ? <Text>{errorMassage}</Text> : <Text>&nbsp;</Text>}
        <NavLink className='already-have-account' to={"/user/login"}>
          Already have an account? Log In
        </NavLink>
      </Flex>
    </Flex>
  )
}

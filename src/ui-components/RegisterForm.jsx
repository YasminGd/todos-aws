/* eslint-disable */
import * as React from "react"
import { fetchByPath, validateField } from "./utils"
import { getOverrideProps } from "@aws-amplify/ui-react/internal"
import {
  Button,
  Flex,
  Grid,
  PasswordField,
  TextField,
} from "@aws-amplify/ui-react"
import { NavLink } from "react-router-dom"
export default function RegisterForm(props) {
  const { onSubmit, onCancel, onValidate, onChange, overrides, ...rest } = props
  const initialValues = {
    username: "",
    email: "",
    password: undefined,
  }
  const [username, setUsername] = React.useState(initialValues.username)
  const [email, setEmail] = React.useState(initialValues.email)
  const [password, setPassword] = React.useState(initialValues.password)
  const [errors, setErrors] = React.useState({})
  const resetStateValues = () => {
    setUsername(initialValues.username)
    setEmail(initialValues.email)
    setPassword(initialValues.password)
    setErrors({})
  }
  const validations = {
    username: [],
    email: [{ type: "Email" }],
    password: [],
  }
  const runValidationTasks = async (fieldName, value) => {
    let validationResponse = validateField(value, validations[fieldName])
    const customValidator = fetchByPath(onValidate, fieldName)
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse)
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }))
    return validationResponse
  }
  return (
    <Grid
      as='form'
      rowGap='15px'
      columnGap='15px'
      padding='20px'
      onSubmit={async (event) => {
        event.preventDefault()
        const modelFields = {
          username,
          email,
          password,
        }
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              )
              return promises
            }
            promises.push(runValidationTasks(fieldName, modelFields[fieldName]))
            return promises
          }, [])
        )
        if (validationResponses.some((r) => r.hasError)) {
          return
        }
        await onSubmit(modelFields)
      }}
      {...getOverrideProps(overrides, "MyForm")}
      {...rest}
    >
      <TextField
        label='Username'
        value={username}
        onChange={(e) => {
          let { value } = e.target
          if (onChange) {
            const modelFields = {
              username: value,
              email,
              password,
            }
            const result = onChange(modelFields)
            value = result?.username ?? value
          }
          if (errors.username?.hasError) {
            runValidationTasks("username", value)
          }
          setUsername(value)
        }}
        onBlur={() => runValidationTasks("username", username)}
        errorMessage={errors.username?.errorMessage}
        hasError={errors.username?.hasError}
        {...getOverrideProps(overrides, "username")}
      ></TextField>
      <TextField
        label='Email'
        value={email}
        onChange={(e) => {
          let { value } = e.target
          if (onChange) {
            const modelFields = {
              username,
              email: value,
              password,
            }
            const result = onChange(modelFields)
            value = result?.email ?? value
          }
          if (errors.email?.hasError) {
            runValidationTasks("email", value)
          }
          setEmail(value)
        }}
        onBlur={() => runValidationTasks("email", email)}
        errorMessage={errors.email?.errorMessage}
        hasError={errors.email?.hasError}
        {...getOverrideProps(overrides, "email")}
      ></TextField>
      <PasswordField
        label='Password'
        onChange={(e) => {
          let { value } = e.target
          if (onChange) {
            const modelFields = {
              username,
              email,
              password: value,
            }
            const result = onChange(modelFields)
            value = result?.password ?? value
          }
          if (errors.password?.hasError) {
            runValidationTasks("password", value)
          }
          setPassword(value)
        }}
        onBlur={() => runValidationTasks("password", password)}
        errorMessage={errors.password?.errorMessage}
        hasError={errors.password?.hasError}
        {...getOverrideProps(overrides, "password")}
      ></PasswordField>
      <Flex
        justifyContent='space-between'
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children='Clear'
          type='reset'
          onClick={(event) => {
            event.preventDefault()
            resetStateValues()
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap='15px'
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children='Cancel'
            type='button'
            onClick={() => {
              onCancel && onCancel()
            }}
            {...getOverrideProps(overrides, "CancelButton")}
          ></Button>
          <Button
            children='Submit'
            type='submit'
            variation='primary'
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
      <NavLink className='already-have-account' to={"/user/login"}>
        Already have an account? Log In
      </NavLink>
    </Grid>
  )
}

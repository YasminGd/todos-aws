/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react"
import {
  Button,
  Flex,
  Grid,
  Heading,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react"
import { getOverrideProps } from "@aws-amplify/ui-react/internal"
import { fetchByPath, validateField } from "./utils"
export default function ConfirmForm(props) {
  const { onSubmit, onValidate, onChange, overrides, ...rest } = props
  const { tokens } = useTheme()
  const initialValues = {
    Field0: "",
  }
  const [Field0, setField0] = React.useState(initialValues.Field0)
  const [errors, setErrors] = React.useState({})
  const resetStateValues = () => {
    setField0(initialValues.Field0)
    setErrors({})
  }
  const validations = {
    Field0: [{ type: "Required" }],
  }
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value = getDisplayValue ? getDisplayValue(currentValue) : currentValue
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
      rowGap={tokens.space.large.value}
      columnGap={tokens.space.medium.value}
      padding={tokens.space.medium.value}
      onSubmit={async (event) => {
        event.preventDefault()
        const modelFields = {
          Field0,
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
      {...getOverrideProps(overrides, "ConfirmForm")}
      {...rest}
    >
      <Heading
        level={4}
        children='Please enter your varfication code'
        {...getOverrideProps(overrides, "SectionalElement0")}
      ></Heading>
      <TextField
        label='Code'
        isRequired='true'
        value={Field0}
        onChange={(e) => {
          let { value } = e.target
          if (onChange) {
            const modelFields = {
              Field0: value,
            }
            const result = onChange(modelFields)
            value = result?.Field0 ?? value
          }
          if (errors.Field0?.hasError) {
            runValidationTasks("Field0", value)
          }
          setField0(value)
        }}
        onBlur={() => runValidationTasks("Field0", Field0)}
        errorMessage={errors.Field0?.errorMessage}
        hasError={errors.Field0?.hasError}
        {...getOverrideProps(overrides, "Field0")}
      ></TextField>
      <Flex
        justifyContent='space-between'
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Flex
          gap={tokens.space.medium.value}
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children='Submit'
            type='submit'
            variation='primary'
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  )
}

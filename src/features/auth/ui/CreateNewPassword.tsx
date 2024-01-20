import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { Input } from "../../../common/components/input/Input"
import { InputType } from "../../../common/components/enums/enums"
import { DefaultButton } from "../../../common/components/button/DefaultButton"
import { FormContainer } from "../../../common/components/form/FormContainer"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useEffect, useState } from "react"
import { useCreateNewPasswordMutation } from "../auth.api"
import { PasswordRecoveryType, RegisterType } from "../auth.types"
import { Loader } from "../../../common/components/loaders/CircularLoader"
import { Error } from "../../../common/components/error/Error"
import { useNavigate, useParams } from "react-router-dom"
import { Modal } from "../../../common/components/modal/Modal"

interface IFormProps {
  password: string
  passwordConfirmation: string
}

const formSchema = yup.object().shape({
  password: yup.string()
    .required("Password is required")
    .matches(/^[A-Za-z]+$/i, "Password must contain just latin letters")
    .min(4, "Password length should be at least 4 characters")
    .max(64, "Password cannot exceed more than 64 characters"),
  passwordConfirmation: yup.string()
    .required("Confirm Password is required")
    .min(4, "Password length should be at least 4 characters")
    .max(64, "Password cannot exceed more than 64 characters")
    .oneOf([yup.ref("password")], "Passwords do not match"),
})

export const CreateNewPassword = () => {
  const { passwordRecoveryCode, email } = useParams()
  const [success, setSuccess] = useState(false)
  const [open, setOpen] = useState(true)
  const [recoveryCode, setRecoveryCode] = useState('')
  const [serverError, setServerError] = useState('')
  const [createNewPassword, { isLoading }] = useCreateNewPasswordMutation()
  const navigate = useNavigate()

  useEffect(() => {
    if (passwordRecoveryCode) setRecoveryCode(recoveryCode as string)
  }, [passwordRecoveryCode])

  const {
    handleSubmit, 
    formState: { errors },
    clearErrors,
    watch, 
    reset,
    control,
  } = useForm<IFormProps>({
    mode: "onChange",
    defaultValues: {
      password: '',
      passwordConfirmation: '',
    },
    resolver: yupResolver(formSchema),
  })
  watch('password', '')

  const onSubmit: SubmitHandler<any> = (data: PasswordRecoveryType) => { 
    if (!data) {
      setServerError('Some error occured123')
    } else {
      data.email = email
      setServerError('')
      console.log()
      createNewPassword(data)
        .unwrap()
        .then(() => {
          setSuccess(true)
          reset()
        })
        .catch(e => {
          console.log(e)
          if (e.status === 'FETCH_ERROR') setServerError('There is no connection to the server. Please, try later')
          if (e.status === 400) setServerError(e.data.message)
          if (e.status === 401) setServerError(e.data.message)
        })
    }
  }
  
  return (
    <>
      {isLoading && <Loader />}
      {serverError && <Error error={serverError} />}
      {success && 
        <Modal
          text={`Now go to login page`}
          open={open}
          setOpen={setOpen}
          outlinedButton={true}
          buttonName="Login"
          buttonCallback={() => navigate('/login')}
        />
      }
      <FormContainer serverError={serverError}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name="password"
            render={({ field: { ref, value, onChange } }) => (
              <Input 
                type={InputType.PASSWORD}
                label="Password"
                error={errors.password?.message}
                placeholder={"Enter password"}
                ref={ref}
                value={value}
                onFocus={() => {
                  clearErrors('password')
                  setServerError('')
                }}
                onChange={onChange}
              />
            )}
          />
      
          <Controller
            control={control}
            name="passwordConfirmation"
            render={({ field: { value, ref, onBlur, onChange } }) => (
              <Input 
                type={InputType.PASSWORD}
                label="Password confirmation"
                error={errors.passwordConfirmation?.message}
                placeholder={"Enter password confirmation"}
                ref={ref}
                value={value}
                onFocus={() => {
                  clearErrors('passwordConfirmation')
                  setServerError('')
                }}
                onChange={onChange}
              />
            )}
          />

          <DefaultButton
            error={errors.passwordConfirmation}
            name="Submit"
            type="submit"
          />
        </form>
      </FormContainer>
    </>
  )
}
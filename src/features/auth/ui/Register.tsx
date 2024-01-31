import { useForm, SubmitHandler, Controller } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { RegisterType } from "../auth.types"
import { useSignUpMutation } from "../auth.api"
import { useState } from "react"
import { Loader } from "../../../common/components/loaders/CircularLoader"
import { DefaultButton } from "../../../common/components/button/DefaultButton"
import { Error } from "../../../common/components/error/Error"
import { GoTo } from "../../../common/components/goTo/GoTo"
import { Input } from "../../../common/components/input/Input"
import { InputType } from "../../../common/components/enums/enums"
import { FormContainer } from "../../../common/components/form/FormContainer"
import { Modal } from "../../../common/components/modal/Modal"
import { useNavigate } from "react-router-dom"

interface IFormProps {
  email: string
  password: string
  passwordConfirmation: string
}

const formSchema = yup.object().shape({
  email: yup.string()
    .required("Email is required")
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Email must be an email"),
  password: yup.string()
    .required("Password is required")
    .matches(/^[A-Za-z]+$/i, "Password must contain just latin letters")
    .min(4, "Password length should be at least 4 characters")
    .max(64, "Password cannot exceed more than 64 characters"),
  passwordConfirmation: yup.string()
    .required("Confirm Password is required")
    .min(4, "Password length should be at least 4 characters")
    .max(64, "Password cannot exceed more than 64 characters")
    .oneOf([yup.ref("password")], "Passwords do not match")
})

export const Register = () => {
  const [signUp, { error, isLoading }] = useSignUpMutation()
  const [serverError, setServerError] = useState('')
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const back = () => navigate('/')

  const handleOpenModal = () => setOpen(false)

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
      email: '',
      password: '',
      passwordConfirmation: '',
    },
    resolver: yupResolver(formSchema),
  })
  watch('password', '')

  const onSubmit: SubmitHandler<RegisterType> = (data: RegisterType) => { 
    setServerError('')
    signUp(data)
      .unwrap()
      .then(() => {
        setOpen(true)
        reset()
      })
      .catch(e => {
        if (e.status === 'FETCH_ERROR') setServerError('There is no connection to the server. Please, try later')
        if (e.status === 400) setServerError(e.data.message)
        if (e.status === 401) setServerError(e.data.message)
      })
  }

  return (
    <>
      {isLoading && <Loader />}
      {serverError && <Error error={serverError} />}
      {open && 
        <Modal
          open={open}
          setOpen={handleOpenModal}
          text="We've sent you a link to verify your email. Check your mail, please"
          buttonName='Yes'
          buttonCallback={back}
          outlinedButton={true}
        />
      }
      <FormContainer serverError={serverError}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name="email"
            render={({ field: { ref, value, onChange } }) => (
              <Input 
                type={InputType.TEXT}
                label="Email"
                error={errors.email?.message}
                placeholder={"Enter email"}
                ref={ref}
                value={value}
                onFocus={() => {
                  clearErrors('email')
                  setServerError('')
                }}
                onChange={onChange}
              />
            )}
          />

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
            name="Register"
            type="submit"
          />
        </form>

        <GoTo
          text="If you already have an account, go to login page"
          address={"/login"}
          name="Login"
        />
      </FormContainer>
    </>
  )
}
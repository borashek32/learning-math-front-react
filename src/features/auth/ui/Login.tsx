import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { useLoginMutation } from "../auth.api"
import { useNavigate } from "react-router-dom"
import { RegisterType } from "../auth.types"
import { useState } from "react"
import * as yup from "yup"
import styles from './Auth.module.sass'
import { yupResolver } from "@hookform/resolvers/yup"
import { Loader } from "../../../common/components/loaders/CircularLoader"
import { DefaultButton } from "../../../common/components/button/DefaultButton"
import { Error } from "../../../common/components/error/Error"
import { GoTo } from "../../../common/components/goTo/GoTo"
import { Input } from "../../../common/components/input/Input"
import { InputType } from "../../../common/components/enums/enums"

const formSchema = yup.object().shape({
  email: yup.string()
    .required("Email is required")
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Email must be an email"),
  password: yup.string()
    .required("Password is required")
    .min(4, "Password length should be at least 4 characters"),
})

export const Login = () => {
  const [login, { error, isLoading }] = useLoginMutation()
  const [serverError, setServerError] = useState('')
  const navigate = useNavigate()

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm<RegisterType>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
    resolver: yupResolver(formSchema)
  })

  const onSubmit: SubmitHandler<RegisterType> = (data: RegisterType) => {
    setServerError('')
    login(data)
      .unwrap()
      .then(response => {
        reset()
        const accessToken = response.accessToken
        localStorage.setItem('accessToken', accessToken)
        navigate('/home')
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
      
      <form
        style={serverError ? { marginTop: '-13px' } : {}}
        className={styles.formWrapper}
        onSubmit={handleSubmit(onSubmit)}
      >
        {serverError && <Error error={serverError} />}

        <Controller
          control={control}
          name="email"
          render={({ field: { ref, value, onChange } }) => (
            <Input 
              type={InputType.TEXT}
              label="Email"
              error={errors.email?.message}
              placeholder="Enter email"
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

        <DefaultButton 
          error={errors.password}
          name="Login"
          type="submit"
        />

        <GoTo
          text="If you don't have an account, go to registration page"
          address={"/register"}
          name="Registration"
        />
      </form>
    </>
  )
}
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { ForgotPasswordType } from "../auth.types"
import { useState } from "react"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { Loader } from "../../../common/components/loaders/CircularLoader"
import { DefaultButton } from "../../../common/components/button/DefaultButton"
import { Error } from "../../../common/components/error/Error"
import { Input } from "../../../common/components/input/Input"
import { InputType } from "../../../common/components/enums/enums"
import { FormContainer } from "../../../common/components/form/FormContainer"
import { useEmailSentMutation } from "../auth.api"
import { Modal } from "../../../common/components/modal/Modal"
import { GoTo } from "../../../common/components/goTo/GoTo"

const formSchema = yup.object().shape({
  email: yup.string()
    .required("Email is required")
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Email must be an email"),
})

export const ForgotPassword = () => {
  const [success, setSuccess] = useState(false)
  const [email, setEmail] = useState('')
  const [emailSent, { isLoading }] = useEmailSentMutation()
  const [serverError, setServerError] = useState('')
  const [open, setOpen] = useState(true)

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm<ForgotPasswordType>({
    defaultValues: {
      email: '',
    },
    mode: 'onChange',
    resolver: yupResolver(formSchema)
  })

  const onSubmit: SubmitHandler<ForgotPasswordType> = (data: ForgotPasswordType) => {
    emailSent(data)
      .unwrap()
      .then(res => {
        setSuccess(true)
        setEmail(data.email)
        reset()
      })
      .catch(error => {
        console.error('error frontend', error)
        if (error.status === 400) setServerError(error.data.message)
      })
  }

  return (
    <>
      {isLoading && <Loader />}
      {serverError && <Error error={serverError} />}   
      {success && 
        <Modal
          text={`Please, check ${email}`}
          open={open}
          setOpen={setOpen}
          outlinedButton={true}
        />
      }
      <GoTo address="/login" name="Back to Login" />
      <FormContainer serverError={serverError}>
        <form 
          style={serverError ? { marginTop: '-13px', width: '200px' } : {width: '200px'}}
          onSubmit={handleSubmit(onSubmit)}
        >
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

          <DefaultButton 
            error={errors.email}
            name="Send"
            type="submit"
          />
        </form>
      </FormContainer> 
    </>
  )
}
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { Input } from "../../../common/components/input/Input"
import { InputType } from "../../../common/components/enums/enums"
import { DefaultButton } from "../../../common/components/button/DefaultButton"
import { FormContainer } from "../../../common/components/form/FormContainer"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useState } from "react"
import { useChangePasswordMutation } from "../auth.api"
import { Loader } from "../../../common/components/loaders/CircularLoader"
import { Error } from "../../../common/components/error/Error"
import { useNavigate } from "react-router-dom"
import { Modal } from "../../../common/components/modal/Modal"
import { NewPasswordType } from "./../auth.types"
import { useSelector } from "react-redux"
import { selectUserId } from "../auth.selectors"

interface IFormProps {
  password: string
  newPassword: string
  newPasswordConfirmation: string
}

const formSchema = yup.object().shape({
  password: yup.string()
    .required("Password is required")
    .matches(/^[A-Za-z]+$/i, "Password must contain just latin letters")
    .min(4, "Password length should be at least 4 characters")
    .max(64, "Password cannot exceed more than 64 characters"),
  newPassword: yup.string()
    .required("Password is required")
    .matches(/^[A-Za-z]+$/i, "Password must contain just latin letters")
    .min(4, "Password length should be at least 4 characters")
    .max(64, "Password cannot exceed more than 64 characters"),
  newPasswordConfirmation: yup.string()
    .required("Confirm Password is required")
    .min(4, "Password length should be at least 4 characters")
    .max(64, "Password cannot exceed more than 64 characters")
    .oneOf([yup.ref("newPassword")], "New passwords do not match"),
})

export const ChangePassword = () => {
  const [changePassword, { isLoading, error }] = useChangePasswordMutation()
  const [success, setSuccess] = useState(false)
  const [open, setOpen] = useState(true)
  const [serverError, setServerError] = useState('')
  const navigate = useNavigate()
  const userId = useSelector(selectUserId)

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
      newPassword: '',
      newPasswordConfirmation: '',
    },
    resolver: yupResolver(formSchema),
  })
  watch('password', '')

  const onSubmit: SubmitHandler<any> = (data: NewPasswordType) => { 
    if (!data) {
      setServerError('Some error occured')
    } else {
      setServerError('')
      changePassword({ ...data, userId })
        .unwrap()
        .then(() => {
          setSuccess(true)
          reset()
        })
        .catch(e => {
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
          text={`Your password changed successfully`}
          open={open}
          setOpen={setOpen}
          outlinedButton={true}
          buttonName="Back"
          buttonCallback={() => navigate('/home/profile')}
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
                label="Your old password"
                error={errors.password?.message}
                placeholder={"Enter your old password"}
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
            name="newPassword"
            render={({ field: { ref, value, onChange } }) => (
              <Input 
                type={InputType.PASSWORD}
                label="New password"
                error={errors.newPassword?.message}
                placeholder={"Enter new password"}
                ref={ref}
                value={value}
                onFocus={() => {
                  clearErrors('newPassword')
                  setServerError('')
                }}
                onChange={onChange}
              />
            )}
          />
      
          <Controller
            control={control}
            name="newPasswordConfirmation"
            render={({ field: { value, ref, onChange } }) => (
              <Input 
                type={InputType.PASSWORD}
                label="New password confirmation"
                error={errors.newPasswordConfirmation?.message}
                placeholder={"Enter new password confirmation"}
                ref={ref}
                value={value}
                onFocus={() => {
                  clearErrors('newPasswordConfirmation')
                  setServerError('')
                }}
                onChange={onChange}
              />
            )}
          />

          <DefaultButton
            error={errors.newPasswordConfirmation}
            name="Submit"
            type="submit"
          />
        </form>
      </FormContainer>
    </>
  )
}
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { Input } from "../../../common/components/input/defaultInput/Input"
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
import { GoTo } from "../../../common/components/goTo/GoTo"
import { useTranslation } from "react-i18next"
import styles from "./../Auth.module.sass"

interface IFormProps {
  password: string
  newPassword: string
  newPasswordConfirmation: string
}

export const ChangePassword = () => {
  const [changePassword, { isLoading, error }] = useChangePasswordMutation()
  const [success, setSuccess] = useState(false)
  const [open, setOpen] = useState(true)
  const [serverError, setServerError] = useState('')
  const navigate = useNavigate()
  const userId = useSelector(selectUserId)

  const { t } = useTranslation()

  const formSchema = yup.object().shape({
    password: yup.string()
      .required(t('errors.required'))
      .matches(/^[A-Za-z]+$/i, t('errors.latinLetters')),
    newPassword: yup.string()
      .required(t('errors.required'))
      .matches(/^[A-Za-z]+$/i, t('errors.latinLetters'))
      .min(4, t('errors.min'))
      .max(64, t('errors.max')),
    newPasswordConfirmation: yup.string()
      .required(t('errors.required'))
      .min(4, t('errors.min'))
      .max(64, t('errors.max'))
      .oneOf([yup.ref("newPassword")], t('errors.notMatch')),
  })

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
      const someE = t('errors.someError')
      setServerError(someE)
    } else {
      setServerError('')
      changePassword({ ...data, userId })
        .unwrap()
        .then(() => {
          setSuccess(true)
          reset()
        })
        .catch(e => {
          const serverE = t('errors.serverError')
          if (e.status === 'FETCH_ERROR') setServerError(serverE)
          const error400 = t('errors.error400')
          if (e.status === 400) setServerError(error400)
          if (e.status === 401) setServerError(error400)
        })
    }
  }
  
  return (
    <>
      {isLoading && <Loader />}
      {serverError && 
        <div className={styles.errorWrapper}>
          <Error error={serverError} />
        </div>
      }
      {success && 
        <Modal
          text={t("modal.success")}
          open={open}
          setOpen={setOpen}
          outlinedButton={true}
          buttonName={t('links.back')}
          buttonCallback={() => navigate('/home/profile')}
          buttonBack={false}
        />
      }
      <GoTo address="/home/profile" name={t('links.back')} />
      <FormContainer serverError={serverError}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name="password"
            render={({ field: { ref, value, onChange } }) => (
              <Input 
                type={InputType.PASSWORD}
                label={t("auth.changePassword.inputs.password.label")}
                error={errors.password?.message}
                placeholder={t("auth.changePassword.inputs.password.placeholder")}
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
                label={t("auth.changePassword.inputs.newPassword.label")}
                error={errors.newPassword?.message}
                placeholder={t("auth.changePassword.inputs.newPassword.placeholder")}
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
                label={t("auth.changePassword.inputs.newPasswordConfirmation.label")}
                error={errors.newPasswordConfirmation?.message}
                placeholder={t("auth.changePassword.inputs.newPasswordConfirmation.placeholder")}
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
            name={t('buttons.submit')}
            type="submit"
          />
        </form>
      </FormContainer>
    </>
  )
}
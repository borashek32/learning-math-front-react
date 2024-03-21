import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { Input } from "../../../common/components/input/defaultInput/Input"
import { InputType } from "../../../common/components/enums/enums"
import { DefaultButton } from "../../../common/components/buttons/DefaultButton"
import { FormContainer } from "../../../common/components/form/FormContainer"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useEffect, useState } from "react"
import { useSaveNewPasswordMutation } from "../auth.api"
import { PasswordRecoveryType } from "../auth.api.types"
import { Loader } from "../../../common/components/loaders/CircularLoader"
import { Error } from "../../../common/components/error/Error"
import { useNavigate, useParams } from "react-router-dom"
import { Modal } from "../../../common/components/modal/Modal"
import { useTranslation } from "react-i18next"
import styles from "./../Auth.module.sass"
import { Header } from "../../../common/components/header/Header"

interface IFormProps {
  password: string
  passwordConfirmation: string
}

export const CreateNewPassword = () => {
  const { passwordRecoveryCode, email } = useParams()
  const [success, setSuccess] = useState(false)
  const [open, setOpen] = useState(true)
  const [recoveryCode, setRecoveryCode] = useState('')
  const [serverError, setServerError] = useState('')
  const [createNewPassword, { isLoading }] = useSaveNewPasswordMutation()
  const navigate = useNavigate()

  const { t } = useTranslation()

  const formSchema = yup.object().shape({
    password: yup.string()
      .required(t('errors.required'))
      .matches(/^[A-Za-z]+$/i, t('errors.latinLetters'))
      .min(4, t('errors.min'))
      .max(64, t('errors.max')),
    passwordConfirmation: yup.string()
      .required(t('errors.required'))
      .min(4, t('errors.min'))
      .max(64, t('errors.max'))
      .oneOf([yup.ref("passwordConfirmation")], t('errors.notMatch')),
  })

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
      createNewPassword(data)
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
          text={t('modal.success')}
          open={open}
          setOpen={setOpen}
          outlinedButton={true}
          buttonName={t('auth.links.login')}
          buttonCallback={() => navigate('/login')}
          buttonBack={true}
        />
      }
      <FormContainer serverError={serverError}>
        <Header title={t('screens.createNewPassword')} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name="password"
            render={({ field: { ref, value, onChange } }) => (
              <Input 
                type={InputType.PASSWORD}
                label={t("auth.changePassword.inputs.newPassword.label")}
                error={errors.password?.message}
                placeholder={t("auth.changePassword.inputs.newPassword.placeholder")}
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
            render={({ field: { value, ref, onChange } }) => (
              <Input 
                type={InputType.PASSWORD}
                label={t("auth.changePassword.inputs.newPasswordConfirmation.label")}
                error={errors.passwordConfirmation?.message}
                placeholder={t("auth.changePassword.inputs.newPasswordConfirmation.placeholder")}
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
            name={t('buttons.submit')}
            type="submit"
          />
        </form>
      </FormContainer>
    </>
  )
}
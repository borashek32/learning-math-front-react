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
import { Input } from "../../../common/components/input/defaultInput/Input"
import { InputType } from "../../../common/components/enums/enums"
import { FormContainer } from "../../../common/components/form/FormContainer"
import { Modal } from "../../../common/components/modal/Modal"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import styles from "./../Auth.module.sass"

interface IFormProps {
  email: string
  password: string
  passwordConfirmation: string
}

export const Register = () => {
  const [signUp, { error, isLoading }] = useSignUpMutation()
  const [serverError, setServerError] = useState('')
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const { t } = useTranslation()

  const formSchema = yup.object().shape({
    email: yup.string()
      .required(t('errors.required'))
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, t('errors.mustBeEmail')),
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
        console.log(e)
        // setServerError(e.data.message)
        const serverE = t('errors.serverError')
        if (e.status === 'FETCH_ERROR') setServerError(serverE)
        const error400 = t('errors.error400')
        if (e.status === 400) setServerError(error400)
        if (e.status === 401) setServerError(error400)
      })
  }

  return (
    <>
      {isLoading && <Loader />}
      {serverError && 
        <div className={styles.errorWrapper}>
          <Error error={serverError} />
        </div>
      }
      {open && 
        <Modal
          open={open}
          setOpen={handleOpenModal}
          text={t('modal.linkSent')}
          buttonName='Ok'
          buttonCallback={back}
          outlinedButton={true}
          buttonBack={true}
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
                label={t('auth.register.inputs.email.label')}
                error={errors.email?.message}
                placeholder={t('auth.register.inputs.email.placeholder')}
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
                label={t('auth.register.inputs.password.label')}
                error={errors.password?.message}
                placeholder={t('auth.register.inputs.password.placeholder')}
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
                label={t("auth.register.inputs.passwordConfirmation.label")}
                error={errors.passwordConfirmation?.message}
                placeholder={t("auth.register.inputs.passwordConfirmation.placeholder")}
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
            name={t('buttons.register')}
            type="submit"
          />
        </form>

        <GoTo
          text={t('auth.register.note')}
          address={"/login"}
          name={t('buttons.login')}
        />
      </FormContainer>
    </>
  )
}
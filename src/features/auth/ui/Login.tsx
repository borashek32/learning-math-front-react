import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { useLoginMutation } from "../auth.api"
import { useNavigate } from "react-router-dom"
import { RegisterType } from "../auth.types"
import { useState } from "react"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { Loader } from "../../../common/components/loaders/CircularLoader"
import { DefaultButton } from "../../../common/components/button/DefaultButton"
import { Error } from "../../../common/components/error/Error"
import { GoTo } from "../../../common/components/goTo/GoTo"
import { Input } from "../../../common/components/input/defaultInput/Input"
import { InputType } from "../../../common/components/enums/enums"
import { FormContainer } from "../../../common/components/form/FormContainer"
import { Note } from "../../../common/components/note/Note"
import { useDispatch } from "react-redux"
import { setUserInfo } from "../auth.slice"
import { useTranslation } from "react-i18next"
import styles from "./../Auth.module.sass"

export const Login = () => {
  const [login, { isLoading }] = useLoginMutation()
  const [serverError, setServerError] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { t } = useTranslation()

  const formSchema = yup.object().shape({
    email: yup.string()
      .required(t('errors.required'))
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, t('errors.mustBeEmail')),
    password: yup.string()
      .required(t('errors.required'))
      .min(4, t('errors.min')),
  })

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
        if (response.user) {
          dispatch(setUserInfo(response.user))
          navigate('/home')
        }
      })
      .catch((e: any) => {
        console.log(e)
        setServerError(e.data.message)
        // const serverE = t('errors.serverError')
        //   if (e.status === 'FETCH_ERROR') setServerError(serverE)
        //   const error400 = t('errors.error400')
        //   if (e.status === 400) setServerError(error400)
        //   if (e.status === 401) setServerError(error400)
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
      <GoTo address="/" name={t('links.back')} />
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
                label={t('auth.login.inputs.email.label')}
                error={errors.email?.message}
                placeholder={t('auth.login.inputs.email.placeholder')}
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
                label={t('auth.login.inputs.password.label')}
                error={errors.password?.message}
                placeholder={t('auth.login.inputs.password.placeholder')}
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
            name={t('buttons.login')}
            type="submit"
          />
        </form>

        <a href="/forgot-password">
          <Note text={t('auth.links.forgotPassword')} />
        </a>

        <GoTo
          text={t('auth.login.note')}
          address={"/register"}
          name={t('auth.links.register')}
        />
      </FormContainer> 
    </>
  )
}
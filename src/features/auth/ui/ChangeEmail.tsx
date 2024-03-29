import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { Input } from "../../../common/components/input/defaultInput/Input"
import { InputType } from "../../../common/components/enums/enums"
import { DefaultButton } from "../../../common/components/buttons/DefaultButton"
import { FormContainer } from "../../../common/components/form/FormContainer"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useState } from "react"
import { useChangeEmailMutation } from "../auth.api"
import { Loader } from "../../../common/components/loaders/CircularLoader"
import { Error } from "../../../common/components/error/Error"
import { useNavigate } from "react-router-dom"
import { Modal } from "../../../common/components/modal/Modal"
import { NewEmailType } from "../auth.api.types"
import { useSelector } from "react-redux"
import { selectUserId } from "../auth.selectors"
import { GoTo } from "../../../common/components/goTo/GoTo"
import { useTranslation } from "react-i18next"
import styles from "./../Auth.module.sass"
import { Header } from "../../../common/components/header/Header"

interface IFormProps {
  newEmail: string
}

export const ChangeEmail = () => {
  const [changeEmail, { isLoading, error }] = useChangeEmailMutation()
  const [success, setSuccess] = useState(false)
  const [open, setOpen] = useState(true)
  const [serverError, setServerError] = useState('')
  const navigate = useNavigate()
  const userId = useSelector(selectUserId)

  const { t } = useTranslation()

  const formSchema = yup.object().shape({
    newEmail: yup.string()
      .required(t('errors.required'))
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, t('errors.mustBeEmail')),
  })

  const {
    handleSubmit, 
    formState: { errors },
    clearErrors,
    reset,
    control,
  } = useForm<IFormProps>({
    mode: "onChange",
    defaultValues: {
      newEmail: '',
    },
    resolver: yupResolver(formSchema),
  })

  const onSubmit: SubmitHandler<any> = (data: NewEmailType) => { 
    if (!data) {
      const someE = t('errors.someError')
      setServerError(someE)
    } else {
      setServerError('')
      changeEmail({ ...data, userId })
        .unwrap()
        .then(() => {
          setSuccess(true)
          reset()
        })
        .catch(e => {
          if (e.status === 'FETCH_ERROR') setServerError(t('errors.serverError'))
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
          text={t("modal.linkSent")}
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
        <Header title={t('screens.changeEmail')} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name="newEmail"
            render={({ field: { ref, value, onChange } }) => (
              <Input 
                type={InputType.TEXT}
                label={t("auth.changeEmail.inputs.newEmail.label")}
                error={errors.newEmail?.message}
                placeholder={t("auth.changeEmail.inputs.newEmail.placeholder")}
                ref={ref}
                value={value}
                onFocus={() => {
                  clearErrors('newEmail')
                  setServerError('')
                }}
                onChange={onChange}
              />
            )}
          />

          <DefaultButton
            error={errors.newEmail}
            name={t('buttons.submit')}
            type="submit"
          />
        </form>
      </FormContainer>
    </>
  )
}
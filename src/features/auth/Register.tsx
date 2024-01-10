import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { RegisterFormType, RegisterType } from "./auth.types"
import { useRegisterMutation } from "./auth.api"

export const Register = () => {
  const [register, { error }] = useRegisterMutation()

  const {
    handleSubmit,
    control,
    watch,
    formState: { isValid },
    reset,
    trigger,
  } = useForm<RegisterFormType>({
    defaultValues: {
      email: '',
      password: '',
      passwordConfirmation: '',
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  })
  const passwordConfirm = watch('passwordConfirmation')

  const onSubmit: SubmitHandler<RegisterType> = (data: RegisterType) => {
    console.log(data);
    
    register(data)
      .unwrap()
      .then(() => {
        reset()
      })
      .catch((error) => {
        console.error(error)
        if (error.data && error.data.errors) {
          console.log(error.data.errors)
        }
      })
  }

  return (
    <form >
      <div>
        <label htmlFor="email">Email</label>
        <Controller
          control={control}
          name="email"
          render={({ field: { ref, value, onChange }, fieldState: { error } }) => (
            <>
              <input
                placeholder={"Email"}
                onChange={onChange}
                value={value}
                ref={ref}
              />
              {error && <p>{error.message}</p>}
            </>
          )}
        />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <Controller
          control={control}
          name="password"
          render={({ field: { ref, value, onChange, onBlur }, fieldState: { error } }) => (
            <>
              <input
                placeholder={"Password"}
                onChange={onChange}
                ref={ref}
                value={value}
                onBlur={() => {
                  onBlur()
                  if (passwordConfirm.length) {
                    return trigger(['password', 'passwordConfirmation'])
                  }
                }}
              />
              {error && <p>{error.message}</p>}
            </>
          )}
        />
      </div>

      <div>
      <Controller
          control={control}
          name="passwordConfirmation"
          render={({ field: { value, ref, onBlur, onChange }, fieldState: { error } }) => (
            <>
              <input
                placeholder={"Password confirmation"}
                ref={ref}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
              />
              {error && <p>{error.message}</p>}
            </>
          )}
        />
      </div>

      <div>
        <button onClick={handleSubmit(onSubmit)}>Register</button>
      </div>
    </form>
  )
}
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Loader } from '../../../common/components/loaders/CircularLoader'
import { CharacterType } from '../rickMorty/rickMorty.types'
import { useGetAvatarsQuery } from '../rickMorty/rickMorty.api'
import { Avatar } from '../../../common/components/avatar/Avatar'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useAppSelector } from '../../../common/hooks/useAppSelector'
import { selectUser, selectUserId } from '../../auth/auth.selectors'
import { AvatarType } from '../profile.api.types'
import { Modal } from '../../../common/components/modal/Modal'
import { Error } from '../../../common/components/error/Error'
import { useUpdateAvatarMutation } from '../profile.api'
import { useDispatch } from 'react-redux'
import { setUserInfo } from '../../auth/auth.slice'
import { AppText } from '../../../common/components/text/AppText'
import { DivideLine } from '../../../common/components/divideLine/DevideLine'
import { GoTo } from '../../../common/components/goTo/GoTo'
import { Header } from '../../../common/components/header/Header'
import { UserAvatar } from '../../../common/components/avatar/UserAvatar'
import styles from './ChangeAvatar.module.sass'

export const ChangeAvatar = () => {
  const [open, setOpen] = useState(false)
  const [serverError, setServerError] = useState('')
  const { t } = useTranslation()
  const { data, isLoading } = useGetAvatarsQuery()
  const dispatch = useDispatch()
  const [updateAvatar, { isLoading: isLoadingUpdateAvatar, isError }] = useUpdateAvatarMutation()

  const user = useAppSelector(selectUser)
  const {
    reset,
  } = useForm<AvatarType>({
    mode: "onChange",
    defaultValues: {
      avatarPath: '',
      avatarName: '',
      userId: useAppSelector(selectUserId),
    }
  })

  const getAvatarData = (avatarPath: string, avatarName: string) => {
    onSubmit({ userId: user?._id, avatarPath, avatarName })
  }

  const onSubmit: SubmitHandler<AvatarType> = (data: AvatarType) => { 
    console.log(data)
    if (!data) {
      setServerError('Some error occured')
    } else {
      setServerError('')
      updateAvatar(data)
        .unwrap()
        .then(response => {
          setOpen(true)
          dispatch(setUserInfo(response))
          reset()
        })
        .catch(e => {
          if (e.status === 'FETCH_ERROR') setServerError(t('errors.serverError'))
        })
    }
  }

  const modalCallback = () => {
    setOpen(false)
  }
  
  return (
    <>
      {(isLoading || isLoadingUpdateAvatar) && <Loader />}
      {open && 
        <Modal
          text={t('modal.changeAvatarSuccess')}
          open={open}
          setOpen={setOpen}
          outlinedButton={true}
          buttonBack={false}
          buttonName={t('links.back')}
          buttonCallback={modalCallback}
        />
      }
      <>
        <GoTo address="/home/profile" name={t('links.back')} />
        <Header title={t('screens.changeAvatar')} />

        {user?.avatarPath
          ? <UserAvatar
              source={user.avatarPath} 
              name={user.avatarName}
            />
          : <AppText desc={t('profile.changeAvatar')} link={false} />
        }
        <DivideLine />
        <>
          {(serverError || isError) && <Error error={serverError} />}
          {data && data.results.map((item: CharacterType) => (
            <Avatar 
              key={item.id}
              source={item.image}
              name={item.name}
              status={item.status}
              species={item.species}
              onPress={getAvatarData}
            />
          ))}
        </>
      </>
    </>
  )
}
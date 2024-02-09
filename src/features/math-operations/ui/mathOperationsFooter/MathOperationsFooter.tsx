import { useTranslation } from "react-i18next"
import { DefaultButton } from "../../../../common/components/button/DefaultButton"
import { Modal } from "../../../../common/components/modal/Modal"
import { Props } from "./MathOperationsFooter.types"
import { Score } from "../../../../common/components/score/Score"

export const MathOperationsFooter = ({
  onGenerateNewDigits,
  onCheck,
  right,
  wrong,
  onPressPlayMore,
  onPressTryAgain,
  score
}: Props) => {
  const { t } = useTranslation()

  return (
    <>
      <DefaultButton
        type='button'
        name={t('mathOperations.common.generate')} 
        onClick={onGenerateNewDigits}
      />
      <DefaultButton 
        type='button'
        name={t('mathOperations.common.check')} 
        onClick={onCheck}
      />
      
      {right && 
        <Modal 
          text={t('mathOperations.common.right')}
          color="green"
          buttonName={t('mathOperations.common.more')}
          open={right}
          buttonCallback={onPressPlayMore}
          outlinedButton={true}
          buttonBack={false}
        />
      }
      {wrong && 
        <Modal 
          text={t('mathOperations.common.notRight')}
          color="red"
          buttonName={t('mathOperations.common.again')}
          open={wrong}
          buttonCallback={onPressTryAgain}
          outlinedButton={true}
          buttonBack={false}
        />
      }
      
      <Score score={score} />
    </>
  )
}
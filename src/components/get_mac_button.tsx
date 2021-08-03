import {Button} from 'antd'
import {getUserAir, useCargos} from '../hooks/user_store'
import {getPerMac} from '../utils/util'

export const GetMacButton = () => {
  const cargos = useCargos()
  const isCargoValid = cargos.every((c) => c.isValid)
  const air = getUserAir()
  const calculation = isCargoValid ? getPerMac(air, cargos) : null

  const onClick = () =>
    isCargoValid
      ? alert(JSON.stringify(calculation))
      : () => {
          return
        }

  return (
    <div style={{marginTop: 50, marginBottom: 20, display: 'flex', alignItems: 'center',justifyContent: 'center'}}>
      <Button
        disabled={!isCargoValid}
        onClick={onClick}
        size="large"
        style={{
          color: '#06645E',
          borderColor: '#06645E',
          backgroundColor: 'white',
          width: 200,
          boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25',
        }}
      >
        {isCargoValid
          ? `Show Work: ${calculation?.percentMacPercent}`
          : '%MAC: Invalid'}
      </Button>
    </div>
  )
}

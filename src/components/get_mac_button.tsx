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
    <div style={{marginTop: 50, marginBottom: 60, display: 'flex', alignItems: 'center',justifyContent: 'center'}}>
      <div
        style={{
          background: '#06BA7F',
          color: '#fff',
          boxShadow: '0px 0px 6px 2px rgba(170, 170, 170, 0.36)',
          borderRadius: 45,
          width: 'fit-content',
          paddingLeft: 20,
          paddingRight: 20,
          height: 60,
          overflowWrap: 'break-word',
          cursor: isCargoValid ? 'pointer' : 'not-allowed',
          textAlign: 'center',
          lineHeight: '60px',
        }}
        onClick={onClick}
      >
        {isCargoValid
          ? `Show Work: ${calculation?.percentMacPercent}`
          : '%MAC: Invalid'}
      </div>
    </div>
  )
}

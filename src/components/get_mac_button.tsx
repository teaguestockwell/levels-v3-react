import React from 'react'
import {Button} from 'antd'
import {getAir} from '../hooks/air_store'
import {getCargoMap, useValidation} from '../hooks/cargo_store'
import {getPerMac} from '../util'

export const GetMacButton = () => {
  const isCargoValid = useValidation()
  const onClick = () => {
    const air = getAir()
    const cargos = Array.from(getCargoMap().values())

    const calculation = getPerMac(air, cargos)
    alert(JSON.stringify(calculation))
  }

  return (
    <Button disabled={!isCargoValid} onClick={onClick}>
      Show Work / Form F
    </Button>
  )
}

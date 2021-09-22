import {
  getUserCargos,
  useCargoMapSize,
  useConfigName,
} from '../hooks/user_store'
import {ConfigSelect} from './config_select'
import {AddASelect} from './add_a_select'
import {CargoEditRow} from './cargo_edit_button'
import {CardShadow} from './card_shadow'
import { useState } from 'react'


export const CargoCard = () => {
  const configName = useConfigName()
  useCargoMapSize()
  const cargos = getUserCargos()
  const [cat, setCat] = useState<string>('Steward')
  const cargoTab = cargos
  .filter((c) => c.category.toString() === cat)
  .sort((a, b) => a.name.localeCompare(b.name))
  .map((c) => <CargoEditRow key={c.uuid} uuid={c.uuid} />)

  return (
    <div
      style={{
        paddingBottom: 14,
      }}
    >
      <CardShadow style={{borderRadius: 0, paddingBottom: 10}}>
        <ConfigSelect />
        <div style={{marginTop: 10, marginBottom: 0, borderTop: '1px solid #F1F1F1'}}/>
        <AddASelect />
      </CardShadow>

      <CardShadow style={{borderRadius: 0, paddingTop: 10}}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            height: 40,
            paddingRight: 10
          }}
        >
          {
            ['Steward', 'Emergency', 'Extra', 'Custom']
            .map(c => <div 
              key={c} 
              onClick={() => setCat(c)}
              style={{
                textDecoration: c === cat ? 'underline' : undefined,
                color: '#000',
                marginLeft: 10,
                fontWeight: c === cat ? 600 : 400
              }}>{
                c !== 'Custom' ? configName + ' ' + c : c
                }</div>)
          }
        </div>
        <div style={{marginTop: 10, marginBottom: 0, borderTop: '1px solid #F1F1F1'}}/>
        <div style={{paddingLeft: 10, paddingBottom: 20, paddingTop:20}}>
          {
            cargoTab.length === 0 ? <div >{`No ${cat} equipment`}</div> : cargoTab
          }
        </div>
      </CardShadow>
    </div>
  )
}

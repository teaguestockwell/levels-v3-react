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
  useConfigName()
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
        <div
          style={{
            marginRight: 5
          }}
        >

        <ConfigSelect />
        <div style={{margin: '10px 0px 0px 15px', borderTop: '1px solid #F1F1F1'}}/>
        <AddASelect />
        </div>
      </CardShadow>

      <CardShadow style={{borderRadius: 0, paddingTop: 10}}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            height: 40,
            paddingRight: 10,
            cursor: 'pointer',
            justifyContent: 'space-between',
            textAlign: 'center',
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
                c
                }</div>)
          }
        </div>
        <div style={{margin: '10px 15px 0px 15px', borderTop: '1px solid #F1F1F1'}}/>
        <div style={{paddingLeft: 10, paddingBottom: 20, paddingTop:20}}>
          {
            cargoTab.length === 0 ? <div >{`No ${cat} equipment`}</div> : cargoTab
          }
        </div>
      </CardShadow>
    </div>
  )
}

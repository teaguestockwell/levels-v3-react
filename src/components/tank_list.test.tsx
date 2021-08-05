/* eslint-disable @typescript-eslint/no-unused-vars */
import {waitFor} from '@testing-library/react'
import {TankList} from './tank_list'
import {renderWrapped} from '../testUtils/render_wrapped'
import {Category} from '../types/aircraftDeep'
import {CargoString} from '../types/cargoString'
import {userStore} from '../hooks/user_store'


const cargoString = (uuid: string): CargoString => ({
  uuid,
  name: 'Tank 1',
  weightEA: '250',
  fs: '900',
  qty: '1',
  category: Category.Tank,
  isValid: true,
})

const setup = () => {
  userStore
    .getState()
    .putCargos([
      cargoString('0'),
      cargoString('1'),
      cargoString('2'),
      cargoString('3'),
    ])
}

describe('TankList', () => {
  


  it('will render', async () => {
    setup()
    const {queryAllByText, debug} = renderWrapped(<TankList />)
    await waitFor(() => expect(queryAllByText('Loading Test').length).toBe(0))
    expect(queryAllByText('250').length).toBe(4)
  })
})

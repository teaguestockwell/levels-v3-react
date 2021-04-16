/* eslint-disable @typescript-eslint/no-unused-vars */
import {fireEvent, waitFor} from '@testing-library/react'
import {TankList} from './tank_list'
import {renderWrapped} from '../testUtils/render_wrapped'
import {CargoStore} from '../hooks/cargo_store'
import {mockAircraftsDeep} from '../testUtils/mock_aircrafts_deep'
import {Category} from '../types/aircraftDeep'
import {CargoString} from '../types/cargoString'
import {getActionsAS} from '../hooks/air_store'

const air = mockAircraftsDeep[0]
const cargoString: CargoString = {
  uuid: '0',
  name: 'Tank 1',
  weightEA: '250',
  fs: '900',
  qty: '1',
  category: Category.Tank,
  isValid: true
}

describe('TankList', () => {
  it('will render', async () => {
    getActionsAS().setSelectedAir(air)
    const {getByText, queryAllByText, debug} = renderWrapped(<TankList />)
    await waitFor(() => expect(queryAllByText('Loading Test').length).toBe(0))
    expect(getByText('Tank 1: 250')).toBeInTheDocument()
    expect(getByText('Tank 2 ER: 250')).toBeInTheDocument()
    expect(getByText('Tank 3 ER: 250')).toBeInTheDocument()
    expect(getByText('Tank 4: 250')).toBeInTheDocument()
  })
})

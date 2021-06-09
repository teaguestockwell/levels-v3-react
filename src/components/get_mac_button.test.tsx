/* eslint-disable @typescript-eslint/no-unused-vars */
import {waitFor} from '@testing-library/react'
import {GetMacButton} from './get_mac_button'
import {renderWrapped} from '../testUtils/render_wrapped'
import MatchMediaMock from 'jest-matchmedia-mock'
import { userStore } from '../hooks/user_store'
import { CargoString } from '../types/cargoString'
import { Category } from '../types/aircraftDeep'

let matchMedia

describe('GetMacButton', () => {
  beforeAll(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    matchMedia = new MatchMediaMock()
  })
  
  it('will render', async () => {
    const ct = renderWrapped(<GetMacButton />)
    const invalidCargo: CargoString = {
      uuid: '123',
      category: Category.User,
      name: 'as',
      weightEA: '123',
      fs: '123',
      qty: '123',
      isValid: false
    }

    userStore.getState().putCargos([invalidCargo])
    await waitFor(() =>
      expect(ct.queryAllByText('Loading Test').length).toBe(0)
    )
    expect(ct.getByText('%MAC: Invalid')).toBeInTheDocument()
  })
})

/* eslint-disable @typescript-eslint/no-unused-vars */
import {waitFor} from '@testing-library/react'
import {GetMacButton} from './get_mac_button'
import {renderWrapped} from '../testUtils/render_wrapped'
import {userStore} from '../hooks/user_store'
import * as Types from '../types'



describe('GetMacButton', () => {

  it('will render', async () => {
    const ct = renderWrapped(<GetMacButton />)
    const invalidCargo: Types.CargoString = {
      uuid: '123',
      category: Types.CargoCategory.User,
      name: 'as',
      weightEA: '123',
      fs: '123',
      qty: '123',
      isValid: false,
    }

    userStore.getState().putCargos([invalidCargo])
    await waitFor(() =>
      expect(ct.queryAllByText('Loading Test').length).toBe(0)
    )
    expect(ct.getByText('%MAC: Invalid')).toBeInTheDocument()
  })
})

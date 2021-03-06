import {act, waitFor} from '@testing-library/react'
import {renderWrapped} from '../testUtils/render_wrapped'
import {userStore} from '../hooks/user_store'
import  * as Types from '../types'

import {CargoEditRow} from './cargo_edit_button'

const cargo: Types.CargoString = {
  name: 'cargo',
  weightEA: '100',
  qty: '1',
  uuid: '0',
  category: Types.CargoCategory.User,
  fs: '1120',
  isValid: true,
}

describe('CargoEditButton', () => {
  


  it('will render the button', async () => {
    userStore.getState().putCargos([cargo])
    userStore.getState().setEditUuid(cargo.uuid)
    const {getByText, queryAllByText} = renderWrapped(
      <CargoEditRow uuid={'0'} />
    )
    await waitFor(() => expect(queryAllByText('Loading Test').length).toBe(0))
    expect(getByText('cargo')).toBeInTheDocument()
  })

  it('will update button text on state change', async () => {
    // given
    userStore.getState().putCargos([cargo])
    userStore.getState().setEditUuid(cargo.uuid)
    const ct = renderWrapped(<CargoEditRow uuid={'0'} />)
    await waitFor(() =>
      expect(ct.queryAllByText('Loading Test').length).toBe(0)
    )
    // valid icon on button
    expect(ct.queryAllByText('cargo').length).toBe(1)

    // when form is changed
    act(() =>
      userStore
        .getState()
        .putCargos([{...cargo, name: 'new name', qty: '0', isValid: false}])
    )

    // then
    await waitFor(() => {
      expect(ct.queryAllByText('name').length).toBe(0)
      expect(ct.queryAllByText('new name').length).toBe(1)
    })
  })
})

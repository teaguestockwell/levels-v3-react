import {act, waitFor} from '@testing-library/react'
import {renderWrapped} from '../testUtils/render_wrapped'
import {userStore} from '../hooks/user_store'
import {Category} from '../types/aircraftDeep'
import {CargoString} from '../types/cargoString'

import {CargoEditModal} from './cargo_edit_modal'

const cargo: CargoString = {
  name: 'cargo',
  weightEA: '100',
  qty: '1',
  uuid: '0',
  category: Category.User,
  fs: '1120',
  isValid: true,
}

describe('CargoEditModal', () => {
  


  it('will render closed', async () => {
    userStore.getState().putCargos([cargo])
    //CargoStore.getState().putEditUuid(cargo.uuid)
    const {queryAllByText} = renderWrapped(<CargoEditModal />)
    await waitFor(() => expect(queryAllByText('Loading Test').length).toBe(0))
    expect(queryAllByText('Name').length).toBe(0)
  })

  it('will open', async () => {
    userStore.getState().putCargos([cargo])
    //CargoStore.getState().putEditUuid(cargo.uuid)
    const {queryAllByText} = renderWrapped(<CargoEditModal />)
    await waitFor(() => expect(queryAllByText('Loading Test').length).toBe(0))
    expect(queryAllByText('Name').length).toBe(0)

    act(() => userStore.getState().setEditUuid('0'))

    await waitFor(() => expect(queryAllByText('Name').length).toBe(1))
  })
})

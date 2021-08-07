/* eslint-disable @typescript-eslint/no-unused-vars */
import {renderWrapped, waitFor} from '../testUtils/render_wrapped'
import {AdminModal} from './admin_modal'

import {adminStore} from '../hooks/admin_store'
import {mockAircraftsDeep} from '../testUtils/mock_aircrafts_deep'


const ep = 'configCargo?config=20&aircraftId=2'
const air = mockAircraftsDeep[1]
const initEditObj = {
  name: 'Flare Hazard Placards (Note 1)',
  configId: 20,
  aircraftId: 2,
  cargoId: 62,
  configCargoId: 429,
  fs: 400,
  qty: 4,
  cargo: {
    aircraftId: 2,
    cargoId: 62,
    updated: '2021-04-30T18:18:09.971Z',
    updatedBy: 'unknown',
    name: 'Flare Hazard Placards (Note 1)',
    weight: 20,
    fs: 400,
    category: 'Extra',
  },
}

const setup = () => {
  const store = adminStore.getState()
  store.setAir(air)
  store.setEp(ep)
  store.setEditObj(initEditObj)
}

describe('AdminModal', () => {

  it('will render closed when store has no edit obj', async () => {
    //given an admin form
    setup()
    adminStore.getState().setEditObj(undefined)

    const ct = renderWrapped(<AdminModal />)
    await waitFor(() =>
      expect(ct.queryAllByText('Loading Test').length).toBe(0)
    )
    expect(ct.queryAllByText('Fs').length).toBe(0)
  })

  it('will open and close based on state', async () => {
    setup()
    const ct = renderWrapped(<AdminModal />)
    await waitFor(() =>
      expect(ct.queryAllByText('Loading Test').length).toBe(0)
    )

    expect(ct.queryAllByText('Fs').length).toBe(0)

    //open
    adminStore.getState().setEditObj(initEditObj)
    await waitFor(() => expect(ct.getByText('Fs')).toBeInTheDocument())

    //close
    adminStore.getState().setEditObj(undefined)
    await waitFor(() => expect(ct.queryAllByText('Fs').length).toBe(0))
  })
})

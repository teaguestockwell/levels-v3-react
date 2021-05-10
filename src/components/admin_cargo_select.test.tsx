/* eslint-disable @typescript-eslint/no-unused-vars */
import {fireEvent, waitFor} from '@testing-library/react'
import {AdminCargoSelect} from './admin_cargo_select'
import {renderWrapped} from '../testUtils/render_wrapped'
import {adminStore, getAdminStoreActions} from '../hooks/admin_store'
import {mockAircraftsDeep} from '../testUtils/mock_aircrafts_deep'
import MatchMediaMock from 'jest-matchmedia-mock'

const adminStoreActions = getAdminStoreActions()
const c17 = mockAircraftsDeep[1]
const initEp = 'configCargo?config=1&aircraftId=1'
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
  adminStoreActions.setAir(c17)
  adminStoreActions.setEp(initEp)
  adminStoreActions.setEditObj(initEditObj)
}

describe('AdminCargoSelect', () => {
  let mediaMock
  beforeAll(() => (mediaMock = new MatchMediaMock()))
  it('will render', async () => {
    setup()
    const fn = jest.fn()
    const qt = renderWrapped(<AdminCargoSelect validate={fn} />)
    await waitFor(() =>
      expect(qt.queryAllByText('Loading Test').length).toBe(0)
    )
    await waitFor(() =>
      expect(qt.queryAllByText('Flare Hazard Placards (Note 1)').length).toBe(1)
    )
  })

  it('will be null if !ep.includes(configCargo)', async () => {
    setup()
    const fn = jest.fn()
    adminStoreActions.setEp('aircraft')
    const qt = renderWrapped(<AdminCargoSelect validate={fn} />)
    await waitFor(() =>
      expect(qt.queryAllByText('Loading Test').length).toBe(0)
    )
    await waitFor(() =>
      expect(qt.queryAllByText('Flare Hazard Placards (Note 1)').length).toBe(0)
    )
  })

  it('will be show error if no cargos are able to be selected', async () => {
    adminStoreActions.setAir({...c17, ...{cargos: []}})
    adminStoreActions.setEp(initEp)
    adminStoreActions.setEditObj(initEditObj)

    const fn = jest.fn()

    const qt = renderWrapped(<AdminCargoSelect validate={fn} />)
    await waitFor(() =>
      expect(qt.queryAllByText('Loading Test').length).toBe(0)
    )
    await waitFor(() =>
      expect(
        qt.queryAllByText('Please add cargo to insert into config').length
      ).toBe(1)
    )
  })

  it('will change the change the cargo inside of a config', async () => {
    const fn = jest.fn()
    setup()

    const ct = renderWrapped(<AdminCargoSelect validate={fn} />)
    await waitFor(() =>
      expect(ct.queryAllByText('Loading Test').length).toBe(0)
    )
    await waitFor(() =>
      expect(ct.queryAllByText('Flare Hazard Placards (Note 1)').length).toBe(1)
    )
    expect(fn.mock.calls.length).toBe(0)

    fireEvent.mouseDown(ct.getByText('Flare Hazard Placards (Note 1)'))
    await waitFor(() =>
      expect(ct.queryAllByText('Water Container (5 Gallon)').length).toBe(1)
    )
    fireEvent.click(ct.getByText('Water Container (5 Gallon)')) // cargo id 55

    expect(adminStore.getState()?.editObj?.cargoId).toBe(35)
    expect(fn.mock.calls.length).toBe(1)
  })
})

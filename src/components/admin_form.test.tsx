/* eslint-disable @typescript-eslint/no-unused-vars */
import {v4} from 'uuid'
import {renderWrapped, waitFor, fireEvent, screen} from '../testUtils/render_wrapped'
import {AdminForm} from './admin_form'
import MatchMediaMock from 'jest-matchmedia-mock'
import { adminStore } from '../hooks/admin_store'
import { mockAircraftsDeep } from '../testUtils/mock_aircrafts_deep'

let matchMedia
const ep = 'configCargo?config=1&aircraftId=1'
const air = mockAircraftsDeep[1]
const initEditObj = {
  name:"Flare Hazard Placards (Note 1)",
  configId:20,
  aircraftId:2,
  cargoId:62,
  configCargoId:429,
  fs:400, 
  qty:4,
  cargo:{
    aircraftId:2,
    cargoId:62,
    updated:"2021-04-30T18:18:09.971Z",
    updatedBy:"unknown",
    name:"Flare Hazard Placards (Note 1)",
    weight:20,
    fs:400,
    category:"Extra"
  },
}

const setup = () => {
  const store = adminStore.getState()
  store.setEp(ep)
  store.setEditObj(initEditObj)
  store.setAir(air)
}


describe('AdminForm', () => {
  beforeAll(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    matchMedia = new MatchMediaMock()
  })

  it('will render', async () => {
    setup()
    const ct = renderWrapped(<AdminForm obj={initEditObj} ep={ep}/>)
    await waitFor(() => expect(ct.queryAllByText('Loading Test').length).toBe(0))
    await waitFor(() => expect(ct.getByText('Fs')).toBeInTheDocument())
  }) 

  it('will update api state on save', async () => {
    //given an admin form
    setup()
    const ct = renderWrapped(<AdminForm obj={initEditObj} ep={ep}/>)
    await waitFor(() => expect(ct.queryAllByText('Loading Test').length).toBe(0))
    await waitFor(() => expect(ct.getByText('Fs')).toBeInTheDocument())

    //when i enter text and save the config cargo
    fireEvent.change(ct.getByLabelText('Fs'), {target: {value: '200'}})
    await waitFor(() => expect(ct.getByText('Save').closest('button')).toBeEnabled())
    fireEvent.click(ct.getByText('Save'))

    // then it makes toast while sending http to msw
    await waitFor(() => expect(ct.queryAllByText('saving Flare Hazard Placards (Note 1)...').length).toBe(1))
    await waitFor(() => expect(ct.queryAllByText('Flare Hazard Placards (Note 1) saved').length).toBe(1))
  })

})

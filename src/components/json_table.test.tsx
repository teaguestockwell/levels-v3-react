/* eslint-disable @typescript-eslint/no-unused-vars */
import {v4} from 'uuid'
import {renderWrapped, waitFor, fireEvent, screen, act} from '../testUtils/render_wrapped'
import {JsonTable} from './json_table'
import MatchMediaMock from 'jest-matchmedia-mock'
import { adminStore } from '../hooks/admin_store'
import { mockAircraftsDeep } from '../testUtils/mock_aircrafts_deep'

let matchMedia
const ep = 'aircraft'
const air = mockAircraftsDeep[1]

const setup = () => {
  const store = adminStore.getState()
  store.setAir(air)
  store.setEp(ep)
}


describe('JsonTable', () => {
  beforeAll(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    matchMedia = new MatchMediaMock()
  })

  it('renders', async () => {
    setup()
    const ct = renderWrapped(<JsonTable/>)
    await waitFor(() => expect(ct.queryAllByText('Loading Test').length).toBe(0))
    await waitFor(() => expect(ct.getByText('Name')).toBeInTheDocument())
  })

  it('filters what rows and keys are displayed', async () => {
    setup()
    const ct = renderWrapped(<JsonTable/>)
    await waitFor(() => expect(ct.queryAllByText('Loading Test').length).toBe(0))
    await waitFor(() => expect(ct.getByText('Name')).toBeInTheDocument())

    // nested fk objects are excluded
    await waitFor(() => expect(ct.queryAllByText('Glossarys').length).toBe(0))

    // ids are excluded
    await waitFor(() => expect(ct.queryAllByText('AircraftId').length).toBe(0))
  }) 
 
})

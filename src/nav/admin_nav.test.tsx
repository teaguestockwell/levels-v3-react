/* eslint-disable @typescript-eslint/no-unused-vars */
import {renderWrapped, waitFor} from '../testUtils/render_wrapped'

import {adminStore} from '../hooks/admin_store'
import {mockAircraftsDeep} from '../testUtils/mock_aircrafts_deep'
import {AdminNav} from './admin_nav'


const ep = 'aircraft'
const air = mockAircraftsDeep[1]

const setup = () => {
  const store = adminStore.getState()
  store.setAir(air)
  store.setEp(ep)
}

describe('AdminNav', () => {

  it('renders', async () => {
    setup()
    const ct = renderWrapped(<AdminNav />)
    await waitFor(() =>
      expect(ct.queryAllByText('Loading Test').length).toBe(0)
    )
    await waitFor(() => expect(ct.getByText('My Aircraft')).toBeInTheDocument())
  })
})

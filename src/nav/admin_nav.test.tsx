/* eslint-disable @typescript-eslint/no-unused-vars */
import {renderWrapped, waitFor} from '../testUtils/render_wrapped'
import {adminStore} from '../hooks/admin_store'
import {mockAircraftsDeep} from '../testUtils/mock_aircrafts_deep'
import {AdminNav, getSubMenuTitle} from './admin_nav'


const ep = 'aircraft'
const air = mockAircraftsDeep[1]

const setup = () => {
  const store = adminStore.getState()
  store.setAir(air)
  store.setEp(ep)
}
it('admin nav renders', async () => {
  setup()
  const ct = renderWrapped(<AdminNav />)
  await waitFor(() =>
    expect(ct.queryAllByText('Loading Test').length).toBe(0)
  )
  await waitFor(() => expect(ct.getByText('My Aircraft')).toBeInTheDocument())
})


it('admin nav getSubMenu', () => {
  const aircraft = mockAircraftsDeep[0]
  const endpoint = `configCargo?aircraftId=1&configId=1`

  expect(getSubMenuTitle(endpoint,aircraft)).toBe('Cargos in AE-1')

  const ep2 = 'aircraftId=1&configId=2'
  expect(getSubMenuTitle(ep2,aircraft)).toBe('Cargos in Config')

})

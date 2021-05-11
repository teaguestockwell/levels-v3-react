import {MobileNav} from './mobile_nav'
import {renderWrapped, waitFor} from '../testUtils/render_wrapped'
import MatchMediaMock from 'jest-matchmedia-mock'
import { UserAirSelect } from '../components/user_air_select'
import { AdminAirSelect } from '../components/admin_air_select'

describe('MobileNav', () => {
  let matchMedia
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  beforeAll(() => (matchMedia = new MatchMediaMock()))

  it('will render', async () => {
    const ct = renderWrapped(<MobileNav
       page={<div>hi</div>} 
       pageName={'%MAC'}
       userAirSelect={<UserAirSelect />}
       adminAirSelect={<AdminAirSelect />}
       // eslint-disable-next-line @typescript-eslint/no-empty-function
       setPage={() => {}}
    />)

    await waitFor(() =>
      expect(ct.queryAllByText('Loading Test').length).toBe(0)
    )
    expect(ct.queryAllByText('%MAC').length).toBe(1)
  })
})

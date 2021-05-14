/* eslint-disable @typescript-eslint/no-unused-vars */
import {MobileNav} from './mobile_nav'
import {renderWrapped, waitFor} from '../testUtils/render_wrapped'
import MatchMediaMock from 'jest-matchmedia-mock'
import { CargoStore } from '../hooks/cargo_store'

describe('MobileNav', () => {
  let matchMedia
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  beforeAll(() => (matchMedia = new MatchMediaMock()))

  it('will render', async () => {
    const ct = renderWrapped(
      <MobileNav/>
    )

    await waitFor(() =>
      expect(ct.queryAllByText('Loading Test').length).toBe(0)
    )
    expect(ct.queryAllByText('Atlas').length).toBe(1)
  })  
})

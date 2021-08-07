/* eslint-disable @typescript-eslint/no-unused-vars */
import {MobileNav} from './mobile_nav'
import {renderWrapped, waitFor} from '../testUtils/render_wrapped'

describe('MobileNav', () => {

  it('will render', async () => {
    const ct = renderWrapped(<MobileNav />)

    await waitFor(() =>
      expect(ct.queryAllByText('Loading Test').length).toBe(0)
    )
    expect(ct.queryAllByText('Levels').length).toBe(1)
  })
})

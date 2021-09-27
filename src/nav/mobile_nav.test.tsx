/* eslint-disable @typescript-eslint/no-unused-vars */
import {MobileNav} from './mobile_nav'
import {renderWrapped, waitFor, screen} from '../testUtils/render_wrapped'

describe('MobileNav', () => {

  it('will render', async () => {
    const ct = renderWrapped(<MobileNav />)

    await waitFor(() => expect(screen.queryAllByText('Loading Test').length).toBe(0))

    expect(screen.queryAllByTestId('mobile-nav').length).toBe(1)
  })

})

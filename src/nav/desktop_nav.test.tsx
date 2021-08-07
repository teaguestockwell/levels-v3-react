import {DesktopNav} from './desktop_nav'
import {renderWrapped, waitFor} from '../testUtils/render_wrapped'


describe('DesktopNav', () => {
  it('will render', async () => {
    const ct = renderWrapped(<DesktopNav />)

    await waitFor(() =>
      expect(ct.queryAllByText('Loading Test').length).toBe(0)
    )
    expect(ct.queryAllByText('Levels').length).toBe(1)
  })
})

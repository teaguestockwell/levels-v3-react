import {MobileNav} from './mobile_nav'
import {renderWrapped, waitFor} from '../testUtils/render_wrapped'
import MatchMediaMock from 'jest-matchmedia-mock'

describe('MobileNav', () => {
  let matchMedia
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  beforeAll(() => (matchMedia = new MatchMediaMock()))

  it('will render', async () => {
    const ct = renderWrapped(
      <MobileNav
        page={<div>hi</div>}
        pageName={'%MAC'}
        appBar={<div>appbar</div>}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        setPage={() => {}}
      />
    )

    await waitFor(() =>
      expect(ct.queryAllByText('Loading Test').length).toBe(0)
    )
    expect(ct.queryAllByText('hi').length).toBe(1)
  })
})

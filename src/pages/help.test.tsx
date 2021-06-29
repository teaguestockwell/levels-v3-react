/* eslint-disable @typescript-eslint/no-unused-vars */
import {renderWrapped, waitFor} from '../testUtils/render_wrapped'
import MatchMediaMock from 'jest-matchmedia-mock'
import { Help } from './help'

describe('Help', () => {
  let matchMedia
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  beforeAll(() => (matchMedia = new MatchMediaMock()))

  it('will render', async () => {
    const ct = renderWrapped(<Help/>)

    await waitFor(() =>
      expect(ct.queryAllByText('Loading Test').length).toBe(0)
    )
    expect(ct.queryAllByText('Contact Us').length).toBe(1)
  })
})
import {Mac} from './mac'
import {renderWrapped, waitFor} from '../testUtils/render_wrapped'
import MatchMediaMock from 'jest-matchmedia-mock'

describe('Mac', () => {
  let matchMedia
   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   beforeAll(() => (matchMedia = new MatchMediaMock()))

  it('will render', async () => {
    const ct = renderWrapped(<Mac/>)

    await waitFor(() => expect(ct.queryAllByText('Loading Test').length).toBe(0))
    expect(ct.getByText('Tank 1: 250')).toBeInTheDocument()
  })
})
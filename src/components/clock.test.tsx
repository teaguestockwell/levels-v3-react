import {Clock} from './clock'
import {render} from '../testUtils/render_wrapped'
import MatchMediaMock from 'jest-matchmedia-mock'

let matchMedia

describe('Clock', () => {
  beforeAll(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    matchMedia = new MatchMediaMock()
  })

  it('will render', () => {
    const ct = render(<Clock />)
    expect(ct.queryAllByText('Zulu').length).toBe(1)
  })
})

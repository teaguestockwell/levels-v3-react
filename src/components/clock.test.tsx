import {Clock} from './clock'
import {render} from '../testUtils/render_wrapped'




describe('Clock', () => {

  it('will render', () => {
    const ct = render(<Clock />)
    expect(ct.queryAllByText('Zulu').length).toBe(1)
  })
})

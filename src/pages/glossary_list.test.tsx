import {GlossaryList} from './glossary_list'
import {renderWrapped, waitFor} from '../testUtils/render_wrapped'


describe('GlossaryList', () => {

  it('renders', async () => {
    const ct = renderWrapped(<GlossaryList />)
    await waitFor(() =>
      expect(ct.queryAllByText('Loading Test').length).toBe(0)
    )
    expect(ct.queryAllByText('MAC').length).toBe(1)
  })
})

/* eslint-disable @typescript-eslint/no-unused-vars */
import {Mac} from './mac'
import {renderWrapped, waitFor} from '../testUtils/render_wrapped'

describe('Mac', () => {

  it('will render', async () => {
    const ct = renderWrapped(<Mac />)

    await waitFor(() =>
      expect(ct.queryAllByText('Loading Test').length).toBe(0)
    )
    expect(ct.queryAllByText('Cargo').length).toBe(1)
  })

})

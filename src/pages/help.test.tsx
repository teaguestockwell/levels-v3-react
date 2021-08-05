/* eslint-disable @typescript-eslint/no-unused-vars */
import {renderWrapped, waitFor} from '../testUtils/render_wrapped'

import {Help} from './help'

describe('Help', () => {

  it('will render', async () => {
    const ct = renderWrapped(<Help />)

    await waitFor(() =>
      expect(ct.queryAllByText('Loading Test').length).toBe(0)
    )
    expect(ct.queryAllByText('Contact Us').length).toBe(1)
  })
})

/* eslint-disable @typescript-eslint/no-unused-vars */
import {waitFor} from '@testing-library/react'
import {GetMacButton} from './get_mac_button'
import {renderWrapped} from '../testUtils/render_wrapped'

describe('GetMacButton', () => {
  it('will render', async () => {
    const ct = renderWrapped(<GetMacButton />)
    await waitFor(() =>
      expect(ct.queryAllByText('Loading Test').length).toBe(0)
    )
    expect(ct.getByText('Show Work / Form F')).toBeInTheDocument()
    ct.debug()
  })
})

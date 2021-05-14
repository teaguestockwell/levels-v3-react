import {adminStore} from '../hooks/admin_store'
import {renderWrapped, waitFor} from '../testUtils/render_wrapped'
import {AdminServerSync} from './admin_server_sync'

describe('AdminServerSync', () => {
  it('renders', async () => {
    adminStore.getState().setEp('this is not a mocked ep')

    const ct = renderWrapped(<AdminServerSync />)

    await waitFor(() =>
      expect(ct.queryAllByText('Loading Test').length).toBe(0)
    )

    expect(ct.queryAllByText('Offline').length).toBe(1)
  })
})

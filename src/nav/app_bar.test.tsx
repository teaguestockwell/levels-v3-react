import {AirSyncSelect} from './air_sync_select'
import {renderWrapped,screen, waitFor} from '../testUtils/render_wrapped'


describe('AppBar', () => {
  it('should render', async () => {
    renderWrapped(<AirSyncSelect type="test" />)
    await waitFor(() => expect(screen.queryAllByText('Loading Test').length).toBe(0))
    expect(screen.getByTestId('air-sync-select')).toBeInTheDocument()
  })
})
 

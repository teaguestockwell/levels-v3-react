import {AirSyncSelect} from './air_sync_select'
import {render} from '@testing-library/react'


describe('AppBar', () => {
  it('should render', () => {
    const ct = render(<AirSyncSelect select={<div>select</div>} sync={<div>select</div>}/>)
    expect(ct.queryAllByText('Levels').length).toBe(1)
  })
})

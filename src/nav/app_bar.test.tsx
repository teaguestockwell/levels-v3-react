import {AppBar} from './app_bar'
import {render} from '@testing-library/react'


describe('AppBar', () => {
  it('should render', () => {
    const ct = render(<AppBar select={<div>select</div>} />)
    expect(ct.queryAllByText('Levels').length).toBe(1)
  })
})

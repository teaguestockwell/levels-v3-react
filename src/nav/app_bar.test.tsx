import {AppBar} from './app_bar'
import {render} from '@testing-library/react'
import MatchMediaMock from 'jest-matchmedia-mock'

describe('AppBar', () => {
  let matchMedia
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  beforeAll(() => (matchMedia = new MatchMediaMock()))

  it('should render', () => {
    const ct = render(<AppBar select={<div>select</div>} />)
    expect(ct.queryAllByText('Levels').length).toBe(1)
  })
})

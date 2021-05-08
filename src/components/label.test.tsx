import {render} from '@testing-library/react'
import {Label} from './label'
import MatchMediaMock from 'jest-matchmedia-mock'

describe('Label', () => {
  let matchmedia

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  beforeAll(() => (matchmedia = new MatchMediaMock()))

  it('render', () => {
    const ct = render(<Label text={'hello'} />)
    expect(ct.queryAllByText('hello').length).toBe(1)
  })
})

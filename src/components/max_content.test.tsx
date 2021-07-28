import {render} from '@testing-library/react'
import {MaxContent} from './max_content'
import MatchMediaMock from 'jest-matchmedia-mock'

describe('MaxContent', () => {
  let matchmedia

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  beforeAll(() => (matchmedia = new MatchMediaMock()))
  it('render', () => {
    const ct = render(
      <MaxContent>
        <div>test</div>
      </MaxContent>
    )
    expect(ct.queryAllByText('test').length).toBe(1)
  })
})

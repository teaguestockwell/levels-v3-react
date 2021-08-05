import {render} from '@testing-library/react'
import {MaxContent} from './max_content'


describe('MaxContent', () => {
  it('render', () => {
    const ct = render(
      <MaxContent>
        <div>test</div>
      </MaxContent>
    )
    expect(ct.queryAllByText('test').length).toBe(1)
  })
})

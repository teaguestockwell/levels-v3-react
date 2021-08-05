import {render} from '@testing-library/react'
import {Label} from './label'


describe('Label', () => {
  it('render', () => {
    const ct = render(<Label text={'hello'} />)
    expect(ct.queryAllByText('hello').length).toBe(1)
  })
})

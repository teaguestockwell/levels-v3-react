import {fireEvent, waitFor} from '@testing-library/react'
import {AddASelect} from './add_a_select'
import {userStore} from '../hooks/user_store'
import {renderWrapped} from '../testUtils/render_wrapped'

describe('AddASelect', () => {
  it('will render', async () => {
    const {getByText, queryAllByText} = renderWrapped(<AddASelect />)
    await waitFor(() => expect(queryAllByText('Loading Test').length).toBe(0))
    expect(getByText('Add Equipment')).toBeInTheDocument()
  })

  it('will add cargo', async () => {
    expect(userStore.getState().cargoMap.size).toBe(0)
    const {getByText, queryAllByText} = renderWrapped(<AddASelect />)
    await waitFor(() => expect(queryAllByText('Loading Test').length).toBe(0))

    fireEvent.mouseDown(getByText('Add Equipment'))
    await waitFor(() => expect(queryAllByText('Steward: Water Container (5 Gallon)').length).toBe(1))
    fireEvent.click(getByText('Steward: Water Container (5 Gallon)'))

    expect(userStore.getState().cargoMap.size).toBe(1)
  })
})

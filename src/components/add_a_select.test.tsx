import {fireEvent, waitFor} from '@testing-library/react'
import {AddASelect} from './add_a_select'
import {userStore} from '../hooks/user_store'
import {renderWrapped} from '../testUtils/render_wrapped'

describe('AddASelect', () => {
  it('will render', async () => {
    const {getByText, queryAllByText} = renderWrapped(<AddASelect />)
    await waitFor(() => expect(queryAllByText('Loading Test').length).toBe(0))
    expect(getByText('Custom Cargo')).toBeInTheDocument()
  })

  it('will add cargo', async () => {
    expect(userStore.getState().cargoMap.size).toBe(0)
    const {getByRole, getByText, queryAllByText} = renderWrapped(<AddASelect />)
    await waitFor(() => expect(queryAllByText('Loading Test').length).toBe(0))

    fireEvent.click(getByRole('button'))
    fireEvent.click(getByText('Water Container (5 Gallon)'))
    expect(userStore.getState().cargoMap.size).toBe(1)
  })
})

import {fireEvent, waitFor} from '@testing-library/react'
import {AddASelect} from './addASelect'
import {CargoStore} from '../hooks/cargoStore'
import {renderWrapped} from '../testUtils/renderW'

describe('AddASelect', () => {

  it('will render', async () => {
    const { getByText, queryAllByText } = renderWrapped(<AddASelect/>)
    await waitFor(() => expect(queryAllByText('Loading Test').length).toBe(0))
    expect(getByText('Add AddA')).toBeInTheDocument()
  })

  it('will add cargo', async () => {
    expect(CargoStore.getState().cargoMap.size).toBe(0)
    const {getByRole, getByText, queryAllByText} = renderWrapped(<AddASelect/>)
    await waitFor(() => expect(queryAllByText('Loading Test').length).toBe(0))

    fireEvent.click(getByRole('button'))
    fireEvent.click(getByText('Water Container (5 Gallon)'))
    expect(CargoStore.getState().cargoMap.size).toBe(1)
  })
})
import {render, fireEvent, waitFor} from '@testing-library/react'
import {AddASelect} from './addASelect'
import {CargoStore} from '../hooks/cargoStore'
import {renderW} from '../testUtils/renderW'
import { QueryClient } from 'react-query'

describe('AddASelect', () => {

  it('will render', async () => {
    const {getByText } = renderW(<AddASelect/>)

    await waitFor(() => expect(getByText('Add AddA')).toBeInTheDocument())
  })

  // it('will open add cargo when modal is clicked', () => {
  //   expect(CargoStore.getState().cargoMap.size).toBe(0)
  //   const {getByRole, getByText} = render(<Wrapper {...<AddASelect/>}/>)
  //   fireEvent.click(getByRole('button'))
  //   fireEvent.click(getByText('Water Container (5 Gallon)'))
  //   expect(CargoStore.getState().cargoMap.size).toBe(1)
  // })
})
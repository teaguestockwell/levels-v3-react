import {render, fireEvent, waitFor } from '@testing-library/react'
import {AirSelect} from './airSelect'
import {CargoStore} from '../hooks/cargoStore'
import {renderW} from '../testUtils/renderW'


describe('AirSelect', () => {

  it('will render', async () => { 
    const {getByText} = renderW(<AirSelect/>)
    await waitFor(() => expect(getByText('C-17A')).toBeInTheDocument())
  })

  // it('will add cargo to CargoStore when clicked', () => {
  //   expect(CargoStore.getState().cargoMap.size).toBe(0)
  //   const {getByRole} = render(<AddCustomCargo/>)
  //    fireEvent.click(getByRole('button'))
  //    expect(CargoStore.getState().cargoMap.size).toBe(1)
  // })
})
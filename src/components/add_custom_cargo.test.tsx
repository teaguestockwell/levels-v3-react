import {render, fireEvent} from '@testing-library/react'
import {AddCustomCargo} from './add_custom_cargo'
import {userStore} from '../hooks/user_store'

describe('AddCustomCargo', () => {
  it('will render', () => {
    const {getByRole} = render(<AddCustomCargo />)
    expect(getByRole('button')).toBeTruthy()
  })

  it('will add cargo', () => {
    expect(userStore.getState().cargoMap.size).toBe(0)
    const {getByRole} = render(<AddCustomCargo />)
    fireEvent.click(getByRole('button'))
    expect(userStore.getState().cargoMap.size).toBe(1)
  })
})

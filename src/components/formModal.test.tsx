import {act, fireEvent, waitFor} from '@testing-library/react'
import {FormModal} from './formModal'
import {renderWrapped} from '../testUtils/renderW'
import {CargoStore} from '../hooks/cargoStore'
import { Category } from '../types/aircraftDeep'
import { CargoString } from '../types/cargoString'
import MatchMediaMock from 'jest-matchmedia-mock'

const cargo: CargoString = {
  name: 'cargo',
  weightEA: '100',
  qty: '1',
  uuid: '0',
  category: Category.User,
  fs: '1120',
  isValid: true
}

describe('ConfigSelect', () => {
  let matchMedia

  beforeAll(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    matchMedia = new MatchMediaMock()
  })

  it('will render', async () => {
    CargoStore.getState().putCargos([cargo])
    const {getByText, queryAllByText} = renderWrapped(<FormModal uuid={'0'}/>)
    await waitFor(() => expect(queryAllByText('Loading Test').length).toBe(0))
    expect(getByText('1 EA cargo')).toBeInTheDocument()
  })

  it('will open a modal when clicked', async () => {
    // given
    CargoStore.getState().putCargos([cargo])
    const ct = renderWrapped(<FormModal uuid={'0'}/>)
    await waitFor(() => expect(ct.queryAllByText('Loading Test').length).toBe(0))

    // when button is clicked
    fireEvent.click(ct.getByText('1 EA cargo'))
    await waitFor(() => expect(ct.queryAllByText('Name').length).toBe(1))
  })

  it('will update button text on state change', async () => {
      // given
      CargoStore.getState().putCargos([cargo])
      const ct = renderWrapped(<FormModal uuid={'0'}/>)
      await waitFor(() => expect(ct.queryAllByText('Loading Test').length).toBe(0))
      // valid icon on button
      expect(ct.queryAllByLabelText('check-circle').length).toBe(1)
      // invalid icon ! on button
      expect(ct.queryAllByLabelText('close-circle').length).toBe(0)
      
  
      // when form is changed
      act(() => CargoStore.getState().putCargos([{...cargo, name: 'new name', qty: '0', isValid: false}]))

      // then
      await waitFor(() => {
        // name and qty will update on button
        expect(ct.queryAllByText('0 EA new name').length).toBe(1)
 
        // valid icon ! on button
        expect(ct.queryAllByLabelText('check-circle').length).toBe(0)
        // invalid icon on button
        expect(ct.queryAllByLabelText('close-circle').length).toBe(1)
      })
  })
})
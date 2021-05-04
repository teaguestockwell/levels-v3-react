import {act, waitFor} from '@testing-library/react'
import {renderWrapped} from '../testUtils/render_wrapped'
import {CargoStore} from '../hooks/cargo_store'
import {Category} from '../types/aircraftDeep'
import {CargoString} from '../types/cargoString'
import MatchMediaMock from 'jest-matchmedia-mock'
import {CargoEditButton} from './cargo_edit_button'

const cargo: CargoString = {
  name: 'cargo',
  weightEA: '100',
  qty: '1',
  uuid: '0',
  category: Category.User,
  fs: '1120',
  isValid: true,
}

describe('CargoEditButton', () => {
  let matchMedia

  beforeAll(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    matchMedia = new MatchMediaMock()
  })

  it('will render the button', async () => {
    CargoStore.getState().putCargos([cargo])
    CargoStore.getState().putEditUuid(cargo.uuid)
    const {getByText, queryAllByText} = renderWrapped(
      <CargoEditButton uuid={'0'} />
    )
    await waitFor(() => expect(queryAllByText('Loading Test').length).toBe(0))
    expect(getByText('1 EA cargo')).toBeInTheDocument()
  })

  it('will update button text on state change', async () => {
    // given
    CargoStore.getState().putCargos([cargo])
    CargoStore.getState().putEditUuid(cargo.uuid)
    const ct = renderWrapped(<CargoEditButton uuid={'0'} />)
    await waitFor(() =>
      expect(ct.queryAllByText('Loading Test').length).toBe(0)
    )
    // valid icon on button
    expect(ct.queryAllByLabelText('check-circle').length).toBe(1)
    // invalid icon ! on button
    expect(ct.queryAllByLabelText('close-circle').length).toBe(0)

    // when form is changed
    act(() =>
      CargoStore.getState().putCargos([
        {...cargo, name: 'new name', qty: '0', isValid: false},
      ])
    )

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

import {v4} from 'uuid'
import {userStore} from '../hooks/user_store'
import {renderWrapped, waitFor, fireEvent} from '../testUtils/render_wrapped'
import  * as Types from '../types'
import {CargoForm} from './cargo_form'


const getMockCargo = (name: string): Types.CargoString => {
  return {
    uuid: v4(),
    name,
    weightEA: '1',
    fs: '12',
    qty: '1',
    category: Types.CargoCategory.User,
    isValid: false,
  }
}

describe('CargoForm', () => {

  it('will render', async () => {
    const cargo = getMockCargo('cargo0')
    userStore.getState().putCargos([cargo])
    console.log(userStore.getState().cargoMap.get(cargo.uuid))
    const {getByText, queryAllByText} = renderWrapped(
      <CargoForm uuid={cargo.uuid} />
    )
    await waitFor(() => expect(queryAllByText('Loading Test').length).toBe(0))

    expect(getByText('Name')).toBeInTheDocument()
  })

  it('will update CargoStore', async () => {
    // given
    const cargo = getMockCargo('cargo0')

    userStore.getState().putCargos([cargo])
    const ct = renderWrapped(<CargoForm uuid={cargo.uuid} />)
    await waitFor(() =>
      expect(ct.queryAllByText('Loading Test').length).toBe(0)
    )

    // when
    fireEvent.change(ct.getByLabelText('Name'), {target: {value: 'new name'}})
    fireEvent.change(ct.getByLabelText('WeightEA'), {target: {value: '100'}})
    fireEvent.change(ct.getByLabelText('Fs'), {target: {value: '100'}})
    fireEvent.change(ct.getByLabelText('Qty'), {target: {value: '1'}})

    // then
    await waitFor(() => {
      expect(userStore.getState().cargoMap.get(cargo.uuid)).toStrictEqual({
        ...cargo,
        name: 'new name',
        weightEA: '100',
        fs: '100',
        qty: '1',
        isValid: true,
      })

      expect(
        (userStore.getState().cargoMap.get(cargo.uuid) as Types.CargoString).isValid
      ).toBe(true)
    })
  })
})

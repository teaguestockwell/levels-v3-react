import { v4 } from 'uuid'
import { CargoStore } from '../hooks/cargoStore'
import {renderWrapped, waitFor,fireEvent}from '../testUtils/renderW'
import { Category } from '../types/aircraftDeep'
import { CargoString } from '../types/cargoString'
import {CargoForm} from './cargoForm'
import MatchMediaMock from 'jest-matchmedia-mock';

let matchMedia;

const getMockCargo = (name:string): CargoString => {
  return {
    uuid: v4(),
    name,
    weightEA: '1',
    fs: '12',
    qty: '1',
    category: Category.User,
  }
}

describe('CargoForm', () => {

  beforeAll(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    matchMedia = new MatchMediaMock();
  });

  it('will render', async () => { 
    const cargo = getMockCargo('cargo0')
    CargoStore.getState().putCargosIsValid(new Map<string,boolean>([[cargo.uuid, false]]))
    CargoStore.getState().putCargos([cargo])
    const {getByText, queryAllByText } = renderWrapped(<CargoForm cargo={cargo}/>)
    await waitFor(() => expect(queryAllByText('Loading Test').length).toBe(0))

    expect(getByText('Name')).toBeInTheDocument()
  })

  it('will update CargoStore', async () => {
    // given
    const cargo = getMockCargo('cargo0')
    CargoStore.getState().putCargosIsValid(new Map<string,boolean>([[cargo.uuid, false]]))
    CargoStore.getState().putCargos([cargo])
    const ct = renderWrapped(<CargoForm cargo={cargo}/>)
    await waitFor(() => expect(ct.queryAllByText('Loading Test').length).toBe(0))

    // when
    fireEvent.change(ct.getByLabelText('Name'), { target: { value: 'new name' } })
    fireEvent.change(ct.getByLabelText('WeightEA'), { target: { value: '100' } })
    fireEvent.change(ct.getByLabelText('Fs'), { target: { value: '100' } })
    fireEvent.change(ct.getByLabelText('Qty'), { target: { value: '1' } })
    
    // then 
    await waitFor(() => {

      expect(CargoStore.getState().cargoMap.get(cargo.uuid))
      .toStrictEqual({
        ...cargo,
        name: 'new name',
        weightEA: '100',
        fs: '100',
        qty: '1'
      })

      expect(CargoStore.getState().cargoValidMap.get(cargo.uuid))
      .toBe(true)
    })
  })
})
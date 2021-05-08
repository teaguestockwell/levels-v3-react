import {fireEvent, waitFor} from '@testing-library/react'
import {TankRow} from './tank_row'
import {renderWrapped} from '../testUtils/render_wrapped'
import {CargoStore} from '../hooks/cargo_store'
import {mockAircraftsDeep} from '../testUtils/mock_aircrafts_deep'
import {Category} from '../types/aircraftDeep'
import {CargoString} from '../types/cargoString'
import MatchMediaMock from 'jest-matchmedia-mock'

const tank = mockAircraftsDeep[0].tanks[0]
const cargoString: CargoString = {
  uuid: '0',
  name: 'Tank 1',
  weightEA: '250',
  fs: '900',
  qty: '1',
  category: Category.Tank,
  isValid: true,
}

const setup = () => {
  CargoStore.getState().putCargos([cargoString])
}

describe('TankRow', () => {
  let matchMedia

  beforeAll(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    matchMedia = new MatchMediaMock()
  })

  it('will render', async () => {
    setup()
    const ct = renderWrapped(<TankRow tank={tank} cargoString={cargoString} />)
    await waitFor(() =>
      expect(ct.queryAllByText('Loading Test').length).toBe(0)
    )
    expect(ct.queryAllByText('250').length).toBe(1)
  })

  it('will change tank weight and fs', async () => {
    // given
    const {getByText, queryAllByText} = renderWrapped(
      <TankRow tank={tank} cargoString={cargoString} />
    )
    await waitFor(() => expect(queryAllByText('Loading Test').length).toBe(0))

    CargoStore.getState().putCargos([cargoString])
    expect(CargoStore.getState().cargoMap.get('0')).toStrictEqual(cargoString)

    // when tank weight is changed
    fireEvent.mouseDown(getByText('250'))
    await waitFor(() => expect(queryAllByText('500').length).toBe(2))
    fireEvent.click(queryAllByText('500')[1])

    // cargoMap weight and fs will change for that tanks selected cargoString
    await waitFor(() => {
      expect(CargoStore.getState().cargoMap.get('0')).toStrictEqual({
        ...cargoString,
        weightEA: '500',
        fs: '1120',
      })
    })
  })
})

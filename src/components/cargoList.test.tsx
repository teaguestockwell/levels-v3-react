import {v4} from 'uuid'
import {CargoStore} from '../hooks/CargoStore'
import {renderWrapped, waitFor} from '../testUtils/RenderW'
import {Category} from '../types/aircraftDeep'
import {CargoString} from '../types/cargoString'
import {CargoList} from './CargoList'
import MatchMediaMock from 'jest-matchmedia-mock'

let matchMedia

const getMockCargo = (name: string): CargoString => {
  return {
    uuid: v4(),
    name,
    weightEA: '1',
    fs: '12',
    qty: '1',
    category: Category.User,
    isValid: false,
  }
}
describe('CargoList', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  beforeAll(() => (matchMedia = new MatchMediaMock()))

  it('will render', async () => {
    const cargo = getMockCargo('cargo0')
    CargoStore.getState().putCargos([cargo])
    const {getByText, queryAllByText} = renderWrapped(
      <CargoList category={Object.values(Category)} />
    )
    await waitFor(() => expect(queryAllByText('Loading Test').length).toBe(0))

    expect(getByText('1 EA cargo0')).toBeInTheDocument()
  })

  it('will only render the given category s', async () => {
    const cargo = getMockCargo('cargo0')
    CargoStore.getState().putCargos([cargo])
    const {queryAllByText} = renderWrapped(
      <CargoList category={[Category.Extra]} />
    )
    await waitFor(() => expect(queryAllByText('Loading Test').length).toBe(0))

    expect(queryAllByText('1 EA cargo0').length).toBe(0)
  })
})

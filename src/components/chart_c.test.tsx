import {CargoStore} from '../hooks/cargo_store'
import {renderWrapped, waitFor, fireEvent} from '../testUtils/render_wrapped'
import {ChartC} from './chart_c'
import MatchMediaMock from 'jest-matchmedia-mock'
import { v4 } from 'uuid'
import { Category } from '../types/aircraftDeep'

let matchMedia

const putChartC = () => CargoStore.getState().putCargos([
  {
    name: 'Basic Aircraft',
    weightEA: '0', 
    fs: '0',
    qty: '1',
    isValid: false, 
    uuid: v4(),
    category: Category.BasicAircraft 
  },
])

describe('ChartC', () => {
  beforeAll(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    matchMedia = new MatchMediaMock()
  })

  it('will render', async () => {
    putChartC()
    
    const {getByText, queryAllByText} = renderWrapped(
      <ChartC/>
    )
    await waitFor(() => expect(queryAllByText('Loading Test').length).toBe(0))
    
    await waitFor(() => {
      expect(getByText('Weight')).toBeInTheDocument()
    })
    
  })
 
  it('will update CargoStore', async () => {
    putChartC()
    // given
    const ct = renderWrapped(<ChartC/>)
    await waitFor(() =>
      expect(ct.queryAllByText('Loading Test').length).toBe(0)
    )

    // when
    fireEvent.change(ct.getByLabelText('Weight'), {target: {value: '282000'}})
    fireEvent.change(ct.getByLabelText('Moment'), {target: {value: '26000'}})

    // then
    await waitFor(() => {
      expect({
        // get cargo string value where name === Basic Aircraft
        ...Array.from(CargoStore.getState().cargoMap.entries()).filter(x => x[1].name === 'Basic Aircraft')[0][1],
        uuid: '0',
      }).toStrictEqual({
        category: "BasicAircraft",
        fs: "921.9858156028369",
        isValid: true,
        name: "Basic Aircraft",
        qty: "1",
        uuid: "0",
        weightEA: "282000",
      })
    })
  })
})

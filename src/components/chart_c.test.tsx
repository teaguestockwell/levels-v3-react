import {CargoStore} from '../hooks/cargo_store'
import {renderWrapped, waitFor, fireEvent} from '../testUtils/render_wrapped'
import {ChartC} from './chart_c'
import MatchMediaMock from 'jest-matchmedia-mock'

let matchMedia

describe('ChartC', () => {
  beforeAll(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    matchMedia = new MatchMediaMock()
  })

  it('will render', async () => {
    
    const {getByText, queryAllByText} = renderWrapped(
      <ChartC/>
    )
    await waitFor(() => expect(queryAllByText('Loading Test').length).toBe(0))

    expect(getByText('Weight')).toBeInTheDocument()
    expect(Array.from(CargoStore.getState().cargoMap.entries()).filter(x => x[1].name === 'Basic Aircraft').length).toBe(1)
    
  })

  it('will update CargoStore', async () => {
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

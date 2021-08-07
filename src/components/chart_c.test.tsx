import {userStore} from '../hooks/user_store'
import {renderWrapped, waitFor, fireEvent} from '../testUtils/render_wrapped'
import {ChartC} from './chart_c'

import {Category} from '../types/aircraftDeep'



const putChartC = () =>
  userStore.getState().putCargos([
    {
      name: 'Basic Aircraft',
      weightEA: '0',
      fs: '0',
      qty: '1',
      isValid: false,
      uuid: '1',
      category: Category.BasicAircraft,
    },
  ])

describe('ChartC', () => {

  it('will render', async () => {
    putChartC()

    const {getByText, queryAllByText} = renderWrapped(<ChartC />)
    await waitFor(() => expect(queryAllByText('Loading Test').length).toBe(0))

    await waitFor(() => {
      expect(getByText('Basic Weight')).toBeInTheDocument()
    })
  })

  it('will update CargoStore', async () => {
    putChartC()
    // given
    const ct = renderWrapped(<ChartC />)
    await waitFor(() =>
      expect(ct.queryAllByText('Loading Test').length).toBe(0)
    )

    // when
    fireEvent.change(ct.getByLabelText('Basic Weight'), {
      target: {value: '282000'},
    })
    fireEvent.change(ct.getByLabelText('Basic Moment'), {
      target: {value: '26000'},
    })

    // then
    await waitFor(() => {
      expect(userStore.getState().cargoMap.get('1')).toStrictEqual({
        category: 'BasicAircraft',
        fs: '921.9858156028369',
        isValid: true,
        name: 'Basic Aircraft',
        qty: '1',
        uuid: '1',
        weightEA: '282000',
      })
    })
  })
})

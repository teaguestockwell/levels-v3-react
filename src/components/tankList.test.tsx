/* eslint-disable @typescript-eslint/no-unused-vars */
import {fireEvent, waitFor} from '@testing-library/react'
import {TankList} from './tankList'
import {renderWrapped} from '../testUtils/renderW'
import {CargoStore} from '../hooks/cargoStore'
import {mockAircraftsDeep} from '../testUtils/mockAircraftsDeep'
import {Category} from '../types/aircraftDeep'
import {CargoString} from '../types/cargoString'
import {getActionsAS} from '../hooks/airStore'

const air = mockAircraftsDeep[0]
const cargoString: CargoString = {
  uuid: '0',
  name: 'Tank 1',
  weightEA: '250',
  fs: '900',
  qty: '1',
  category: Category.Tank,
}

describe('TankList', () => {
  it('will render', async () => {
    getActionsAS().setSelectedAir(air)
    const {getByText, queryAllByText, debug} = renderWrapped(<TankList />)
    await waitFor(() => expect(queryAllByText('Loading Test').length).toBe(0))
    expect(getByText('Tank 1: 250')).toBeInTheDocument()
    expect(getByText('Tank 2 ER: 250')).toBeInTheDocument()
    expect(getByText('Tank 3 ER: 250')).toBeInTheDocument()
    expect(getByText('Tank 4: 250')).toBeInTheDocument()
  })

  it('will put all tanks into cargoStore on first render', async () => {
    // given
    getActionsAS().setSelectedAir(air)
    CargoStore.getState().resetCargoStore()
    expect(CargoStore.getState().cargoMap.size).toBe(0)
    const {getByText, queryAllByText, debug} = renderWrapped(<TankList />)
    await waitFor(() => expect(queryAllByText('Loading Test').length).toBe(0))

    expect(
      Array.from(CargoStore.getState().cargoMap.entries()).map<string>(
        (x) => x[1].weightEA
      )
    ).toStrictEqual(['250', '250', '250', '250'])
  })
})

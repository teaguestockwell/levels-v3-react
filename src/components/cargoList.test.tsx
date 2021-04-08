import {fireEvent, waitFor } from '@testing-library/react'
import {CargoList} from './cargoList'
import {AddASelect} from './addASelect'
import {renderWrapped} from '../testUtils/renderW'
import { CargoStore } from '../hooks/cargoStore'
import { Category } from '../types/aircraftDeep'
import { CargoString } from '../types/cargoString'
import { v4 } from 'uuid'

const getMockCargo = (name:string): CargoString => {
  return {
    uuid: v4(),
    name,
    weightEach: '1',
    fs: '123',
    qty: '1',
    category: Category.User,
  }
}

describe('CargoList', () => {

  it('will render', async () => { 
    CargoStore.getState().putCargos([getMockCargo('cargo0')])
    // const {getByText , debug, queryAllByText} = renderWrapped(<CargoList category={[
    //   Category.Emergency,
    //   Category.Extra,
    //   Category.Steward,
    //   Category.User,
    // ]}/>)
    const {queryAllByText, debug} = renderWrapped(<AddASelect/>)
    await waitFor(() => expect(queryAllByText('Loading Test').length).toBe(0))

    debug()
  })

})
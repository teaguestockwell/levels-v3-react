/* eslint-disable @typescript-eslint/no-unused-vars */
import {render, waitFor,screen} from '@testing-library/react'
import {filterKeys, GetMacButton, ModalOpen} from './get_mac_button'
import {renderWrapped} from '../testUtils/render_wrapped'
import {userStore} from '../hooks/user_store'
import * as Types from '../types'
import { getPerMac } from '../utils/util'
import { mockAircraftsDeep } from '../testUtils/mock_aircrafts_deep'



describe('GetMacButton', () => {

  it('will render', async () => {
    const ct = renderWrapped(<GetMacButton />)
    const invalidCargo: Types.CargoString = {
      uuid: '123',
      category: Types.CargoCategory.User,
      name: 'as',
      weightEA: '123',
      fs: '123',
      qty: '123',
      isValid: false,
    }

    userStore.getState().putCargos([invalidCargo])
    await waitFor(() =>
      expect(ct.queryAllByText('Loading Test').length).toBe(0)
    )
    expect(ct.getByText('%MAC: Invalid')).toBeInTheDocument()
  })

  it('shows work', async () => {
    const c17aER = mockAircraftsDeep[0]
    const cargoStrings: Types.CargoString[] = [
      {
        uuid: '0',
        name: 'Basic Aircraft',
        weightEA: '282000',
        fs: '922',
        qty: '1',
        category: Types.CargoCategory.BasicAircraft,
        isValid: true,
      },
      {
        uuid: '1',
        name: 'Tank 1',
        weightEA: '250', // 1C-17A-5-2 2-29: tank1: 250lb, 28 simp mom
        fs: '1120', // = 28 simple mom * 10,000 simple moment modifier / 250
        qty: '1',
        category: Types.CargoCategory.Tank,
        isValid: true,
      },
      {
        uuid: '2',
        name: 'Tank 2 ER',
        weightEA: '25750', // 1C-17A-5-2 2-32: tank 2 ER: 25750lb, 2053 simp mom
        fs: '797.281553398', // = 2053 simple mom * 10,000 simple moment modifier / 25750
        qty: '1',
        category: Types.CargoCategory.Tank,
        isValid: true,
      },
      {
        uuid: '3',
        name: 'Tank 3 ER',
        weightEA: '4500', // 1C-17A-5-2 2-29: tank 3 ER: 4500lb, 380 simp mom
        fs: '844.44444444444444', // = 380 simple mom * 10,000 simple moment modifier / 4500
        qty: '1',
        category: Types.CargoCategory.Tank,
        isValid: true,
      },
      {
        uuid: '4',
        name: 'Tank 4',
        weightEA: '36750', // 1C-17A-5-2 2-34: tank 4: 36750lb, 3,636 simp mom
        fs: '989.387755102', // = 3,636 simple mom * 10,000 simple moment modifier / 36750
        qty: '1',
        category: Types.CargoCategory.Tank,
        isValid: true,
      },
    ]

    const permac = getPerMac(c17aER, cargoStrings)

    expect(permac).toStrictEqual({
      qtyGrandTotal: '5.00',
      momentMultiplier: '10000.00',
      mac: '309.50',
      lemac: '793.60',
      balArm: '919.04',
      momentGrandTotal: '320974000.00',
      simpleMomentGrandTotal: '32097.40',
      weightGrandTotal: '349250.00',
      percentMacDecimal: '0.4053',
      percentMacPercent: '40.53%',
      items: [
        {
          uuid: '0',
          name: 'Basic Aircraft',
          weightEA: '282000.00',
          fs: '922',
          qty: '1',
          category: 'BasicAircraft',
          momentEach: '260004000.00',
          simpleMomentEach: '26000.40',
          weightTotal: '282000.00',
          momentTotal: '260004000.00',
          simpleMomentTotal: '26000.40',
          isValid: true,
        },
        {
          uuid: '1',
          name: 'Tank 1',
          weightEA: '250.00',
          fs: '1120',
          qty: '1',
          category: 'Tank',
          momentEach: '280000.00',
          simpleMomentEach: '28.00',
          weightTotal: '250.00',
          momentTotal: '280000.00',
          simpleMomentTotal: '28.00',
          isValid: true,
        },
        {
          uuid: '2',
          name: 'Tank 2 ER',
          weightEA: '25750.00',
          fs: '797.281553398',
          qty: '1',
          category: 'Tank',
          momentEach: '20530000.00',
          simpleMomentEach: '2053.00',
          weightTotal: '25750.00',
          momentTotal: '20530000.00',
          simpleMomentTotal: '2053.00',
          isValid: true,
        },
        {
          uuid: '3',
          name: 'Tank 3 ER',
          weightEA: '4500.00',
          fs: '844.44444444444444',
          qty: '1',
          category: 'Tank',
          momentEach: '3800000.00',
          simpleMomentEach: '380.00',
          weightTotal: '4500.00',
          momentTotal: '3800000.00',
          simpleMomentTotal: '380.00',
          isValid: true,
        },
        {
          uuid: '4',
          name: 'Tank 4',
          weightEA: '36750.00',
          fs: '989.387755102',
          qty: '1',
          category: 'Tank',
          momentEach: '36360000.00',
          simpleMomentEach: '3636.00',
          weightTotal: '36750.00',
          momentTotal: '36360000.00',
          simpleMomentTotal: '3636.00',
          isValid: true,
        },
      ],
    })

    render(<ModalOpen perMac={permac} cb={() => {return}}/>)

    expect(screen.getByText('40.53%')).toBeInTheDocument()

  })
})
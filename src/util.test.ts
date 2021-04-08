import {Const} from './const'
import * as util from './util'
import {mockAircraftsDeep} from './testUtils/mockAircraftsDeep'
import {Cargo, Category} from './types/aircraftDeep'
import {CargoString} from './types/cargoString'
import {v4} from 'uuid'
import {getNewCustomCargoString} from './util'

const mockCargo: Cargo = {
  aircraftId: 1,
  cargoId: 1,
  updated: new Date(),
  updatedBy: 'unknown',
  name: 'Water Container (5 Gallon)',
  weight: 40,
  fs: 358,
  category: Category.Steward,
}

describe('cut()', () =>
  it('will cut long strings', () => {
    expect(util.cut('a')).toBe('a')
    expect(util.cut('a'.repeat(200))).toBe(
      'a'.repeat(Const.MAX_FORM_LENGTH - 3) + '...'
    )
  }))

describe('formatDate()', () =>
  it('will format dates', () => {
    expect(util.formatDate(new Date('1995-12-17T03:24:00'))).toBe(
      '1995-12-17 11:24 Zulu'
    )
  }))

describe('getCargoSchema()', () =>
  it('will get cargo schema from an aircraft', () => {
    const schema = util.getCargoSchema(mockAircraftsDeep[0])

    const validCargo: CargoString = {
      uuid: v4(),
      name: 'valid cargo',
      weightEA: '100',
      fs: '100',
      qty: '1',
      category: Category.User,
    }

    const inValidCargo: CargoString = {
      uuid: v4(),
      name: 'valid cargo',
      weightEA: 'one two three four',
      fs: '100',
      qty: '1',
      category: Category.Emergency,
    }

    expect(schema.fullObjSchema.isValidSync(validCargo)).toBe(true)
    expect(schema.fullObjSchema.isValidSync(inValidCargo)).toBe(false)
  }))

describe('cargoToNewCargosString()', () =>
  it('will construct unique CargoStrings from type Cargo with category.user', () => {
    const cargoString0 = util.cargoToNewCargoString(mockCargo, 1)
    const cargoString1 = util.cargoToNewCargoString(mockCargo, 1)

    expect(cargoString0.category).toBe(Category.User)
    expect(cargoString0).not.toStrictEqual(cargoString1)
  }))

describe('configToNewCargoStrings()', () =>
  it('will construct unique CargoStrings from type config', () => {
    const cargoStrings: CargoString[] = util.configToNewCargoStrings(
      mockAircraftsDeep[0].configs[0]
    )

    expect(cargoStrings.every((c) => c.category === Category.User)).toBe(false)
    expect(cargoStrings.length).not.toBe(0)
  }))

describe('getNewCustomCargoString()', () =>
  it('will construct unique CargoStrings with category.user', () => {
    expect(getNewCustomCargoString()).not.toStrictEqual(
      util.getNewCustomCargoString()
    )
  }))

describe('capitalizeFirst()', () =>
  it('will capitalize first char of string', () =>
    expect(util.capitalizeFirst('teague')).toBe('Teague')))

describe('getPerMac', () => {
  it('will calculate and format cargoStrings into a new PerMac', () => {})
})

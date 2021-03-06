import {Const} from './const'
import * as util from './util'
import {mockAircraftsDeep} from '../testUtils/mock_aircrafts_deep'
import * as Types from '../types'
import {v4} from 'uuid'
import {
  getCargoStringFromTank,
  getFSofSimpleMoment,
  getCargoString,
  getPerMac,
  getCargoStringFromChartC,
  getQueryString,
  getQueryObjFromEP,
  getNewModelFromEP,
} from './util'

describe('cut()', () =>
  it('will cut long strings', () => {
    expect(util.cut('a')).toBe('a')
    expect(util.cut('a'.repeat(200))).toBe(
      'a'.repeat(Const.MAX_FORM_LENGTH - 3) + '...'
    )
  }))

describe('formatDate()', () =>
  it('will format dates', () => {
    expect(util.formatDate(new Date('2020-04-13T00:00:00.000+08:00'))).toBe(
      '2020/04/12 16:00 Z'
    )
  }))

describe('getCargoSchema()', () =>
  it('will get cargo schema from an aircraft', () => {
    const schema = util.getCargoSchema(mockAircraftsDeep[0])

    const validCargo: Types.CargoString = {
      uuid: v4(),
      name: 'valid cargo',
      weightEA: '100',
      fs: '100',
      qty: '1',
      category: Types.CargoCategory.User,
      isValid: true,
    }

    const inValidCargo: Types.CargoString = {
      uuid: v4(),
      name: 'valid cargo',
      weightEA: 'one two three four',
      fs: '100',
      qty: '1',
      category: Types.CargoCategory.Emergency,
      isValid: false,
    }

    expect(schema.fullObjSchema.isValidSync(validCargo)).toBe(true)
    expect(schema.fullObjSchema.isValidSync(inValidCargo)).toBe(false)
  }))

describe('getQueryString()', () => {
  it('filters keys that contain id to make a query string', () => {
    const config = mockAircraftsDeep[0].configs[0]
    expect(getQueryString(config)).toBe('aircraftId=1&configId=1')
  })
})

describe('getChartCSchema()', () =>
  it('will get schema from an aircraft', () => {
    const schema = util.getChartCSchema(mockAircraftsDeep[0])

    const valid = {
      weight: '282000',
      mom: '26000',
    }

    const inValid = {
      weight: '1',
      mom: '1',
    }

    expect(schema.fullObjSchema.isValidSync(valid)).toBe(true)
    expect(schema.fullObjSchema.isValidSync(inValid)).toBe(false)
  }))

describe('getCargoStringFromChartC()', () =>
  it('will get cargo string', () => {
    const momMultiplyer = 10000
    const uuid = '0'

    const valid: Types.ChartcCargoString = {
      weight: '282000',
      mom: '26000',
      isValid: true,
    }

    const inValid: Types.ChartcCargoString = {
      weight: '1',
      mom: '1',
      isValid: false,
    }

    expect(getCargoStringFromChartC(momMultiplyer, valid, uuid)).toStrictEqual({
      category: 'BasicAircraft',
      fs: '921.9858156028369',
      isValid: true,
      name: 'Basic Aircraft',
      qty: '1',
      uuid: '0',
      weightEA: '282000',
    })
    expect(
      getCargoStringFromChartC(momMultiplyer, inValid, uuid)
    ).toStrictEqual({
      category: 'BasicAircraft',
      fs: '0',
      isValid: false,
      name: 'Basic Aircraft',
      qty: '1',
      uuid: '0',
      weightEA: '1',
    })
  }))

describe('getCargoStringFromCargo()', () =>
  it('will construct unique CargoStrings from type Cargo with category.user', () => {
    const mockCargo: Types.Cargo = {
      aircraftId: 1,
      cargoId: 1,
      updated: new Date(),
      updatedBy: 'unknown',
      name: 'Water Container (5 Gallon)',
      weight: 40,
      fs: 358,
      category: Types.CargoCategory.Steward,
    }

    const cargoString0 = util.getCargoStringFromCargo(mockCargo, 1)
    const cargoString1 = util.getCargoStringFromCargo(mockCargo, 1)

    expect(cargoString0.category).toBe(Types.CargoCategory.User)
    expect(cargoString0).not.toStrictEqual(cargoString1)
  }))

describe('getCargoStringsFromConfig()', () =>
  it('will construct unique CargoStrings from type config', () => {
    const cargoStrings: Types.CargoString[] = util.getCargoStringsFromConfig(
      mockAircraftsDeep[0].configs[0]
    )

    expect(cargoStrings.every((c) => c.category === Types.CargoCategory.User)).toBe(false)
    expect(cargoStrings.length).not.toBe(0)
  }))

describe('getCargoString()', () =>
  it('will construct unique CargoStrings with category.user', () => {
    expect(getCargoString()).not.toStrictEqual(util.getCargoString())
  }))

describe('capitalizeFirst()', () =>
  it('will capitalize first char of string', () =>
    expect(util.capitalizeFirst('teague')).toBe('Teague')))

describe('getFSofSimpleMoment()', () =>
  it('will return 1120', () =>
    expect(
      getFSofSimpleMoment({
        simpleMom: 28,
        momMultiplier: 10000,
        weightEA: 250,
        qty: 1,
      })
    ).toBe(1120)))

describe('getCargoStringFromTank()', () =>
  it('will return new CargoString from a tank', () => {
    const air = mockAircraftsDeep[0]
    const idx = 0 // selected 250lbs
    const momMultiplyer = air.momMultiplyer
    const tank = air.tanks[0]

    const test = getCargoStringFromTank({tank, momMultiplyer, idx})
    expect({...test, uuid: '0'}).toStrictEqual({
      name: 'Tank 1',
      weightEA: '250',
      fs: '1120',
      qty: '1',
      uuid: '0',
      category: Types.CargoCategory.Tank,
      isValid: true,
    })
  }))

  describe('getCargoStringFromTank2()', () =>
  it('will return new CargoString from tank props', () => {
    const air = mockAircraftsDeep[0]
    const momMultiplyer = air.momMultiplyer
    const tank = air.tanks[0]
    const weights =  tank.weightsCSV.split(',')
    const moms = tank.simpleMomsCSV.split(',')
    const idx = 0 // selected 250lbs
    const newMom = Number(moms[idx])
    const newWeightEA = Number(weights[idx])

    const test = {
      ...util.getCargoStringFromTank2({
        tankName: tank.name,
        weightEA: newWeightEA,
        simpleMom: newMom,
        momMultiplyer,
      }),
      uuid: '0',
    }

    expect({...test, uuid: '0'}).toStrictEqual({
      name: 'Tank 1',
      weightEA: '250',
      fs: '1120',
      qty: '1',
      uuid: '0',
      category: Types.CargoCategory.Tank,
      isValid: true,
    })

  }))

describe('getPerMac', () => {
  it('will calculate and format cargoStrings into a new PerMac', () => {
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

    expect(getPerMac(c17aER, cargoStrings)).toStrictEqual({
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
  })
})

describe('removeNestedObj()', () => {
  it('returns new obj where obj.values !== Object', () => {
    const nestedObj = {
      name: 'hello',
      weight: 123,
      nested0: [1, 2, 3],
      nested1: {
        name: 'hi',
        nest: [
          {
            hi: 's',
          },
        ],
      },
    }

    expect(util.removeNestedObj(nestedObj)).toStrictEqual({
      name: 'hello',
      weight: 123,
    })
  })
})

describe('getQueryObjFromEP()', () => {
  it('return an obj with query params given an endpoint', () => {
    const ep = 'configCargo?aircraftId=1&configId=1'
    const qsObj = getQueryObjFromEP(ep)

    expect(qsObj).toStrictEqual({
      aircraftId: 1,
      configId: 1,
      model: 'configCargo',
    })
  })
})

describe('isTankCSVSameLen', () => {
  it('validates moms.len === weights.len', () => {
    // given not null, and and array of nums as csv
    const invalid = {simpleMomsCSV: '1,2,3', weightsCSV: '1   , 3'}
    expect(util.validateIsTanksCSVSameLen(invalid)).toBe(false)
  })

  it('validates moms.len === weights.len', () => {
    // given not null, and and array of nums as csv
    const valid = {simpleMomsCSV: '1,2,3', weightsCSV: '1   ,2, 3'}
    const valid1 = {simpleMomsCSV: '1', weightsCSV: '1  '}
    expect(util.validateIsTanksCSVSameLen(valid)).toBe(true)
    expect(util.validateIsTanksCSVSameLen(valid1)).toBe(true)
  })
})

describe('Const', () => {
  it('has valid yup tests', () => {
    const test = Const.schema.numCSV
    expect(test.isValidSync('1,2,3')).toBe(true)
  }),
    it('has invalid yup tests', () => {
      const test = Const.schema.numCSV
      expect(test.isValidSync('1,s,3')).toBe(false)
    })
})

describe('getNewModelFromEP', () => {
  it('creates a new cargoString to edit based on the current ep state', () => {
    const ep = 'cargo'
    const test = getNewModelFromEP(ep)
    expect(test).toStrictEqual({
      cargoId: 0,
      category: '',
      fs: '',
      name: '',
      weight: '',
    })
  })
})

import axios from 'axios'
import {mockAircraftDeep} from './mockAircraftDeep'

describe('Server', () => {
  it('should mock res from http://localhost:8080/fl-api/aircraft', async () => {
    const data = (await axios.get('http://localhost:8080/fl-api/aircraft')).data
    expect(data).toStrictEqual(mockAircraftDeep)
  })
})
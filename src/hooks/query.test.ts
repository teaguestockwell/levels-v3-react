import {getBaseURL, unRegisterSW} from './query'

it('gets prod url', () => expect(getBaseURL('https://levels.apps.dso.mil')).toBe(process.env.REACT_APP_API_BASE_URL_PROD))
it('gets staging url', () =>  expect(getBaseURL('https://levels.staging.dso.mil')).toBe(process.env.REACT_APP_API_BASE_URL_STAGING))
it('gets lan url', () =>  expect(getBaseURL('http://192.168.0.23:8080/')).toBe(process.env.REACT_APP_API_BASE_URL_LAN))
it('gets local url', ()=> expect(getBaseURL()).toBe(process.env.REACT_APP_API_BASE_URL_LOCAL))

it('should throw an error when un run reg service worker', async () => {
  await expect(unRegisterSW()).rejects.toThrow()
})

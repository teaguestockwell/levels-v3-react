// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'
import './testUtils/server'
import MatchMediaMock from 'jest-matchmedia-mock'
jest.setTimeout(10000)


let matchMedia

beforeAll(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  matchMedia = new MatchMediaMock()
})

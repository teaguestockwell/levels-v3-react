import {setupServer} from 'msw/node'
import {rest} from 'msw'
import {mockAircraftDeepString} from './mockAircraftsDeep'

const endPoints = [
  rest.get('http://localhost:8080/fl-api/aircraft', (req, res, ctx) => {
    return res(ctx.status(200), ctx.body(mockAircraftDeepString))
  }),
]

export const server = setupServer(...endPoints)

// Establish API mocking before all tests.
beforeAll(() => server.listen())
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers())
// Clean up after the tests are finished.
afterAll(() => server.close())


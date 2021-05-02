import {setupServer} from 'msw/node'
import {rest} from 'msw'
import {mockAircraftDeepString} from './mock_aircrafts_deep'

const endPoints = [
  rest.get('http://localhost:8080/fl-api/aircraft', (req, res, ctx) => {
    return res(ctx.status(200), ctx.body(mockAircraftDeepString))
  }),

  rest.get('http://localhost:8080/fl-api/empty', (req, res, ctx) => {
    return res(ctx.status(200), ctx.body('[]'))
  }),

  rest.get('http://localhost:8080/fl-api/error', (req, res, ctx) => {
    return res(ctx.status(400), ctx.body('error'))
  }),

  rest.put('http://localhost:8080/fl-api/*', (req, res, ctx) => {
    return res(ctx.status(200))
  }),

  rest.delete('http://localhost:8080/fl-api/*', (req, res, ctx) => {
    return res(ctx.status(200))
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

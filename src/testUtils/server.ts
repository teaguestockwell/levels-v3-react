import { setupServer } from 'msw/node'
import { rest } from 'msw'
import {mockAircraftDeepString} from './mockAircraftDeep'

const handlers = [
  rest.get('http://localhost:8080/fl-api/aircraft', (req, res, ctx)=>{
    return res(
      ctx.status(200),
      ctx.body(mockAircraftDeepString)
    )
  }),
]
// Establish API mocking before all tests.
beforeAll(() => server.listen())
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers())
// Clean up after the tests are finished.
afterAll(() => server.close())

export const server = setupServer(...handlers)
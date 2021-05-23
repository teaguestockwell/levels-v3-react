import {waitFor} from '@testing-library/react'
import {userStore} from '../hooks/user_store'
import {renderWrapped} from '../testUtils/render_wrapped'

describe('RenderWrapped', () => {
  it('renders stuff for tests', async () => {
    const initState = userStore.getState()
    expect(initState.air).toBe(undefined)
    expect(initState.cargoSchema).toBe(undefined)

    const ct = renderWrapped(<div>loaded state</div>)
    await waitFor(() =>
      expect(ct.queryAllByText('Loading Test').length).toBe(0)
    )

    await waitFor(() =>
      expect(ct.queryAllByText('loaded state').length).toBe(1)
    )
    const loadedState = userStore.getState()
    expect(loadedState.air).toBeTruthy()
    expect(loadedState.cargoSchema).toBeTruthy()
  })
})

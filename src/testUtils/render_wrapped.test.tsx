import {waitFor} from '@testing-library/react'
import {AirStore} from '../hooks/air_store'
import {renderWrapped} from '../testUtils/render_wrapped'

describe('RenderWrapped', () => {
  it('renders stuff for tests', async () => {
    const initState = AirStore.getState()
    expect(initState.selectedAir).toBe(undefined)
    expect(initState.cargoSchema).toBe(undefined)

    const ct = renderWrapped(<div>loaded state</div>)
    await waitFor(() =>
      expect(ct.queryAllByText('Loading Test').length).toBe(0)
    )

    await waitFor(() =>
      expect(ct.queryAllByText('loaded state').length).toBe(1)
    )
    const loadedState = AirStore.getState()
    expect(loadedState.selectedAir).toBeTruthy()
    expect(loadedState.cargoSchema).toBeTruthy()
  })
})

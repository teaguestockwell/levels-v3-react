import {waitFor} from '@testing-library/react'
import {UserAirSelect, onAirChange} from './user_air_select'
import {renderWrapped} from '../testUtils/render_wrapped'
import {userStore} from '../hooks/user_store'
import { mockAircraftsDeep } from '../testUtils/mock_aircrafts_deep'

describe('AirSelect', () => {
  it('will render', async () => {
    const {getByText, queryAllByText} = renderWrapped(<UserAirSelect />)
    await waitFor(() => expect(queryAllByText('Loading Test').length).toBe(0))
    expect(getByText('C-17A-ER')).toBeInTheDocument()
  })

  it('will change air and cargo schema', async () => {
    expect(userStore.getState().air?.name).toBe('C-17A-ER')
    const oldSchema = userStore.getState().cargoSchema

    const {queryAllByText} = renderWrapped(<UserAirSelect />)
    await waitFor(() => expect(queryAllByText('Loading Test').length).toBe(0))

    const data = {aircrafts: mockAircraftsDeep}
    const newName = 'C-17A'

    onAirChange({
      newName,
      data
    })

    expect(oldSchema).not.toEqual(userStore.getState().cargoSchema)
    expect(userStore.getState().air?.name).toBe('C-17A')
  })
})

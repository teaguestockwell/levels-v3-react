import {fireEvent, waitFor} from '@testing-library/react'
import {UserAirSelect} from './user_air_select'
import {renderWrapped} from '../testUtils/render_wrapped'
import {AirStore} from '../hooks/air_store'

describe('AirSelect', () => {
  it('will render', async () => {
    const {getByText, queryAllByText} = renderWrapped(<UserAirSelect />)
    await waitFor(() => expect(queryAllByText('Loading Test').length).toBe(0))
    expect(getByText('C-17A-ER')).toBeInTheDocument()
  })

  it('will change air and cargo schema', async () => {
    expect(AirStore.getState().selectedAir?.name).toBe('C-17A-ER')
    const oldSchema = AirStore.getState().cargoSchema

    const {getByText, queryAllByText} = renderWrapped(<UserAirSelect />)
    await waitFor(() => expect(queryAllByText('Loading Test').length).toBe(0))

    fireEvent.mouseDown(getByText('C-17A-ER'))
    await waitFor(() => expect(queryAllByText('C-17A')[0]).toBeTruthy())
    fireEvent.click(queryAllByText('C-17A')[1])

    expect(oldSchema).not.toEqual(AirStore.getState().cargoSchema)
    expect(AirStore.getState().selectedAir?.name).toBe('C-17A')
  })
})
import {fireEvent, waitFor} from '@testing-library/react'
import {AirSelect} from './airSelect'
import {renderWrapped} from '../testUtils/renderW'
import {AirStore} from '../hooks/airStore'

describe('AirSelect', () => {
  it('will render', async () => {
    const {getByText, queryAllByText} = renderWrapped(<AirSelect />)
    await waitFor(() => expect(queryAllByText('Loading Test').length).toBe(0))
    expect(getByText('C-17A-ER')).toBeInTheDocument()
  })

  it('will change air and cargo schema', async () => {
    expect(AirStore.getState().selectedAir?.name).toBe('C-17A-ER')
    const oldSchema = AirStore.getState().cargoSchema

    const {getByText, queryAllByText} = renderWrapped(<AirSelect />)
    await waitFor(() => expect(queryAllByText('Loading Test').length).toBe(0))

    fireEvent.click(getByText('C-17A-ER'))
    await waitFor(() => expect(queryAllByText('C-17A-ER').length).toBe(2))
    fireEvent.click(getByText('C-17A'))

    expect(oldSchema).not.toEqual(AirStore.getState().cargoSchema)
    expect(AirStore.getState().selectedAir?.name).toBe('C-17A')
  })
})

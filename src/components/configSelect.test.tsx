import {fireEvent, waitFor} from '@testing-library/react'
import {ConfigSelect} from './configSelect'
import {renderWrapped} from '../testUtils/renderW'
import {CargoStore} from '../hooks/cargoStore'

describe('AirSelect', () => {
  it('will render', async () => {
    const {getByText, queryAllByText} = renderWrapped(<ConfigSelect />)
    await waitFor(() => expect(queryAllByText('Loading Test').length).toBe(0))
    expect(getByText('No Config')).toBeInTheDocument()
  })

  it('will change config', async () => {
    // given
    const {getByText, queryAllByText} = renderWrapped(<ConfigSelect />)
    await waitFor(() => expect(queryAllByText('Loading Test').length).toBe(0))

    expect(CargoStore.getState().config.name).toBe('No Config')
    expect(CargoStore.getState().configUuids.length).toBe(0)
    expect(CargoStore.getState().cargoMap.size).toBe(0)
    expect(CargoStore.getState().cargoValidMap.size).toBe(0)

    // when config is changed
    fireEvent.click(getByText('No Config'))
    await waitFor(() => expect(queryAllByText('No Config').length).toBe(2))
    fireEvent.click(getByText('AE-1'))
    // button name will change
    await waitFor(() => expect(queryAllByText('No Config').length).toBe(1))

    // then
    await waitFor(() => {
      expect(CargoStore.getState().config.name).toBe('AE-1')
      expect(CargoStore.getState().configUuids.length).not.toBe(0)
      expect(CargoStore.getState().cargoMap.size).not.toBe(0)
      expect(CargoStore.getState().cargoValidMap.size).not.toBe(0)
    })
  })
})

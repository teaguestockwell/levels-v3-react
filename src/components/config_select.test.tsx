import {waitFor} from '@testing-library/react'
import {ConfigSelect, onChange} from './config_select'
import {renderWrapped} from '../testUtils/render_wrapped'
import {userStore} from '../hooks/user_store'
import {mockAircraftsDeep} from '../testUtils/mock_aircrafts_deep'

describe('ConfigSelect', () => {
  it('will render', async () => {
    const {getByText, queryAllByText} = renderWrapped(<ConfigSelect />)
    await waitFor(() => expect(queryAllByText('Loading Test').length).toBe(0))
    expect(getByText('No Config')).toBeInTheDocument()
  })

  it('will change config', async () => {
    // given
    const {queryAllByText} = renderWrapped(<ConfigSelect />)
    await waitFor(() => expect(queryAllByText('Loading Test').length).toBe(0))

    expect(userStore.getState().config.name).toBe('No Config')
    expect(userStore.getState().cargoMap.size).toBe(0)

    const air = mockAircraftsDeep[0]
    const newConfigName = 'AE-2'
    onChange(newConfigName, air)
    
    // then
    await waitFor(() => {
      expect(userStore.getState().config.name).toBe('AE-2')
      expect(userStore.getState().cargoMap.size).not.toBe(0)
    })
  })
})

import {waitFor,screen} from '@testing-library/react'
import {AdminAirSelect, onAirChange} from './admin_air_select'
import {renderWrapped} from '../testUtils/render_wrapped'
import {adminStore, useAir} from '../hooks/admin_store'
import {v4} from 'uuid'
import { mockAircraftsDeep } from '../testUtils/mock_aircrafts_deep'

const SelectedAirStateWrapper = () => {
  useAir()
  return <AdminAirSelect key={v4()} />
}

describe('AdminAirSelect', () => {
  it('will render', async () => {
    const {queryAllByText} = renderWrapped(<SelectedAirStateWrapper />)
    await waitFor(() => expect(queryAllByText('Loading Test').length).toBe(0))
    screen.debug()
    await waitFor(() => expect(queryAllByText('C-17A-ER').length).toBe(1))
  }),
    it('will init select the first aircraft from api res', async () => {
      const ct = renderWrapped(<SelectedAirStateWrapper />)
      await waitFor(() =>
        expect(ct.queryAllByText('Loading Test').length).toBe(0)
      )
      await waitFor(() => expect(ct.queryAllByText('C-17A-ER').length).toBe(1))

      expect(adminStore.getState().air?.name).toBe('C-17A-ER')
    })

  it('will change the change admin aircraft selection', async () => {
    const ct = renderWrapped(<SelectedAirStateWrapper />)
    await waitFor(() =>
      expect(ct.queryAllByText('Loading Test').length).toBe(0)
    )
    await waitFor(() => expect(ct.queryAllByText('C-17A-ER').length).toBe(1))

    const data = mockAircraftsDeep
    const newName = 'C-17A'

    onAirChange(newName, data)

    await waitFor(() => expect(adminStore.getState().air?.name).toBe('C-17A'))
  })
})

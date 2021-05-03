import {fireEvent, waitFor} from '@testing-library/react'
import {AdminAirSelect} from './admin_air_select'
import {renderWrapped} from '../testUtils/render_wrapped'
import {adminStore, useAir} from '../hooks/admin_store'
import {v4} from 'uuid'

const SelectedAirStateWrapper = () => {
  useAir()
  return <AdminAirSelect key={v4()} />
}

describe('AdminAirSelect', () => {
  it('will render', async () => {
    const {queryAllByText} = renderWrapped(<SelectedAirStateWrapper />)
    await waitFor(() => expect(queryAllByText('Loading Test').length).toBe(0))
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

    fireEvent.mouseDown(ct.getByText('C-17A-ER'))
    await waitFor(() => expect(ct.queryAllByText('C-17A')[0]).toBeTruthy());
    fireEvent.click(ct.queryAllByText('C-17A')[1])

    await waitFor(() => expect(adminStore.getState().air?.name).toBe('C-17A'))
  })
})

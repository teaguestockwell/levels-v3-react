import {render, waitFor} from '@testing-library/react'
import {AdminAddNew} from './admin_add_new'
import {adminStore} from '../hooks/admin_store'
import MatchMediaMock from 'jest-matchmedia-mock'

describe('AdminAddNew', () => {
  let mediaMock

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  beforeAll(() => (mediaMock = new MatchMediaMock()))
  it('will render', () => {
    adminStore.getState().setEp('aircraft')
    const ct = render(<AdminAddNew />)
    expect(ct.queryAllByText('Add Aircraft').length).toBe(1)
  })

  it('will re-render when ep changes', async () => {
    adminStore.getState().setEp('aircraft')
    const ct = render(<AdminAddNew />)
    expect(ct.queryAllByText('Add Aircraft').length).toBe(1)

    adminStore.getState().setEp('configCargo?aircraftId=1&configId=1')
    await waitFor(() =>
      expect(ct.queryAllByText('Add ConfigCargo').length).toBe(1)
    )
  })
})

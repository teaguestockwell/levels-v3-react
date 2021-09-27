/* eslint-disable @typescript-eslint/no-unused-vars */
import {Mac} from './mac'
import {renderWrapped, screen, waitFor} from '../testUtils/render_wrapped'

it('will render', async () => {
  renderWrapped(<Mac />)
  await waitFor(() => expect(screen.queryAllByText('Loading Test').length).toBe(0))
  expect(screen.queryAllByTestId('mac-page').length).toBe(1)
})



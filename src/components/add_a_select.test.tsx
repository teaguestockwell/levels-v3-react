import {waitFor} from '@testing-library/react'
import {AddASelect, onChange } from './add_a_select'
import {getUserSchema, userStore} from '../hooks/user_store'
import {renderWrapped} from '../testUtils/render_wrapped'
import {mockAircraftsDeep} from '../testUtils/mock_aircrafts_deep'

describe('AddASelect', () => {
  it('will render', async () => {
    const {getByText, queryAllByText} = renderWrapped(<AddASelect />)
    await waitFor(() => expect(queryAllByText('Loading Test').length).toBe(0))
    expect(getByText('Add Custom Equipment')).toBeInTheDocument()
  })

  it('will add cargo', async () => {
    expect(userStore.getState().cargoMap.size).toBe(0)
    const {queryAllByText} = renderWrapped(<AddASelect />)
    await waitFor(() => expect(queryAllByText('Loading Test').length).toBe(0))

    const value = 'Water Container (5 Gallon)'
    const air = mockAircraftsDeep[0]
    const schema = getUserSchema().fullObjSchema

    onChange(value,air,schema)

  
    await waitFor(() => expect(userStore.getState().cargoMap.size).toBe(1))
    
  }) 
})
 


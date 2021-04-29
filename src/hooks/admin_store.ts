/* eslint-disable @typescript-eslint/no-unused-vars */
import create, { State } from 'zustand'
import { AircraftDeep } from '../types/aircraftDeep'
import isEqual from 'lodash/isEqual'

export interface AdminStoreState extends State {
  air: AircraftDeep | undefined
  ep: string
  editObj: Record<string, undefined> | undefined

  setAir: (air:AircraftDeep) => void,
  setEp: (ep: string) => void,
  setEditObj: (editObj: Record<string, undefined> | undefined) => void
}


const sanitizeNewAirEP = (newId:number, oldEp:string, oldId:number) => {
  if(newId === oldId){
    return oldEp
  }

  if(oldEp.includes('configCargos')){
    return `config?aircraftId=${newId}`
  }

  return oldEp
}

export const adminStore = create<AdminStoreState>((set) => ({
  air: undefined,
  ep: 'aircraft',
  editObj: {},

  setAir: (air) => set((s) => {s.air = air,s.ep = sanitizeNewAirEP(air.aircraftId, s.ep, s.air.aircraftId )}),
  setEp: (ep) => set((s) => {s.ep = ep}),
  setEditObj: (editObj) => set((s) => {s.editObj = editObj})
}))

export const getAdminActions = () => {
  const s = adminStore.getState()
  return {
    setAir: s.setAir,
    setEp: s.setEp,
    setEditObj: s.setEditObj
  }
}
export const useAir = () => adminStore(s => s.air, (a0,a1) => isEqual(a0,a1))

/* eslint-disable @typescript-eslint/no-unused-vars */
import create, {State} from 'zustand'
import {AircraftDeep} from '../types/aircraftDeep'
import isEqual from 'lodash/isEqual'
import {getParamsFromEp, sanitizeNewAirEP} from '../utils/util'

export interface AdminStoreState extends State {
  air: AircraftDeep | undefined
  ep: string
  editObj: Record<string, undefined> | undefined

  setAir: (air: AircraftDeep) => void
  setEp: (ep: string) => void
  setEditObj: (editObj: Record<string, any> | undefined) => void
}

export const adminStore = create<AdminStoreState>((set, get) => ({
  air: undefined,
  ep: 'aircraft',
  editObj: {},

  setAir: (air) => {
    set(s => {
      (s.ep = sanitizeNewAirEP(s.ep, air.aircraftId)), (s.air = air)
    })
  },
  setEp: (ep) =>
    set((s) => {
      s.ep = ep
    }),
  setEditObj: (editObj) =>
    set((s) => {
      s.editObj = editObj
    }),
}))

export const getAdminStoreActions = () => {
  const s = adminStore.getState()
  return {
    setAir: s.setAir,
    setEp: s.setEp,
    setEditObj: s.setEditObj,
  }
}
export const useAir = () =>
  adminStore(
    (s) => s.air,
    (a0, a1) => isEqual(a0, a1)
  )

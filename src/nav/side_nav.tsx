import React from 'react'
import {Mac} from '../pages/mac'
import {Admin} from '../pages/admin'

// page navigation with sidebar / hamburger
// aircrafts state: global read, local update
// selected aircraft state: global read, local update
// last updated datetime display & complete refresh button
// if pages are components rendered from selected page state: how can their individual state be persisted

export const SideNav = () => {
  return (
    <>
      <Mac />
      <Admin />
    </>
  )
}

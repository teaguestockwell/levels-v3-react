import {Select} from 'antd'
import {debounce} from 'lodash'
import create from 'zustand'
import {combine, devtools} from 'zustand/middleware'

export const isMobile = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

export const useSelectOpenStore = create(
  devtools(
    combine(
      {
        isOpen: {} as Record<string,boolean>
      },
      set => ({set})
    ),
    {
      name: 'select-is-open'
    }
  )
)

export const dbToggle = debounce((key:string, open?: boolean) => {

  if(open !== undefined) {useSelectOpenStore.setState({isOpen: {[key]: open}}); return}

  // close all other selects
  useSelectOpenStore.setState(s => ({isOpen: {[key]: !s.isOpen[key]}}))
},50)

export const CustomSelect = (props: any) => {
  const key = props.stateKey
  const open = useSelectOpenStore(state => state.isOpen[props.stateKey] ? true : false)
  const mobile = isMobile()

  return <div
    style={{width: '100%'}}
    // when the device is mobile, dont allow the event to propagate to the input,
    // and open the keyboard instead open the menu
    onClickCapture={(e) => { if(mobile && !open){ e.stopPropagation(); dbToggle(key);}}}
  >
  <Select 
  // on mobile render the menu as bottom modal, on desktop render as inline dropdown
  dropdownRender={!mobile ? undefined : (menu) =>{
    return <div onClick={(e) => { e.stopPropagation(); if(props.toggleOpen){props.toggleOpen()} else{dbToggle(key)}}} 
      style={{position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, bottom: 0, backgroundColor: 'rgba(0,0,0,0.3)'}}>
      <div 
        style={{
          backgroundColor: '#fff',
          zIndex:1001,
          position:'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          borderTop: '1px solid #F1F1F1'
      }}>
      {menu}
    </div>
  </div>
}}
  onClick={(e) => {e.stopPropagation(); dbToggle(key)}} onFocus={() => dbToggle(key)} onBlur={() => dbToggle(key,false)}
  open={open}
  onSelect={props.onSelect}
  {...props}  />
  </div>
}

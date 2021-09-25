import {Select} from 'antd'
import {debounce} from 'lodash'
import React from 'react'

export const isMobile = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

// export const useMobileSelectEffect = (open:boolean) =>  React.useEffect(() => {
//   if (isMobile()) {
//     if (open)  {
//       // dont scroll the document when selecting
//       document.body.style.overflow = 'hidden';
//       (document.getElementsByClassName('mobile-nav')[0]as any).style.visibility = 'hidden';
      
//     } else{
//       document.body.style.overflow = 'auto';
//       (document.getElementsByClassName('mobile-nav')[0]as any).style.visibility = 'visible';
//       // hide the soft keyboard by removing focus
//       (document.activeElement as any).blur()
//     }
//   }

//   return () => {
//     document.body.style.overflow = 'auto';
//     (document.getElementsByClassName('mobile-nav')[0]as any).style.visibility = 'visible';
//   }

// },[open])

export const CustomSelect = (props: any) => {
  const [open,setOpen] = React.useState<boolean>(props.open ?? false)
  const debounceToggle = React.useRef(debounce(() => setOpen(s => !s), 100)).current
  const mobile = isMobile()

  return <div
    style={{width: '100%'}}
    // when the device is mobile, dont allow the event to propagate to the input,
    // and open the keyboard instead open the menu
    onClickCapture={(e) => {
      if(mobile && !open){
        e.stopPropagation()
        debounceToggle()
      }
    }}
  >
  <Select 
  // on mobile render the menu as bottom modal, on desktop render as inline dropdown
  dropdownRender={!mobile ? undefined : (menu) =>{
    return <div 
    style={{backgroundColor: '#fff', zIndex:100, position:'fixed', bottom: 0, left: 0, right: 0, borderTop: '1px solid #000'}}>
      {menu}
    </div>
}}
type='number'
  placement={'bottomCenter'}
  onDropdownVisibleChange={debounceToggle}
  open={props.open ?? open}
  {...props}  />
  </div>
}

import {Select} from 'antd'
import {debounce} from 'lodash'
import React from 'react'

export const useMobileSelectEffect = (open:boolean) =>  React.useEffect(() => {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    if (open)  {
      // dont scroll the document when selecting
      document.body.style.overflow = 'hidden';
      (document.getElementsByClassName('mobile-nav')[0]as any).style.visibility = 'hidden';
    } else{
      document.body.style.overflow = 'auto';
      (document.getElementsByClassName('mobile-nav')[0]as any).style.visibility = 'visible';
      // hide the soft keyboard by removing focus
      (document.activeElement as any).blur()
    }
  }

  return () => {
    document.body.style.overflow = 'auto';
    (document.getElementsByClassName('mobile-nav')[0]as any).style.visibility = 'visible';
  }

},[open])

export const CustomSelect = (props: any) => {
  const [open,setOpen] = React.useState<boolean>(props.open ?? false)
  const debounceToggle = React.useRef(debounce(() => setOpen(s => !s), 100)).current
  useMobileSelectEffect(open)

  return <Select onDropdownVisibleChange={debounceToggle}  open={props.open ?? open} {...props}  />
}

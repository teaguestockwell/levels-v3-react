import React from 'react'
import { AirSyncSelect } from '../nav/air_sync_select'

const Button = ({text, innerStyle, outerStyle, href}: {text:string, innerStyle?: React.CSSProperties, outerStyle?: React.CSSProperties, href: string}) => {
  return <div
  style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '15px 15px 0px 15px',
    ...outerStyle
  }}
  >
  <a
  href={href}
  target="_blank"
  rel="noreferrer"
  >
  <div
  className="hover-button"
  style={{
    background: '#06BA7F',
    color: '#fff',
    borderRadius: 45,
    paddingLeft: 20,
    paddingRight: 20,
    height: 60,
    overflowWrap: 'break-word',
    cursor: 'pointer',
    textAlign: 'center',
    lineHeight: '60px',
    width: 250,
    fontSize: 20,
    ...innerStyle
  }}
  data-testid="contact button"
  >{text}</div>
  </a>
  </div>
}

export const Help = () => {
  return (
    <>
      <AirSyncSelect type='user'/>
      <Button text="Report a Bug" href="https://forms.gle/Bbqvubn6gwC6fRnc8"/>
      <Button text="Contact Us" href="https://tron.dso.mil/contact/"/>
      <Button text="About Platform One" href="https://software.af.mil/team/platformone"/>
      <Button text="About Mattermost" href="https://vimeo.com/showcase/8215297/embed" />
      <Button text="About TRON" href="https://tron.dso.mil"/>
      <Button text="About the Developer" href="https://teaguestockwell.com"/>
      <Button text="About the Code" href="https://code.il2.dso.mil/tron/products/five-level-app/frontend-react" />
    </>
  )
}

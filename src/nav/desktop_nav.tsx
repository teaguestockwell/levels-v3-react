import { Layout, Menu } from "antd"
import { Const } from "../const"
import { navIcons, pageNames, getNavItemStyle} from "./dynamic_main_nav"
import { useState } from "react"
import './desktop_nav.css'

import Sider from "antd/lib/layout/Sider"
// dont use this slider, it will break layout V
//const {Sider} = Layout

export const DesktopNav = (
  {
    page,
    pageName,
    setPage,
    appBar,
    initCollapsed
  }:
  {
    page: JSX.Element,
    pageName: string,
    setPage: (pageName:string) => void,
    appBar: JSX.Element,
    initCollapsed:boolean
  }
) => {
  const [collapsed, setCollapsed] = useState(initCollapsed)

  return <Layout style={{backgroundColor: 'white',}}>
    {appBar}
    <Sider 
      style={{
        paddingTop: Const.HEIGHT.APP_BAR,
        backgroundColor: '#383838', minHeight: '100%', background: '#383838',overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
      }}
      collapsible 
      collapsed={collapsed}
      onCollapse={() => setCollapsed(s => !s)}
      >
        <Menu
          style={{
            height: '100%',
            background: '#383838',
            borderRight: '1px solid #383838',
            paddingTop: '20px'
          }}
          mode="inline"
          defaultSelectedKeys={[pageName]}
          onClick={(x:any) => setPage(String(x.key))}
        >
          {
            pageNames.map(name => 
              <Menu.Item 
                style={{
                  backgroundColor: '#383838',
                  color: name === pageName ? 'white' : '#737373' 
                }}
                icon={navIcons[getNavItemStyle(name,pageName)][name]}
                key={name}
              >
                {collapsed ? null : name}
              </Menu.Item>
            )
          }
        </Menu>
      </Sider>
      <div style={{ paddingLeft: collapsed ? '80px' : '200px'}}>
        {page}
      </div>
  </Layout>
}
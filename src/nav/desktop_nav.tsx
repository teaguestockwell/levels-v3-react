/* eslint-disable @typescript-eslint/no-unused-vars */
import { Affix, Breadcrumb, Col, Layout, Menu, Row, Typography } from "antd"
import Sider from "antd/lib/layout/Sider"
import { Const } from "../const"
import { AppBar } from "./app_bar"
import { getIcon, pages as pageNames } from "./dynamic_main_nav"
import './desktop_nav.css'
import { useState } from "react"

export const DesktopNav = (
  {
    page,
    pageName,
    setPage,
    select,
  }:
  {
    page: JSX.Element,
    pageName: string,
    setPage: (pageName:string) => void,
    select: JSX.Element,
  }
) => {
  const [collapsed, setCollapsed] = useState(window.innerWidth > 1200 ? false : true)
  return <Layout style={{backgroundColor: 'white',}}>
    <AppBar select={select}/>
    <Sider collapsible 
    collapsed={collapsed}
    onCollapse={() => setCollapsed(s => !s)}
    style={{
      paddingTop: Const.HEIGHT.APP_BAR,
      backgroundColor: '#383838', minHeight: '100%', background: '#383838',overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,}}>
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          style={{ height: '100%', background: '#383838', borderRight: '1px solid #383838'}}
          onClick={(x:any) => setPage(x.key)}
        
        >
          {
            pageNames.map(name => 
              <Menu.Item 
                icon={getIcon(name,pageName)}
                key={name}
                style={{backgroundColor: '#383838', color: name === pageName ? 'white' : '#737373'}}
              >
                {name}
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
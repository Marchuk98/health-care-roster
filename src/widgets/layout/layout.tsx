import { ReactNode } from 'react'
import { Outlet } from 'react-router-dom'

import { Header } from '../../shared'

type LayoutProps = {
  children?: ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <Header />
      <div style={{ padding: '20px' }}>{children || <Outlet />}</div>
    </div>
  )
}

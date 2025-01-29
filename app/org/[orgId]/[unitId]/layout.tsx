import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { PropsWithChildren } from "react"

import { AppHeader } from "@/components/layout/app-header"
import { AppSidebar } from "@/components/layout/app-sidebar"

type Props = PropsWithChildren<{
  params: Promise<GlobalParams>
}>

export const experimental_ppr = true

const Layout = async (props: Props) => {
  const { children } = props

  return (
    <SidebarProvider>
      <AppSidebar {...props} />
      <SidebarInset>
        <AppHeader {...props} />
        <div className="m-1.5 flex-1 md:m-2 lg:m-2.5">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default Layout

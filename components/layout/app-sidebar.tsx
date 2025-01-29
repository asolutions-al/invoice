import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { BookOpenIcon, ChevronRight } from "lucide-react"
import { getTranslations } from "next-intl/server"
import Link from "next/link"
import { Suspense } from "react"
import { AppSidebarUser } from "./app-sidebar-user"

const OrgContent = async ({ orgId }: { orgId: string }) => {
  const t = await getTranslations()
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{t("Organization")}</SidebarGroupLabel>
      <SidebarMenu>
        <Collapsible asChild defaultOpen className="group/collapsible">
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton tooltip={t("Unit")}>
                <BookOpenIcon />
                <span>{t("Unit")}</span>
                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link href={`/org/${orgId}/~/list`}>
                      <span>{t("List")}</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link href={`/org/${orgId}/~/create`}>
                      <span>{t("Create")}</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      </SidebarMenu>
    </SidebarGroup>
  )
}

const UnitContent = async ({
  orgId,
  unitId,
}: {
  orgId: string
  unitId: string
}) => {
  const t = await getTranslations()

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{t("Unit")}</SidebarGroupLabel>
      <SidebarMenu>
        <Collapsible asChild defaultOpen className="group/collapsible">
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton tooltip={t("Product")}>
                <BookOpenIcon />
                <span>{t("Product")}</span>
                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link href={`/org/${orgId}/${unitId}/product/list`}>
                      <span>{t("List")}</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link href={`/org/${orgId}/${unitId}/product/create`}>
                      <span>{t("Create")}</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
        <Collapsible asChild defaultOpen className="group/collapsible">
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton tooltip={t("Customer")}>
                <BookOpenIcon />
                <span>{t("Customer")}</span>
                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link href={`/org/${orgId}/${unitId}/customer/list`}>
                      <span>{t("List")}</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link href={`/org/${orgId}/${unitId}/customer/create`}>
                      <span>{t("Create")}</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
        <Collapsible asChild defaultOpen className="group/collapsible">
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton tooltip={t("Invoice")}>
                <BookOpenIcon />
                <span>{t("Invoice")}</span>
                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link href={`/org/${orgId}/${unitId}/invoice/list`}>
                      <span>{t("List")}</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link href={`/org/${orgId}/${unitId}/invoice/create`}>
                      <span>{t("Create")}</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      </SidebarMenu>
    </SidebarGroup>
  )
}

const Content = ({ orgId, unitId }: { orgId: string; unitId?: string }) => {
  return unitId ? (
    <UnitContent orgId={orgId} unitId={unitId} />
  ) : (
    <OrgContent orgId={orgId} />
  )
}

type Props = {
  orgId: string
  unitId?: string
}

const AppSidebar = ({ orgId, unitId }: Props) => {
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <Content orgId={orgId} unitId={unitId === "~" ? undefined : unitId} />
      </SidebarContent>
      <Suspense>
        <AppSidebarUser />
      </Suspense>
      <SidebarRail />
    </Sidebar>
  )
}

export { AppSidebar }

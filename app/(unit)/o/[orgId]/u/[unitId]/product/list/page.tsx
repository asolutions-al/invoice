import { productColumns } from "@/components/columns/product"
import { StatusTabs } from "@/components/tabs"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { db } from "@/db/app/instance"
import { product, status } from "@/orm/app/schema"
import { and, eq } from "drizzle-orm"
import { PlusCircleIcon } from "lucide-react"
import { getTranslations } from "next-intl/server"
import Link from "next/link"

type Props = {
  params: Promise<{ orgId: string; unitId: string }>
  searchParams: Promise<{
    status?: (typeof status.enumValues)[number]
  }>
}

const LIST = status.enumValues.sort()

const Page = async ({ params, searchParams }: Props) => {
  const t = await getTranslations()
  const { orgId, unitId } = await params
  const { status = "active" } = await searchParams

  const data = await db.query.product.findMany({
    where: and(eq(product.unitId, unitId), eq(product.status, status)),
    orderBy: product.name,
  })

  return (
    <>
      <div className="mb-3 flex flex-row justify-between">
        <StatusTabs defaultValue={status} />
        <Link href={`/o/${orgId}/u/${unitId}/product/create`} passHref>
          <Button>
            <PlusCircleIcon />
            <span className="sr-only sm:not-sr-only">{t("New product")}</span>
          </Button>
        </Link>
      </div>
      <DataTable columns={productColumns} data={data} />
    </>
  )
}

export default Page

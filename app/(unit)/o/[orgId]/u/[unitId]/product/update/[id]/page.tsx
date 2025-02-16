import { FormActionBtns } from "@/components/buttons"
import { ProductForm } from "@/components/forms"
import { PageHeader } from "@/components/layout/page-header"
import { updateProduct } from "@/db/app/actions"
import { db } from "@/db/app/instance"
import { product } from "@/orm/app/schema"
import { ProductFormProvider } from "@/providers/product-form"
import { eq } from "drizzle-orm"

type Props = {
  params: Promise<{ id: string }>
}

const Page = async (props: Props) => {
  const { id } = await props.params

  const data = await db.query.product.findFirst({
    where: eq(product.id, id),
  })

  return (
    <ProductFormProvider defaultValues={data}>
      <PageHeader
        title={"Update product"}
        className="mb-2"
        rightComp={<FormActionBtns formId="product" />}
      />
      <ProductForm
        performAction={async (values) => {
          "use server"
          await updateProduct({ values, id })
        }}
      />
    </ProductFormProvider>
  )
}

export default Page

"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { useFieldArray, useFormContext } from "react-hook-form"

import { ProductSchemaT } from "@/db/(inv)/schema"
import { InvoiceFormSchemaT } from "@/providers/invoice-form"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { CheckoutProductCard } from "../cards/checkout-product"
import { SaleProductCard } from "../cards/sale-product"

type Props = {
  performAction: (values: InvoiceFormSchemaT) => Promise<void>
  products: ProductSchemaT[]
}

const formId: FormId = "invoice"

const Form = ({ performAction, products }: Props) => {
  const t = useTranslations()
  const router = useRouter()
  const form = useFormContext<InvoiceFormSchemaT>()

  const onValid = async (values: InvoiceFormSchemaT) => {
    try {
      await performAction(values)
      toast.success(t("Invoice saved successfully"))
      router.back()
    } catch (error) {
      console.error("error", error)
      toast.error(t("An error occurred"))
    }
  }

  const onInvalid = () => {
    toast.error(t("Please fill in all required fields"))
  }

  return (
    <>
      <form
        onSubmit={form.handleSubmit(onValid, onInvalid)}
        className="mx-auto"
        id={formId}
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>{t("Details")}</CardTitle>
                <CardDescription>
                  {t("Information about the invoice")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {products.map((product) => (
                  <SaleProductCard
                    key={product.id}
                    data={product}
                    onSelect={() => {
                      form.setValue("rows", [
                        ...(form.getValues().rows || []),
                        {
                          productId: product.id,
                          name: product.name,
                          quantity: 1,
                          unitPrice: product.price,
                          notes: "",
                        },
                      ])
                    }}
                  />
                ))}
              </CardContent>
            </Card>
          </div>
          <div>
            <Card>
              <CardHeader>
                <CardTitle>{t("Checkout")}</CardTitle>
                <CardDescription>
                  {t("Payment, customer and other details")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Checkout />
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </>
  )
}

const Checkout = () => {
  const form = useFormContext<InvoiceFormSchemaT>()
  const rows = useFieldArray({ name: "rows", control: form.control })

  return rows.fields.map((row, index) => (
    <CheckoutProductCard
      key={row.id}
      id={row.id}
      name={row.name}
      description={row.notes || ""}
      price={row.unitPrice}
      quantity={row.quantity}
      image=""
      onQuantityChange={(id, newQuantity) => {
        rows.update(index, { ...row, quantity: newQuantity })
      }}
      onRemove={(id) => {
        rows.remove(index)
      }}
    />
  ))
}

export { Form as InvoiceForm }

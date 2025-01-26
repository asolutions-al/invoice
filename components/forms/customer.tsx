"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { useFormContext } from "react-hook-form"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { customerImagesBucket } from "@/contants/bucket"
import { publicStorageUrl } from "@/contants/consts"
import { createClient } from "@/db/app/client"
import { IdType, status } from "@/orm/app/schema"
import { CustomerFormSchemaT } from "@/providers/customer-form"
import { UploadIcon } from "lucide-react"
import { nanoid } from "nanoid"
import { useTranslations } from "next-intl"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

type SchemaT = CustomerFormSchemaT

type Props = {
  performAction: (values: SchemaT) => Promise<void>
}

const formId: FormId = "customer"

const Form = ({ performAction }: Props) => {
  const t = useTranslations()
  const router = useRouter()
  const { orgId, unitId } = useParams<{ orgId: string; unitId: string }>()
  const form = useFormContext<SchemaT>()

  const [imgFile, setImgFile] = useState<File>()

  const defaultImgBucketPath = form.formState.defaultValues?.imageBucketPath

  const onValid = async (values: SchemaT) => {
    try {
      let imgPath: SchemaT["imageBucketPath"]

      if (imgFile) {
        imgPath = nanoid() // new path
        const client = createClient()
        client.storage.from("customerImages").upload(imgPath, imgFile) // optimistic
      } else {
        imgPath = defaultImgBucketPath // keep the same path
      }

      await performAction({
        ...values,
        imageBucketPath: imgPath,
      })
      toast.success(t("Customer saved successfully"))
      router.push(`/org/${orgId}/${unitId}/customer/list`)
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
        className="mx-auto max-w-4xl"
        id={formId}
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-2 lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>{t("Identity")}</CardTitle>
                <CardDescription>
                  {t("Basic information about the customer")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("Name")}</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-3 gap-2">
                  <FormField
                    control={form.control}
                    name="idType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("Id type")}</FormLabel>
                        <Select
                          value={field.value || ""}
                          onValueChange={field.onChange}
                        >
                          <FormControl>
                            <SelectTrigger aria-label={t("Select id type")}>
                              <SelectValue placeholder={t("Select id type")} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {IdType.enumValues.map((item) => (
                              <SelectItem key={item} value={item}>
                                {t(item)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="idValue"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>{t("Id")}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="1234567890"
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>{t("Details")}</CardTitle>
                <CardDescription>
                  {t("Additional information about the customer")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("Email")}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="demo@example.com"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-2">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("City")}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="San Francisco"
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("Address")}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="1234 Main St"
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("Description")}</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={t(
                            "A fancy pizza with pepperoni, mushrooms, and olives"
                          )}
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{t("Status")}</CardTitle>
                <CardDescription>
                  {t("Current status of the customer")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        value={field.value || ""}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger aria-label={t("Select status")}>
                            <SelectValue placeholder={t("Select status")} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {status.enumValues.map((item) => (
                            <SelectItem key={item} value={item}>
                              {t(item)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>{t("Images")}</CardTitle>
                <CardDescription>
                  {t("Appealing images of the customer")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <Image
                    alt={t("Customer image")}
                    className="aspect-square w-full rounded-md object-cover"
                    height="300"
                    src={
                      imgFile
                        ? URL.createObjectURL(imgFile)
                        : defaultImgBucketPath
                          ? `${publicStorageUrl}/${customerImagesBucket}/${defaultImgBucketPath}`
                          : "/placeholder.svg"
                    }
                    width="300"
                  />
                  <div className="grid grid-cols-3 gap-2">
                    <Image
                      alt={t("Customer image")}
                      className="aspect-square w-full rounded-md object-cover"
                      height="84"
                      src="/placeholder.svg"
                      width="84"
                    />
                    <Image
                      alt={t("Customer image")}
                      className="aspect-square w-full rounded-md object-cover"
                      height="84"
                      src="/placeholder.svg"
                      width="84"
                    />
                    <button
                      className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed"
                      onClick={(e) => {
                        e.preventDefault()
                        const input = document.createElement("input")
                        input.type = "file"
                        input.accept = "image/*"
                        input.onchange = (e) => {
                          const files = (e.target as HTMLInputElement).files
                          const file = files?.[0]
                          if (!file) return
                          setImgFile(file)
                        }
                        input.click()
                      }}
                    >
                      <UploadIcon className="h-4 w-4 text-muted-foreground" />
                      <span className="sr-only">{t("Upload")}</span>
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </>
  )
}

export { Form as CustomerForm }

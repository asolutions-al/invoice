import { db } from "@/db/app/instance"
import { createAuthClient } from "@/db/auth/client"
import { member, unit } from "@/orm/app/schema"
import { UnitFormSchemaT } from "@/providers/unit-form"

type FormSchemaT = UnitFormSchemaT

const create = async ({
  values,
  orgId,
}: {
  values: FormSchemaT
  orgId: string
}) => {
  "use server"

  const client = await createAuthClient()
  const {
    data: { user },
  } = await client.auth.getUser()

  await db.transaction(async (trx) => {
    const [unitRes] = await trx
      .insert(unit)
      .values({
        ...values,
        orgId,
      })
      .returning({
        id: unit.id,
      })

    await trx.insert(member).values({
      userId: user!.id,
      unitId: unitRes.id,
      role: "owner",
    })
  })
}

export { create as createUnit }

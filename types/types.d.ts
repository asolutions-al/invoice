type FormId =
  | "product"
  | "invoice"
  | "unit"
  | "user"
  | "customer"
  | "invoiceConfig"
  | "cashRegister"

type RangeT =
  | "today"
  | "yesterday"
  | "this_week"
  | "last_week"
  | "this_month"
  | "last_month"

type GlobalParams = {
  orgId: string
  unitId: string
}

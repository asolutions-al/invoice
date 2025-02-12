import { EntityStatusT, PayMethodT } from "@/types/enum"
import {
  endOfMonth,
  endOfToday,
  endOfWeek,
  endOfYesterday,
  startOfMonth,
  startOfToday,
  startOfWeek,
  startOfYesterday,
  subMonths,
  subWeeks,
} from "date-fns"
import {
  ArchiveIcon,
  CalendarDaysIcon,
  CalendarIcon,
  CalendarRangeIcon,
  CircleCheckIcon,
  CoinsIcon,
  CreditCardIcon,
  FileIcon,
  HandCoinsIcon,
  LandmarkIcon,
} from "lucide-react"

type IconT = typeof LandmarkIcon // temp solution, not sure how to get the type of the icon

const mapPayMethodIcon = (value: PayMethodT) => {
  const MAP: Record<PayMethodT, IconT> = {
    bank: LandmarkIcon,
    card: CreditCardIcon,
    cash: HandCoinsIcon,
    other: CoinsIcon,
  }
  return MAP[value]
}
const mapRangeIcon = (value: RangeT) => {
  const MAP: Record<RangeT, IconT> = {
    today: CalendarIcon,
    yesterday: CalendarDaysIcon,
    this_week: CalendarIcon, //TODO:
    last_week: CalendarIcon, // TODO:
    this_month: CalendarRangeIcon,
    last_month: CalendarIcon, // TODO:
  }
  return MAP[value]
}
const mapStatusIcon = (value: EntityStatusT) => {
  const MAP: Record<EntityStatusT, IconT> = {
    active: CircleCheckIcon,
    archived: ArchiveIcon,
    draft: FileIcon,
  }
  return MAP[value]
}

const mapRangeToStartEnd = (range: RangeT) => {
  const weekStartsOn = 1

  const MAP: Record<RangeT, [Date, Date]> = {
    today: [startOfToday(), endOfToday()],
    yesterday: [startOfYesterday(), endOfYesterday()],
    this_week: [
      startOfWeek(new Date(), { weekStartsOn }),
      endOfWeek(new Date(), { weekStartsOn }),
    ],
    last_week: [
      startOfWeek(subWeeks(new Date(), 1), { weekStartsOn }),
      endOfWeek(subWeeks(new Date(), 1), { weekStartsOn }),
    ],
    this_month: [startOfMonth(new Date()), endOfMonth(new Date())],
    last_month: [
      startOfMonth(subMonths(new Date(), 1)),
      endOfMonth(subMonths(new Date(), 1)),
    ],
  }
  return MAP[range]
}

export { mapPayMethodIcon, mapRangeIcon, mapRangeToStartEnd, mapStatusIcon }

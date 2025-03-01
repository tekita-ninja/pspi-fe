import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
const message = `please complete the field`;

export const fromDeliverySchema = toTypedSchema(z.object({
  statusPengiriman: z.coerce.number({ message }).optional(),
  driverId: z.coerce.number({ message }),
  armadaId: z.coerce.number({ message }),
  startDate: z.string({ message }).optional(),
  phone: z.string({ message }),
  tujuan: z.string({ message }),
}))

export const fromDeliveredSchema = toTypedSchema(z.object({
  id: z.coerce.number({ message }).optional()
}))

export const fromSearchDeliveredSchema = toTypedSchema(z.object({
  statusPengiriman: z.coerce.number({ message }).optional(),
  driverId: z.coerce.number({ message }).optional(),
  start: z.string({ message }).optional(),
  end: z.string({ message }).optional(),
  code: z.string({ message }).optional(),
}))
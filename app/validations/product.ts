import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
const message = `please complete the field`;

export const crateProductItemSchema = toTypedSchema(z.object({
  name: z.string({ message }).max(200, {
    message:'max 64 characters'
  }),
  unit: z.string({ message }),
}))
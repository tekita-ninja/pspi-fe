import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
const message = `please complete the field`;

export const fromDriverSchema = toTypedSchema(z.object({
  name: z.string({ message }).max(200, {
    message:'max 200 characters'
  }),
  image: z.string({ message }).optional(),
  phone: z.string({ message }),
  email: z.string({ message }).optional(),
}))
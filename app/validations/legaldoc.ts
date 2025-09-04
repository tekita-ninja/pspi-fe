import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
const message = `please complete the field`;

export const createLegalDocumentSchema = toTypedSchema(z.object({
  title: z.string({ message }).max(220, {
    message: 'max 220 characters'
  }),
  description: z.string({ message })
}))
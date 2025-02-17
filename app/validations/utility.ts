import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
const message = `please complete the field`;

export const formUtilitySchema = toTypedSchema(z.object({
  appName: z.string({ message }),
  logoSm: z.string().optional(),
  logoLg: z.string().optional(),
  mainEmail: z.string().optional(),
  mainWhatsapp: z.string().optional(),
  mainAddress: z.string().optional(),
  fileCompro: z.string().optional(),
}))
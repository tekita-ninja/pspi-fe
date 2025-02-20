import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
const message = `please complete the field`;

export const fromArmadaSchema = toTypedSchema(z.object({
  defaultDriverId: z.coerce.number({ message }),
  nopol: z.string({ message }),
  merk: z.string({ message }),
  quantity: z.string({ message }),
  kompartment: z.string({ message }),
  // image_front: z.string({ message }),
  // image_right: z.string({ message }),
  // image_left: z.string({ message }),
  // image_back: z.string({ message }),
  // terra_doc: z.string({ message }),
}))
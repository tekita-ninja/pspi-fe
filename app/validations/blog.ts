import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
const message = `please complete the field`;

export const crateBlogSchema = toTypedSchema(z.object({
  blog_category_id: z.coerce.number({ message }).optional(),
  title: z.string({ message }).max(200, {
    message:'max 200 characters'
  }),
  author: z.string({ message }),
  image: z.string({ message }).optional(),
  body: z.string({ message }),
}))


export const crateBlogCategorySchema = toTypedSchema(z.object({
  title: z.string({ message }).max(200, {
    message: 'max 200 characters'
  })
}))
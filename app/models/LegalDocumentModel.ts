import type { TPaginate } from "../types/Response";

export type TLegalDocumentItem = {
  id: number
  title: string
  description: string
  file: string
  status: boolean
  createdAt: string
  updatedAt: string
}

export type TLegalDocumentForm = {
  title: string
}
export type TLegalDocumentFormUpdate = {
  title?: string
}

export type TResults = {
  data: TLegalDocumentItem[],
  meta: TPaginate
}
export class LegalDocumentModel {
  static paginate(response: {
    data: TLegalDocumentItem[],
    meta: TPaginate
  }) {
    return response
  }
}
export type TUtility = {
  id?: number
  appName?: string
  logoSm?: string
  logoLg?: string
  textColor?: string
  bgColor?: string
  mainEmail?: string
  mainWhatsapp?: string
  mainAddress?: string
  fileCompro?: string
}
type TSummaryItem = {
  label: string
  path?: string
  count: number
}
export type TSummary = {
  title: string
  data: TSummaryItem[]
}
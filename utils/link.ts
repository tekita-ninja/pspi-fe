const ASSET_LINK = import.meta.env.VITE_BASE_URL + '/'
export const toAssetLink = (filename: string) => {
  return ASSET_LINK + filename
}
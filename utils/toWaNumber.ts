export const toWaNumber = (data: string) => {
  const x = data.replace(/^0+/, '')
  return x
}
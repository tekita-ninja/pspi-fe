export const convertFormat = (data: string) => {
  const cleanData = data.replace(/^0+/, '');

  return `62${cleanData}`;
}

export const  maskPhoneNumber = (phoneNumber: string)=> {
  // const phonePattern = /^(\d{4})(\d{4})(\d{4})$/;
  // const match = phoneNumber.match(phonePattern);

  // if (match) {
  //   return `${match[1]}-${match[2]}-${match[3]}`;
  // }
  // return phoneNumber;
  const splitedBy4 = phoneNumber.match(/.{1,4}/g)
  return splitedBy4?.join("-")
}

export const toPriceUsd = (data:string) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(+data)
}
export const toPriceIDR = (data:string) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(+data)
}
export const toNumberIDR = (data: string) => {
  return new Intl.NumberFormat('id-ID', {
    currency: 'IDR',
  }).format(+data)
}
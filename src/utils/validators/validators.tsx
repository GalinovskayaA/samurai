export const required = (value: string) => {
  if (value) return undefined
  console.log('Field is required')
  return 'Field is required'
}

export const maxLengthCreator = (maxLength: number) => (value: string) => {
  if (value && value.length > maxLength) return `Max length is ${maxLength} simbols`
  console.log(`Max length is ${maxLength} simbols`)
  return undefined
}

/*
export const maxLength50 = (value: string) => {
  if (value && value.length > 50) return 'Max length is 50 simbols'
  return undefined
}*/

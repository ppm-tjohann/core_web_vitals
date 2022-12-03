export const getLength = async (callbackFn) => {
  const {data} = await callbackFn()
  return data.length
}

export const ucFirst = string => (string[0].toUpperCase() + string.slice(1))

export const getRatingColor = rating => {
  if (rating < 25) {
    return 'error'
  }
  if (rating > 80) {
    return 'success'
  }
  return 'warning'
}

export const clamp = (num, min, max) => (num <= min ?
    min :
    num >= max ? max : num)
export function ellipsify(str = '', len = 4, delimiter = '..') {
  const strLen = str.length
  const limit = len * 2 + delimiter.length

  return strLen >= limit ? str.substring(0, len) + delimiter + str.substring(strLen - len, strLen) : str
}

export function formatAmount(amount: number | string, decimals = 2) {
  return Intl.NumberFormat('en-US', { maximumFractionDigits: decimals }).format(parseFloat(amount.toString()))
}

export const formatDate = (date) => {
  try {
    return new Date(date)
      .toISOString()
      .substring(0, 10)

  } catch (ex) { return "" }
}

export const parseNumber = (num) => {
  if ( num.trim().length === 0 )
    return "NaN"

  let val = Number(num.replace(",", "."))

  return ( isNaN(val) )
    ? "NaN"
    : val
}

export const parseQuotas = (quotas) =>
  quotas
    .filter(q => q.quantity > 0 &&
                 parseNumber(q.quantity) !== "NaN")
    .map(q => ({
      material : q.material.id,
      quantity : parseNumber(q.quantity)
    }))

export const parseUrlQuery = (query, res = {}) => {
  if ( query[0] !== "?" )
    return res

  query
    .substring(1)
    .split("&")
    .map(q => {
      let key = decodeURIComponent(q.split("=")[0])
      let value = decodeURIComponent(q.split("=")[1] || "")
      return res[key] = value
    })

  return res
}

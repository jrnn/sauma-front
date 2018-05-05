export const formatDate = (date) => {
  try {
    return new Date(date)
      .toISOString()
      .substring(0, 10)

  } catch (ex) { return "" }
}

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
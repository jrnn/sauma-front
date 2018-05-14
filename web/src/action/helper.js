const cacheLifespan = 5 * 60000  // 1 min = 60000 ms

export const bearer = (token) =>
  ({ headers : { "authorization" : `bearer ${token}` } })

export const errorHandler = (ex) => {
  let { ValidationError } = ex.response.data

  if ( ValidationError )
    return {
      message : "Virheellinen tai puutteellinen syöte, tarkista antamasi tiedot",
      validation : ValidationError
    }

  switch (ex.response.status) {
    case 500 :
      return {
        message : "Palvelin on nurin, kokeile hetken kuluttua uudelleen"
      }
    case 404 :
      return {
        message : "Sivua/resurssia ei ole olemassa, tarkista osoite"
      }
    case 403 :
      return {
        message : "Sinulla ei ole oikeuksia tähän sivuun/resurssiin"
      }
    case 401 :
      return {
        message : "Istuntosi on vanhentunut, kirjaudu uudestaan"
      }
    default :
      return {
        message : "Voi vihveli, jotain meni nyt kaputt. Kokeilepa hetken kuluttua uudelleen...?"
      }
  }
}

export const shouldFetch = (state, key) => {
  let { data } = state[key]

  if ( !data.updated || data.pending )
    return false

  return ( cacheLifespan < (Date.now() - data.updated) )
}

/*
 *  STANDARD ACTION CREATORS
 */
export const standardActions = (types) => (
  {
    fetch : () => ({
      type : types.FETCH
    }),
    fetchOk : (items) => ({
      type : types.FETCH_OK,
      payload : items
    }),
    fetchError : (error) => ({
      type : types.FETCH_ERROR,
      payload : error
    }),
    createOk : (item) => ({
      type : types.CREATED,
      payload : item
    }),
    updateOk : (item) => ({
      type : types.UPDATED,
      payload : item
    }),
    write : () => ({
      type : types.WRITE
    }),
    writeError : () => ({
      type : types.WRITE_ERROR
    }),
    writeInvalid : (validationErrors) => ({
      type : types.WRITE_INVALID,
      payload : validationErrors
    })
  }
)

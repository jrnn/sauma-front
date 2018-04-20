export const cacheLifespan = 10 * 60000  // 1 min = 60000 ms

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

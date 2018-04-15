export const bearer = (token) =>
  ({ headers : { "authorization" : `bearer ${token}` } })

export const errorHandler = (ex) => {
  let { ValidationError } = ex.response.data

  if ( ValidationError )
    return {
      message : ValidationError,
      validation : true
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
        message : "Virheellinen käyttäjätunnus tai salasana"
      }
    default :
      return {
        message : "Voi vihveli, jotain meni nyt kaputt"
      }
  }
}

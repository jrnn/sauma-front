import axios from "axios"

const url = "/api/employees"

export const getEmployees = (token) => {
  return async (dispatch) => {
    dispatch({ type : "GET_EMPLOYEES" })

    try {
      let res = await axios
        .get(url, bearer(token))

      dispatch({
        type : "GET_EMPLOYEES_OK",
        data : res.data
      })

    } catch (ex) {
      dispatch({
        type : "GET_EMPLOYEES_FAIL",
        error : errorHandler(ex)
      })
    }
  }
}

export const getEmployee = (id, token) => {
  return async (dispatch) => {
    dispatch({ type : "GET_EMPLOYEE" })

    try {
      let res = await axios
        .get(`${url}/${id}`, bearer(token))

      dispatch({
        type : "GET_EMPLOYEE_OK",
        data : res.data
      })

    } catch (ex) {
      dispatch({
        type : "GET_EMPLOYEE_FAIL",
        error : errorHandler(ex)
      })
    }
  }
}

export const createEmployee = (employee, token) => {
  return async (dispatch) => {
    dispatch({ type : "CREATE_EMPLOYEE" })

    try {
      let res = await axios
        .post(url, employee, bearer(token))

      dispatch({
        type : "CREATE_EMPLOYEE_OK",
        data : res.data
      })

    } catch (ex) {
      let error = errorHandler(ex)
      let type = ( error.validation )
        ? "EMPLOYEE_VALIDATION_FAIL"
        : "CREATE_EMPLOYEE_FAIL"

      dispatch({ type, error })
    }
  }
}

export const updateEmployee = (id, employee, token) => {
  return async (dispatch) => {
    dispatch({ type : "UPDATE_EMPLOYEE" })

    try {
      let res = await axios
        .put(`${url}/${id}`, employee, bearer(token))

      dispatch({
        type : "UPDATE_EMPLOYEE_OK",
        data : res.data
      })

    } catch (ex) {
      let error = errorHandler(ex)
      let type = ( error.validation )
        ? "EMPLOYEE_VALIDATION_FAIL"
        : "UPDATE_EMPLOYEE_FAIL"

      dispatch({ type, error })
    }
  }
}

export const resetEmployees = () =>
  ({ type : "RESET_EMPLOYEES" })

export const resetEmployee = () =>
  ({ type : "RESET_EMPLOYEE" })

const bearer = (token) =>
  ({ headers : { "authorization" : `bearer ${token}` } })

const errorHandler = (ex) => {
  let { ValidationError } = ex.response.data

  if ( ValidationError )
    return {
      message : ValidationError,
      validation : true
    }

  switch (ex.response.status) {
    case 500 :
      return {
        message : "Palvelin on nurin, kokeile hetken kuluttua uudelleen",
        validation : false
      }
    case 404 :
      return {
        message : "Sivua/resurssia ei ole olemassa, tarkista osoite",
        validation : false
      }
    case 401 :
      return {
        message : "Joko et ole kirjautunut tai käyttöoikeutesi eivät riitä",
        validation : false
      }
    default :
      return {
        message : "Voi vihveli, jotain meni nyt kaputt",
        validation : false
      }
  }
}

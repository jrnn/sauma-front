import axios from "axios"
import { bearer, errorHandler, shouldFetch, standardActions } from "./helper"
import { notify } from "./notification"

const url = "/api/materials"

/*
 *  ACTION TYPES
 */
export const types = {
  FETCH : "FETCH_MATERIALS",
  FETCH_OK : "FETCH_MATERIALS_OK",
  FETCH_ERROR : "FETCH_MATERIALS_ERROR",
  WRITE : "WRITE_MATERIAL",
  WRITE_ERROR : "WRITE_MATERIAL_ERROR",
  WRITE_INVALID : "WRITE_MATERIAL_INVALID",
  WRITE_RESET : "RESET_WRITE_MATERIAL",
  CREATED : "CREATE_MATERIAL_OK",
  UPDATED : "UPDATE_MATERIAL_OK"
}

/*
 *  ACTION CREATORS
 */
const actions = standardActions(types)

export const resetWriteMaterial = () =>
  ({ type : types.WRITE_RESET })

/*
 *  THUNKS
 */
export const fetchMaterials = (token) => {
  return async (dispatch) => {
    dispatch(actions.fetch())

    try {
      let res = await axios
        .get(url, bearer(token))

      dispatch(actions.fetchOk(res.data))

    } catch (ex) {
      let error = errorHandler(ex)
      dispatch(actions.fetchError(error.message))
    }
  }
}

export const fetchMaterialsIfNeeded = (token) => {
  return async (dispatch, getState) => {
    if ( shouldFetch(getState(), "materials") )
      dispatch(fetchMaterials(token))
    else
      return Promise.resolve()
  }
}

export const createMaterial = (material, token, history) => {
  return async (dispatch) => {
    dispatch(actions.write())

    try {
      let res = await axios
        .post(url, material, bearer(token))

      dispatch(resetWriteMaterial())
      dispatch(actions.createOk(res.data))
      dispatch(notify("Materiaali lisätty", "ok"))
      history.replace(`/materials/${res.data.id}`)

    } catch (ex) {
      let error = errorHandler(ex)

      if ( error.validation )
        dispatch(actions.writeInvalid(error.validation))
      else
        dispatch(actions.writeError())

      dispatch(notify(error.message, "error"))
    }
  }
}

export const updateMaterial = (id, material, token) => {
  return async (dispatch) => {
    dispatch(actions.write())

    try {
      let res = await axios
        .put(`${url}/${id}`, material, bearer(token))

      dispatch(resetWriteMaterial())
      dispatch(actions.updateOk(res.data))
      dispatch(notify("Materiaalitiedot päivitetty", "ok"))

    } catch (ex) {
      let error = errorHandler(ex)

      if ( error.validation )
        dispatch(actions.writeInvalid(error.validation))
      else
        dispatch(actions.writeError())

      dispatch(notify(error.message, "error"))
    }
  }
}
